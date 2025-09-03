import asyncio
import time
from typing import Dict
import logging
from config.settings import RATE_LIMITS, BACKOFF_CONFIG

logger = logging.getLogger(__name__)

class RateLimiter:
    def __init__(self, service_name: str):
        self.service_name = service_name
        self.limits = RATE_LIMITS.get(service_name, {"requests_per_second": 1, "burst_limit": 3})
        self.tokens = self.limits["burst_limit"]
        self.last_update = time.time()
        self.lock = asyncio.Lock()
        
    async def acquire(self) -> bool:
        """Acquire a token for making a request"""
        async with self.lock:
            now = time.time()
            time_passed = now - self.last_update
            self.tokens = min(
                self.limits["burst_limit"],
                self.tokens + time_passed * self.limits["requests_per_second"]
            )
            
            if self.tokens >= 1:
                self.tokens -= 1
                self.last_update = now
                return True
            return False
            
    async def wait_for_token(self) -> None:
        """Wait until a token is available"""
        while not await self.acquire():
            await asyncio.sleep(0.1)

class BackoffStrategy:
    def __init__(self):
        self.config = BACKOFF_CONFIG
        self.current_delay = self.config["initial_delay"]
        self.retries = 0
        
    async def execute(self, func, *args, **kwargs):
        """Execute a function with exponential backoff"""
        while self.retries < self.config["max_retries"]:
            try:
                return await func(*args, **kwargs)
            except Exception as e:
                self.retries += 1
                if self.retries >= self.config["max_retries"]:
                    raise e
                    
                logger.warning(
                    f"Attempt {self.retries} failed for {func.__name__}. "
                    f"Retrying in {self.current_delay} seconds..."
                )
                
                await asyncio.sleep(self.current_delay)
                self.current_delay = min(
                    self.config["max_delay"],
                    self.current_delay * self.config["exponential_base"]
                )
                
    def reset(self):
        """Reset the backoff state"""
        self.current_delay = self.config["initial_delay"]
        self.retries = 0

class APIClient:
    def __init__(self, service_name: str):
        self.service_name = service_name
        self.rate_limiter = RateLimiter(service_name)
        self.backoff = BackoffStrategy()
        
    async def request(self, func, *args, **kwargs):
        """Make an API request with rate limiting and backoff"""
        # Remove any proxy-related parameters
        kwargs.pop('proxies', None)
        kwargs.pop('proxy', None)
        
        await self.rate_limiter.wait_for_token()
        return await self.backoff.execute(func, *args, **kwargs)
        
    def reset_backoff(self):
        """Reset the backoff state"""
        self.backoff.reset() 


def escape_markdown_v2(text: str) -> str:
    """
    Escapes text for Telegram MarkdownV2 formatting.
    See: https://core.telegram.org/bots/api#markdownv2-formatting
    """
    escape_chars = r"_ * [ ] ( ) ~ ` > # + - = | { } . !"
    for char in escape_chars.split():
        text = text.replace(char, f"\\{char}")
    return text 