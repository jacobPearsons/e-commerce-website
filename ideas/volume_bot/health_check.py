import os
import sys
import importlib
from pathlib import Path

REQUIRED_IMPORTS = [
    'telegram',
    'telegram.ext',
    'aiohttp',
    'solana',
    'dotenv',
    'pandas',
    'base58',
]
REQUIRED_ENV_VARS = [
    'BOT_TOKEN',
    'BIRDEYE_API_KEY',
    'SOLANA_RPC_URL',
]


def check_python():
    print(f"Python version: {sys.version}")
    print(f"Python executable: {sys.executable}")
    print(f"sys.prefix: {sys.prefix}")
    print(f"Venv active: {'venv' in sys.prefix}")


def check_imports():
    print("\nChecking critical imports:")
    for mod in REQUIRED_IMPORTS:
        try:
            importlib.import_module(mod)
            print(f"  [OK] {mod}")
        except ImportError as e:
            print(f"  [FAIL] {mod}: {e}")


def check_env_vars():
    print("\nChecking required environment variables:")
    missing = False
    for var in REQUIRED_ENV_VARS:
        value = os.getenv(var)
        if value:
            print(f"  [OK] {var}")
        else:
            print(f"  [MISSING] {var}")
            missing = True
    return not missing


def check_env_file():
    print("\nChecking for .env file:")
    if Path('.env').exists():
        print("  [OK] .env file found")
    else:
        print("  [MISSING] .env file not found")


def main():
    print("==== Health Check for Telegram Bot ====")
    check_python()
    check_imports()
    check_env_vars()
    check_env_file()
    print("\nHealth check complete.")

if __name__ == "__main__":
    main() 