#!/usr/bin/env python3

import asyncio
from services.token_validator import TokenValidator

async def main():
    validator = TokenValidator()
    
    valid_token = "7h1N7Qy5fLEzsgau329j3vCNcqHzavc8B9geNUWMpump"  # Wrapped SOL
    invalid_token = "invalidtokenaddress1234567890"

    print(f"Testing valid token: {valid_token}")
    is_valid, info = await validator.validate_token(valid_token)
    print(f"Result: {is_valid}, Info: {info}\n")

    print(f"Testing invalid token: {invalid_token}")
    is_valid, info = await validator.validate_token(invalid_token)
    print(f"Result: {is_valid}, Info: {info}\n")

if __name__ == "__main__":
    asyncio.run(main()) 