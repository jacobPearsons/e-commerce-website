import os
import aiohttp
import logging
import base58
import re
import asyncio
import time
from typing import Dict, Optional, Tuple, List
from dataclasses import dataclass
from functools import lru_cache
from config.settings import API_CONFIG

logger = logging.getLogger(__name__)

@dataclass
class TokenInfo:
    """Data class for token information"""
    name: str
    symbol: str
    mint: str
    price: float
    decimals: int
    token_type: str
    source: str
    raw_data: Dict
    validated_at: float

class RateLimiter:
    """Simple rate limiter for API calls"""
    def __init__(self, max_calls: int, time_window: float):
        self.max_calls = max_calls
        self.time_window = time_window
        self.calls = []
    
    async def acquire(self):
        """Acquire permission to make an API call"""
        now = time.time()
        # Remove old calls outside the time window
        self.calls = [call_time for call_time in self.calls if now - call_time < self.time_window]
        
        if len(self.calls) >= self.max_calls:
            # Wait until we can make another call
            wait_time = self.time_window - (now - self.calls[0])
            if wait_time > 0:
                logger.debug(f"Rate limit hit, waiting {wait_time:.2f} seconds")
                await asyncio.sleep(wait_time)
        
        self.calls.append(time.time())

class TokenValidator:
    def __init__(self):
        # Base URLs
        self.dexscreener_url = API_CONFIG["DEXSCREENER_API"]
        self.jupiter_url = "https://token.jup.ag/all"
        self.birdeye_url = API_CONFIG["BIRDEYE_API_URL"]
        
        # API Keys
        self.birdeye_api_key = API_CONFIG.get("BIRDEYE_API_KEY")
        
        # Headers with better User-Agent
        self.headers = {
            "Content-Type": "application/json",
            "User-Agent": "TokenValidator/1.0 (Telegram Bot; +https://t.me/Rails0_bot)",
            "Accept": "application/json"
        }
        
        # Birdeye specific headers
        self.birdeye_headers = self.headers.copy()
        if self.birdeye_api_key:
            self.birdeye_headers["X-API-KEY"] = self.birdeye_api_key
        
        # Rate limiters (calls per minute)
        self.dexscreener_limiter = RateLimiter(max_calls=30, time_window=60)
        self.jupiter_limiter = RateLimiter(max_calls=10, time_window=60)
        self.birdeye_limiter = RateLimiter(max_calls=20, time_window=60)
        
        # Cache for token validation results (5 minutes)
        self._cache = {}
        self._cache_ttl = 300  # 5 minutes
        
        # Session for connection pooling
        self._session: Optional[aiohttp.ClientSession] = None
        
        logger.info("TokenValidator initialized with rate limiting and caching")

    async def _get_session(self) -> aiohttp.ClientSession:
        """Get or create aiohttp session with connection pooling"""
        if self._session is None or self._session.closed:
            timeout = aiohttp.ClientTimeout(total=30, connect=10)
            connector = aiohttp.TCPConnector(
                limit=100,
                limit_per_host=30,
                keepalive_timeout=30,
                enable_cleanup_closed=True
            )
            self._session = aiohttp.ClientSession(
                timeout=timeout,
                connector=connector,
                headers=self.headers
            )
        return self._session

    async def close(self):
        """Close the aiohttp session"""
        if self._session and not self._session.closed:
            await self._session.close()

    def _clean_cache(self):
        """Remove expired cache entries"""
        now = time.time()
        expired_keys = [
            key for key, (_, timestamp) in self._cache.items()
            if now - timestamp > self._cache_ttl
        ]
        for key in expired_keys:
            del self._cache[key]

    def is_valid_solana_address(self, address: str) -> bool:
        """
        Comprehensive validation for Solana address format
        """
        if not address or not isinstance(address, str):
            logger.warning(f"Invalid address format: {address}")
            return False
        
        # Check length (Solana addresses are 32-44 characters)
        if len(address) < 32 or len(address) > 44:
            logger.warning(f"Address length invalid: {len(address)} characters")
            return False
        
        # Check if it's a valid base58 string
        try:
            decoded = base58.b58decode(address)
            # Check length (should be 32 bytes for a Solana address)
            if len(decoded) != 32:
                logger.warning(f"Address decoded length invalid: {len(decoded)} bytes")
                return False
            return True
        except Exception as e:
            logger.warning(f"Address failed base58 validation: {e}")
            return False

    async def validate_token(self, token_address: str) -> Tuple[bool, Dict]:
        """
        Validate a Solana token address with multiple fallbacks and caching.
        Returns (is_valid, token_info)
        """
        # Clean expired cache entries
        self._clean_cache()
        
        # Check cache first
        cache_key = token_address.lower()
        if cache_key in self._cache:
            cached_result, _ = self._cache[cache_key]
            logger.debug(f"Returning cached result for {token_address}")
            return cached_result
        
        logger.debug(f"Starting validation for address: {token_address}")
        
        # First, validate address format
        if not self.is_valid_solana_address(token_address):
            logger.debug(f"Address format invalid: {token_address}")
            return False, {"error": "Invalid Solana address format"}

        # Try validation methods in order of preference
        validation_methods = [
            ("Dexscreener", self._validate_with_dexscreener),
            ("Jupiter", self._validate_with_jupiter),
            ("Birdeye", self._validate_with_birdeye),
        ]

        for method_name, validation_func in validation_methods:
            try:
                logger.debug(f"Trying {method_name} validation for {token_address}")
                is_valid, token_info = await validation_func(token_address)
                
                if is_valid:
                    logger.info(f"Token validated successfully using {method_name}")
                    # Cache the successful result
                    self._cache[cache_key] = ((True, token_info), time.time())
                    return True, token_info
                else:
                    logger.debug(f"{method_name} validation failed: {token_info.get('error', 'Unknown error')}")
                    
            except asyncio.TimeoutError:
                logger.warning(f"{method_name} API request timed out")
            except (aiohttp.ClientError, OSError) as e:
                logger.error(f"{method_name} API connection error: {e}")
            except Exception as e:
                logger.error(f"{method_name} validation error: {e}")

        # Cache the failed result
        error_msg = "Token not found on Dexscreener, Jupiter, or Birdeye"
        self._cache[cache_key] = ((False, {"error": error_msg}), time.time())
        
        logger.debug(f"All validation methods failed for {token_address}")
        return False, {"error": error_msg}

    async def _make_request(self, url: str, headers: Dict = None, params: Dict = None, 
                          timeout: int = 15) -> Tuple[int, Dict]:
        """Make HTTP request with proper error handling"""
        session = await self._get_session()
        request_headers = headers or self.headers
        
        try:
            async with session.get(url, headers=request_headers, params=params, timeout=timeout) as response:
                if response.status == 200:
                    data = await response.json()
                    return response.status, data
                else:
                    logger.warning(f"HTTP {response.status} for {url}")
                    return response.status, {}
        except asyncio.TimeoutError:
            logger.warning(f"Request timeout for {url}")
            raise
        except aiohttp.ClientError as e:
            logger.error(f"Request error for {url}: {e}")
            raise
        except Exception as e:
            logger.error(f"Unexpected error for {url}: {e}")
            raise

    async def _validate_with_dexscreener(self, token_address: str) -> Tuple[bool, Dict]:
        """Validate token using Dexscreener API (primary method)"""
        await self.dexscreener_limiter.acquire()
        
        url = f"{self.dexscreener_url}/tokens/v1/solana/{token_address}"
        status, data = await self._make_request(url, timeout=10)
        
        if status != 200:
            return False, {"error": f"Dexscreener API returned status {status}"}
        
        if isinstance(data, list) and len(data) > 0:
            # Dexscreener returns a list of pairs for the token
            token_data = data[0]
            base_token = token_data.get("baseToken", {})
            name = base_token.get("name", "Unknown")
            symbol = base_token.get("symbol", "N/A")
            decimals = base_token.get("decimals", 9)
            price = float(token_data.get("priceUsd", 0))
            
            return True, {
                "name": name,
                "symbol": symbol,
                "mint": token_address,
                "price": price,
                "decimals": decimals,
                "token_type": self._detect_token_type(name, symbol),
                "raw_data": token_data,
                "source": "Dexscreener"
            }
        elif isinstance(data, dict) and data.get("baseToken"):
            # Sometimes Dexscreener returns a dict
            base_token = data.get("baseToken", {})
            name = base_token.get("name", "Unknown")
            symbol = base_token.get("symbol", "N/A")
            decimals = base_token.get("decimals", 9)
            price = float(data.get("priceUsd", 0))
            
            return True, {
                "name": name,
                "symbol": symbol,
                "mint": token_address,
                "price": price,
                "decimals": decimals,
                "token_type": self._detect_token_type(name, symbol),
                "raw_data": data,
                "source": "Dexscreener"
            }
        else:
            return False, {"error": "Token not found on Dexscreener"}

    async def _validate_with_jupiter(self, token_address: str) -> Tuple[bool, Dict]:
        """Validate token using Jupiter API (fallback method)"""
        await self.jupiter_limiter.acquire()
        
        status, data = await self._make_request(self.jupiter_url, timeout=30)
        
        if status != 200:
            return False, {"error": f"Jupiter API returned status {status}"}
        
        # Jupiter returns a list of all tokens
        if isinstance(data, list):
            # Find the token in the list
            for token in data:
                if token.get("address") == token_address:
                    name = token.get("name", "Unknown")
                    symbol = token.get("symbol", "N/A")
                    decimals = token.get("decimals", 9)
                    
                    return True, {
                        "name": name,
                        "symbol": symbol,
                        "mint": token_address,
                        "price": 0,  # No price data from Jupiter
                        "decimals": decimals,
                        "token_type": self._detect_token_type(name, symbol),
                        "raw_data": token,
                        "source": "Jupiter (no trading data)"
                    }
            
            return False, {"error": "Token not found in Jupiter token list"}
        else:
            return False, {"error": "Invalid response format from Jupiter"}

    async def _validate_with_birdeye(self, token_address: str) -> Tuple[bool, Dict]:
        """Validate token using Birdeye API (fallback method)"""
        if not self.birdeye_api_key:
            logger.warning("Birdeye API key not configured, skipping Birdeye validation")
            return False, {"error": "Birdeye API key not configured"}
        
        await self.birdeye_limiter.acquire()
        
        url = f"{self.birdeye_url}/defi/token_overview"
        params = {
            "address": token_address,
            "chain": "solana"
        }
        
        status, data = await self._make_request(url, headers=self.birdeye_headers, params=params, timeout=15)
        
        if status == 200:
            # Check if token exists and has data
            if data.get("success") and data.get("data"):
                token_data = data["data"]
                name = token_data.get("name", "Unknown")
                symbol = token_data.get("symbol", "Unknown")
                price = float(token_data.get("price", 0))
                
                return True, {
                    "name": name,
                    "symbol": symbol,
                    "mint": token_address,
                    "price": price,
                    "decimals": 9,  # Default for Birdeye
                    "token_type": self._detect_token_type(name, symbol),
                    "raw_data": token_data,
                    "source": "Birdeye"
                }
            else:
                return False, {"error": "Token not found on Birdeye"}
        elif status == 401:
            logger.warning("Birdeye API key is suspended or lacks permissions")
            return False, {"error": "Birdeye API key suspended or insufficient permissions"}
        else:
            return False, {"error": f"Birdeye API error: HTTP {status}"}

    def _detect_token_type(self, name: str, symbol: str) -> str:
        """
        Detect token type based on name and symbol patterns
        """
        if not name or not symbol:
            return "Unknown"

        low = (name + symbol).lower()

        # Check for common patterns
        if any(pattern in low for pattern in ["ray", "pump", "meme", "dog", "cat", "inu"]):
            return "Memecoin"
        elif any(pattern in low for pattern in ["usdc", "usdt", "dai", "busd"]):
            return "Stablecoin"
        elif any(pattern in low for pattern in ["wrapped", "weth", "wbtc"]):
            return "Wrapped"
        elif any(pattern in low for pattern in ["nft", "art", "collectible"]):
            return "NFT/Art"
        else:
            return "Standard"

    async def validate_multiple_tokens(self, token_addresses: List[str]) -> Dict[str, Tuple[bool, Dict]]:
        """
        Validate multiple tokens concurrently
        """
        tasks = [self.validate_token(addr) for addr in token_addresses]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        return {
            addr: result if not isinstance(result, Exception) else (False, {"error": str(result)})
            for addr, result in zip(token_addresses, results)
        }

    def get_cache_stats(self) -> Dict:
        """Get cache statistics"""
        self._clean_cache()
        return {
            "cache_size": len(self._cache),
            "cache_ttl": self._cache_ttl
        }

    def clear_cache(self):
        """Clear the validation cache"""
        self._cache.clear()
        logger.info("Token validation cache cleared")