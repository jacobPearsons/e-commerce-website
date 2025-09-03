import pytest
import asyncio
from unittest.mock import Mock, patch, AsyncMock
from datetime import datetime
from services.memecoin_tracker import MemeCoinTracker
from config.settings import get_config

@pytest.fixture
def mock_config():
    return {
        "api": {
            "SOLANA_RPC_URL": "https://test-rpc.solana.com",
            "BIRDEYE_API_KEY": "test_key",
            "DEXSCREENER_API": "https://test-api.dexscreener.com",
            "SOLSCAN_API": "https://test-api.solscan.io"
        },
        "alerts": {
            "price_change_1h": 10,
            "liquidity_change": 20,
            "large_tx": 1000
        }
    }

@pytest.fixture
def tracker(mock_config):
    with patch('services.memecoin_tracker.get_config', return_value=mock_config):
        return MemeCoinTracker()

@pytest.mark.asyncio
async def test_get_coin_data(tracker):
    # Mock API responses
    mock_solana_response = Mock()
    mock_solana_response.status = 200
    mock_solana_response.value = {"data": "test"}
    
    mock_birdeye_response = {
        "data": {
            "value": 1.0,
            "change24h": 5.0
        }
    }
    
    mock_dexscreener_response = {
        "pairs": [{
            "liquidity": {
                "usd": 1000000
            },
            "volume24h": 500000
        }]
    }
    
    mock_solscan_response = {
        "name": "Test Token",
        "symbol": "TEST",
        "decimals": 9,
        "supply": "1000000000"
    }
    
    # Setup mocks
    tracker.solana_client.get_account_info = AsyncMock(return_value=mock_solana_response)
    tracker.birdeye_client.request = AsyncMock(return_value=mock_birdeye_response)
    tracker.dexscreener_client.request = AsyncMock(return_value=mock_dexscreener_response)
    tracker.solscan_client.request = AsyncMock(return_value=mock_solscan_response)
    
    # Test data fetching
    data = await tracker.get_coin_data("test_token")
    
    assert data is not None
    assert data['solana_info'] == mock_solana_response
    assert data['price_info'] == mock_birdeye_response
    assert data['liquidity_info'] == mock_dexscreener_response
    assert data['solscan_info'] == mock_solscan_response

@pytest.mark.asyncio
async def test_analyze_changes(tracker):
    # Test data
    token_address = "test_token"
    current_data = {
        'price_info': {
            'data': {'value': 1.1}
        },
        'liquidity_info': {
            'pairs': [{
                'liquidity': {'usd': 1100000}
            }]
        }
    }
    
    previous_data = {
        'price_info': {
            'data': {'value': 1.0}
        },
        'liquidity_info': {
            'pairs': [{
                'liquidity': {'usd': 1000000}
            }]
        }
    }
    
    # Setup previous data
    tracker.previous_data[token_address] = previous_data
    
    # Test analysis
    alerts = tracker.analyze_changes(token_address, current_data)
    
    assert len(alerts) == 2  # Should have both price and liquidity alerts
    assert "Price changed by 10.00%" in alerts[0]
    assert "Liquidity changed by 10.00%" in alerts[1]

def test_format_coin_data(tracker):
    # Test data
    data = {
        'solscan_info': {
            'name': 'Test Token',
            'symbol': 'TEST',
            'decimals': 9,
            'supply': '1000000000'
        },
        'price_info': {
            'data': {
                'value': 1.0,
                'change24h': 5.0
            }
        },
        'liquidity_info': {
            'pairs': [{
                'liquidity': {
                    'usd': 1000000
                },
                'volume24h': 500000
            }]
        }
    }
    
    # Test formatting
    formatted = tracker.format_coin_data(data)
    
    assert "Test Token" in formatted
    assert "TEST" in formatted
    assert "$1.0" in formatted
    assert "5.0%" in formatted
    assert "$1000000" in formatted
    assert "$500000" in formatted

@pytest.mark.asyncio
async def test_monitor_coin(tracker):
    # Mock callback
    callback = AsyncMock()
    
    # Mock get_coin_data
    tracker.get_coin_data = AsyncMock(return_value={
        'price_info': {'data': {'value': 1.0}},
        'liquidity_info': {'pairs': [{'liquidity': {'usd': 1000000}}]}
    })
    
    # Start monitoring
    monitor_task = asyncio.create_task(
        tracker.monitor_coin("test_token", callback, interval=1)
    )
    
    # Wait for a few iterations
    await asyncio.sleep(3)
    
    # Cancel monitoring
    monitor_task.cancel()
    try:
        await monitor_task
    except asyncio.CancelledError:
        pass
    
    # Verify callback was called
    assert callback.call_count > 0

def test_add_remove_coin(tracker):
    # Test adding coin
    tracker.add_coin("test_token", "Test Token")
    assert "test_token" in tracker.tracked_coins
    assert tracker.tracked_coins["test_token"]["name"] == "Test Token"
    
    # Test removing coin
    tracker.remove_coin("test_token")
    assert "test_token" not in tracker.tracked_coins 