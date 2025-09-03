# Solana Token Volume Bot

A robust Telegram bot for tracking Solana token volumes and providing real-time market data.

## 🚀 Features

### Token Validation
- **Multi-API Fallback System**: Uses Dexscreener as primary, with Jupiter and Birdeye as fallbacks
- **Intelligent Caching**: 5-minute cache for validation results to reduce API calls
- **Rate Limiting**: Built-in rate limiters to respect API quotas
- **Concurrent Validation**: Validate multiple tokens simultaneously
- **Robust Error Handling**: Comprehensive error handling with detailed logging
- **Connection Pooling**: Efficient HTTP connection management

### Bot Features
- Real-time token validation
- Volume tracking and alerts
- Price monitoring
- User-friendly interface with images and buttons
- Admin controls and monitoring

## 🏗️ Architecture

### Token Validator (`services/token_validator.py`)
The core validation system with the following improvements:

#### **Best Practices Implemented:**
- **Connection Pooling**: Reuses HTTP connections for better performance
- **Rate Limiting**: Prevents API quota exhaustion
- **Caching**: Reduces redundant API calls
- **Concurrent Processing**: Handles multiple requests efficiently
- **Comprehensive Error Handling**: Graceful degradation on failures
- **Type Safety**: Proper type hints and validation
- **Resource Management**: Proper cleanup of resources

#### **API Fallback Strategy:**
1. **Dexscreener** (Primary): Fastest, most reliable for active tokens
2. **Jupiter** (Fallback): Comprehensive token list, no price data
3. **Birdeye** (Fallback): Detailed token information with API key

#### **Performance Features:**
- **Cache TTL**: 5 minutes for validation results
- **Rate Limits**: 
  - Dexscreener: 30 calls/minute
  - Jupiter: 10 calls/minute  
  - Birdeye: 20 calls/minute
- **Connection Limits**: 100 total, 30 per host
- **Timeout Handling**: 30s total, 10s connect timeout

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd volume_bot
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables in `.env`:
```env
BOT_TOKEN=your_telegram_bot_token
ADMIN_IDS=["admin_user_id"]
BIRDEYE_API_KEY=your_birdeye_api_key
BOT_WALLET_ADDRESS=your_wallet_address
DATABASE_URL=sqlite:///bot.db
BOT_USERNAME=@your_bot_username
```

4. Run the bot:
```bash
python main.py
```

## 🧪 Testing

Run the comprehensive test suite:
```bash
python test_improved_validator.py
```

This will test:
- Basic token validation
- Caching functionality
- Concurrent validation
- Rate limiting
- Error handling
- Token type detection

## 🔧 Configuration

### API Configuration (`config/settings.py`)
```python
API_CONFIG = {
    "SOLANA_RPC_URL": "https://api.mainnet-beta.solana.com",
    "DEXSCREENER_API": "https://api.dexscreener.com",
    "BIRDEYE_API_KEY": "your_api_key",
    "BIRDEYE_API_URL": "https://public-api.birdeye.so",
}
```

### Rate Limiting
- Dexscreener: 30 calls/minute
- Jupiter: 10 calls/minute
- Birdeye: 20 calls/minute

## 📊 Usage

### Token Validation
```python
from services.token_validator import TokenValidator

async def validate_token():
    validator = TokenValidator()
    
    # Single token validation
    is_valid, info = await validator.validate_token("token_address")
    
    # Multiple tokens concurrently
    results = await validator.validate_multiple_tokens(["token1", "token2"])
    
    # Cache management
    stats = validator.get_cache_stats()
    validator.clear_cache()
    
    await validator.close()
```

### Bot Commands
- `/start` - Welcome message and instructions
- Send any Solana token address for validation
- Use inline buttons for package selection

## 🔍 Monitoring

### Logging
The bot uses structured logging with different levels:
- `DEBUG`: Detailed validation steps
- `INFO`: Successful validations and important events
- `WARNING`: API timeouts and rate limit hits
- `ERROR`: API failures and validation errors

### Cache Statistics
Monitor cache performance:
```python
stats = validator.get_cache_stats()
# Returns: {'cache_size': 5, 'cache_ttl': 300}
```

## 🛠️ Development

### Adding New APIs
1. Add API configuration to `config/settings.py`
2. Implement validation method in `TokenValidator`
3. Add to validation methods list in `validate_token()`
4. Add rate limiter if needed

### Best Practices
- Always use `await validator.close()` to clean up resources
- Handle exceptions gracefully
- Use type hints for better code quality
- Test with both valid and invalid tokens
- Monitor API quotas and rate limits

## 📈 Performance

### Benchmarks
- **Cache Hit**: ~0.001s (instant)
- **Dexscreener**: ~0.3-1.0s
- **Jupiter**: ~30s (timeout common)
- **Birdeye**: ~0.5-1.5s (with valid API key)

### Optimization Tips
- Use caching for frequently requested tokens
- Implement concurrent validation for multiple tokens
- Monitor and adjust rate limits based on API quotas
- Use connection pooling for better performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes with proper tests
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 