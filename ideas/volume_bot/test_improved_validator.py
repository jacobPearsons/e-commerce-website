#!/usr/bin/env python3
"""
Test script for the improved TokenValidator
Demonstrates all new features: caching, rate limiting, concurrent validation, etc.
"""

import asyncio
import sys
import time
sys.path.append('.')

from services.token_validator import TokenValidator

async def test_basic_validation():
    """Test basic token validation"""
    print("=== Basic Token Validation ===")
    validator = TokenValidator()
    
    # Test valid tokens
    valid_tokens = [
        ("SOL", "So11111111111111111111111111111111111111112"),
        ("USDC", "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
        ("USDT", "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
    ]
    
    for name, address in valid_tokens:
        print(f"\nTesting {name}...")
        start_time = time.time()
        is_valid, info = await validator.validate_token(address)
        duration = time.time() - start_time
        
        if is_valid:
            print(f"✅ {name}: {info['name']} ({info['symbol']}) - ${info['price']:.4f}")
            print(f"   Source: {info['source']} | Type: {info['token_type']}")
        else:
            print(f"❌ {name}: {info.get('error', 'Unknown error')}")
        print(f"   Duration: {duration:.2f}s")
    
    # Test invalid token
    print(f"\nTesting invalid token...")
    start_time = time.time()
    is_valid, info = await validator.validate_token("D4XxPgf5b5xSkczSHugWWc3NtUWKNam8HyUA6Wjvpump")
    duration = time.time() - start_time
    
    if not is_valid:
        print(f"❌ Invalid token: {info.get('error', 'Unknown error')}")
    print(f"   Duration: {duration:.2f}s")
    
    await validator.close()

async def test_caching():
    """Test caching functionality"""
    print("\n=== Caching Test ===")
    validator = TokenValidator()
    
    # First call (should hit API)
    print("First call (API hit)...")
    start_time = time.time()
    is_valid, info = await validator.validate_token("So11111111111111111111111111111111111111112")
    duration1 = time.time() - start_time
    print(f"Duration: {duration1:.2f}s")
    
    # Second call (should use cache)
    print("Second call (cache hit)...")
    start_time = time.time()
    is_valid, info = await validator.validate_token("So11111111111111111111111111111111111111112")
    duration2 = time.time() - start_time
    print(f"Duration: {duration2:.2f}s")
    
    print(f"Cache speedup: {duration1/duration2:.1f}x faster")
    
    # Show cache stats
    stats = validator.get_cache_stats()
    print(f"Cache stats: {stats}")
    
    await validator.close()

async def test_concurrent_validation():
    """Test concurrent token validation"""
    print("\n=== Concurrent Validation Test ===")
    validator = TokenValidator()
    
    tokens = [
        "So11111111111111111111111111111111111111112",  # SOL
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",  # USDC
        "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",  # USDT
        "D4XxPgf5b5xSkczSHugWWc3NtUWKNam8HyUA6Wjvpump",  # Invalid
    ]
    
    print(f"Validating {len(tokens)} tokens concurrently...")
    start_time = time.time()
    results = await validator.validate_multiple_tokens(tokens)
    duration = time.time() - start_time
    
    print(f"Concurrent validation completed in {duration:.2f}s")
    
    for token, (is_valid, info) in results.items():
        short_addr = f"{token[:8]}...{token[-8:]}"
        if is_valid:
            print(f"✅ {short_addr}: {info['name']} ({info['symbol']}) - ${info['price']:.4f}")
        else:
            print(f"❌ {short_addr}: {info.get('error', 'Unknown error')}")
    
    await validator.close()

async def test_rate_limiting():
    """Test rate limiting functionality"""
    print("\n=== Rate Limiting Test ===")
    validator = TokenValidator()
    
    # Test multiple rapid requests
    print("Making 5 rapid requests to test rate limiting...")
    start_time = time.time()
    
    tasks = []
    for i in range(5):
        task = validator.validate_token("So11111111111111111111111111111111111111112")
        tasks.append(task)
    
    results = await asyncio.gather(*tasks)
    duration = time.time() - start_time
    
    print(f"5 requests completed in {duration:.2f}s")
    print(f"Average time per request: {duration/5:.2f}s")
    
    await validator.close()

async def test_error_handling():
    """Test error handling with various edge cases"""
    print("\n=== Error Handling Test ===")
    validator = TokenValidator()
    
    test_cases = [
        ("Empty string", ""),
        ("Invalid format", "not-a-token"),
        ("Too short", "short"),
        ("Too long", "a" * 100),
        ("Non-string", None),
    ]
    
    for description, token in test_cases:
        print(f"\nTesting {description}...")
        try:
            is_valid, info = await validator.validate_token(token)
            print(f"Result: {is_valid}, {info}")
        except Exception as e:
            print(f"Exception: {e}")
    
    await validator.close()

async def test_token_type_detection():
    """Test token type detection"""
    print("\n=== Token Type Detection Test ===")
    validator = TokenValidator()
    
    test_tokens = [
        ("SOL", "So11111111111111111111111111111111111111112"),
        ("USDC", "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
        ("USDT", "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
    ]
    
    for name, address in test_tokens:
        is_valid, info = await validator.validate_token(address)
        if is_valid:
            print(f"{name}: {info['token_type']}")
    
    await validator.close()

async def main():
    """Run all tests"""
    print("🚀 Testing Improved Token Validator")
    print("=" * 50)
    
    try:
        await test_basic_validation()
        await test_caching()
        await test_concurrent_validation()
        await test_rate_limiting()
        await test_error_handling()
        await test_token_type_detection()
        
        print("\n" + "=" * 50)
        print("✅ All tests completed successfully!")
        
    except Exception as e:
        print(f"\n❌ Test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(main()) 