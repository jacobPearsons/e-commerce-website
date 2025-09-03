import os
from typing import Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Configuration
API_CONFIG = {
    "SOLANA_RPC_URL": "https://api.mainnet-beta.solana.com/",
    "DEXSCREENER_API": "https://api.dexscreener.com",
    "BIRDEYE_API_KEY": os.getenv("BIRDEYE_API_KEY"),
    "BIRDEYE_API_URL": "https://public-api.birdeye.so",
    "SOLSCAN_API_URL": "https://public-api.solscan.io"
}

# Rate Limiting Configuration
RATE_LIMITS = {
    "SOLANA": {
        "requests_per_second": 2,
        "burst_limit": 5,
    },
    "DEXSCREENER": {
        "requests_per_second": 2,
        "burst_limit": 5,
    },
}

# Backoff Configuration
BACKOFF_CONFIG = {
    "initial_delay": 1,
    "max_delay": 60,
    "max_retries": 3,
    "exponential_base": 2,
}

# Alert Thresholds
ALERT_THRESHOLDS = {
    "price_change_1h": 10,  # 10% price change in 1 hour
    "liquidity_change": 20,  # 20% liquidity change
    "large_tx": 1000,  # $1000 minimum for large transaction
}

# Monitoring Configuration
MONITORING_CONFIG = {
    "update_interval": 300,  # 5 minutes
    "metrics_retention_days": 7,
    "alert_cooldown": 300,  # 5 minutes between alerts
}

# Database Configuration
DB_CONFIG = {
    "path": os.getenv("DB_PATH", "data/metrics.db"),
    "backup_path": os.getenv("DB_BACKUP_PATH", "data/backups"),
}

# Logging Configuration
LOGGING_CONFIG = {
    "level": os.getenv("LOG_LEVEL", "INFO"),
    "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    "file": os.getenv("LOG_FILE", "logs/memecoin_tracker.log"),
}

def get_config() -> Dict[str, Any]:
    """Get the complete configuration"""
    return {
        "api": API_CONFIG,
        "rate_limits": RATE_LIMITS,
        "backoff": BACKOFF_CONFIG,
        "alerts": ALERT_THRESHOLDS,
        "monitoring": MONITORING_CONFIG,
        "database": DB_CONFIG,
        "logging": LOGGING_CONFIG,
    } 