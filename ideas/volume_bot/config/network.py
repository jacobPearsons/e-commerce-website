from typing import Dict, Any

# Network configuration
NETWORK_CONFIG = {
    "timeout": 30.0,  # Increase timeout to 30 seconds
    "connect_timeout": 10.0,  # Connection timeout
    "read_timeout": 20.0,  # Read timeout
    "write_timeout": 20.0,  # Write timeout
    "pool_timeout": 20.0,  # Pool timeout
    "max_retries": 3,  # Maximum number of retries
    "retry_delay": 1.0,  # Delay between retries in seconds
}

# HTTP client configuration
HTTP_CONFIG = {
    "verify": True,  # Verify SSL certificates
    "trust_env": True,  # Trust environment variables
    "follow_redirects": True,  # Follow redirects
    "max_redirects": 5,  # Maximum number of redirects
}

def get_network_config() -> Dict[str, Any]:
    """Get the complete network configuration"""
    return {
        "network": NETWORK_CONFIG,
        "http": HTTP_CONFIG,
    } 