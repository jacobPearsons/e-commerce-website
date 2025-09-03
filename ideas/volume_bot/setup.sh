#!/bin/bash

# Function to check if a command succeeded
check_error() {
    if [ $? -ne 0 ]; then
        echo "Error: $1"
        exit 1
    fi
}

# Function to check network connectivity
check_network() {
    echo "Checking network connectivity..."
    if ! ping -c 1 api.telegram.org > /dev/null 2>&1; then
        echo "Warning: Cannot reach Telegram API. Please check your network connection."
        echo "You may need to configure a proxy or VPN."
        read -p "Do you want to continue anyway? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

echo "Starting setup..."

# Check network connectivity
check_network

# Remove existing virtual environment if it exists
echo "Cleaning up old virtual environment..."
rm -rf venv
check_error "Failed to remove old virtual environment"

# Create new virtual environment
echo "Creating new virtual environment..."
python3.12 -m venv venv
check_error "Failed to create virtual environment"

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate
check_error "Failed to activate virtual environment"

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip
check_error "Failed to upgrade pip"

# Install dependencies in specific order
echo "Installing dependencies..."

# First install base dependencies
echo "Installing base dependencies..."
pip install "httpx==0.25.2" "aiohttp==3.9.3" "websockets==11.0.3" "python-dotenv==1.0.1" "certifi==2024.2.2"
check_error "Failed to install base dependencies"

# Install solana and its dependencies
echo "Installing solana..."
pip install "solana==0.33.0" "solders==0.21.0" "construct-typing==0.5.6"
check_error "Failed to install solana"

# Install telegram bot and remaining dependencies
echo "Installing telegram bot and remaining dependencies..."
pip install "python-telegram-bot==20.7" "pandas==2.2.1" "cachetools==4.2.4"
check_error "Failed to install remaining dependencies"

# Verify installations
echo "Verifying installations..."
python -c "import solana; print(f'Solana version: {solana.__version__}')" || echo "Warning: Solana installation verification failed"
python -c "import telegram; print(f'Telegram Bot version: {telegram.__version__}')" || echo "Warning: Telegram Bot installation verification failed"
python -c "import httpx; print(f'HTTPX version: {httpx.__version__}')" || echo "Warning: HTTPX installation verification failed"
python -c "import aiohttp; print(f'AIOHTTP version: {aiohttp.__version__}')" || echo "Warning: AIOHTTP installation verification failed"

echo "Setup completed!" 