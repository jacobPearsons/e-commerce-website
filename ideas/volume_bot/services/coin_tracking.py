import logging
import asyncio
from typing import Dict, Set
from datetime import datetime

logger = logging.getLogger(__name__)

tracking_data: Dict[str, Dict] = {}
user_tokens: Dict[int, Set[str]] = {}

async def start_coin_tracking(token_address: str, chat_id: int, context) -> bool:
    """
    Start tracking a coin for a specific chat.
    
    Args:
        token_address: The Solana token address to track
        chat_id: The Telegram chat ID to send updates to
        context: The Telegram bot context
        
    Returns:
        bool: True if tracking started successfully, False otherwise
    """
    try:
        logger.info(f"Starting coin tracking for {token_address} in chat {chat_id}")
        
        # Initialize tracking data
        if token_address not in tracking_data:
            tracking_data[token_address] = {
                'chat_ids': set(),
                'started_at': datetime.now(),
                'last_update': datetime.now(),
                'is_active': True
            }
        
        # Add chat to tracking
        tracking_data[token_address]['chat_ids'].add(chat_id)
        
        # Track user's tokens
        if chat_id not in user_tokens:
            user_tokens[chat_id] = set()
        user_tokens[chat_id].add(token_address)
        
        logger.info(f"Successfully started tracking {token_address} for chat {chat_id}")
        return True
        
    except Exception as e:
        logger.error(f"Error starting coin tracking for {token_address}: {e}")
        return False

async def stop_coin_tracking(token_address: str, chat_id: int, context) -> bool:
    """
    Stop tracking a coin for a specific chat.
    
    Args:
        token_address: The Solana token address to stop tracking
        chat_id: The Telegram chat ID
        context: The Telegram bot context
        
    Returns:
        bool: True if tracking stopped successfully, False otherwise
    """
    try:
        logger.info(f"Stopping coin tracking for {token_address} in chat {chat_id}")
        
        # Remove chat from tracking
        if token_address in tracking_data:
            tracking_data[token_address]['chat_ids'].discard(chat_id)
            
            # If no more chats tracking this token, remove it entirely
            if not tracking_data[token_address]['chat_ids']:
                del tracking_data[token_address]
        
        # Remove token from user's tracked tokens
        if chat_id in user_tokens:
            user_tokens[chat_id].discard(token_address)
            
            # If user has no more tracked tokens, remove them
            if not user_tokens[chat_id]:
                del user_tokens[chat_id]
        
        logger.info(f"Successfully stopped tracking {token_address} for chat {chat_id}")
        return True
        
    except Exception as e:
        logger.error(f"Error stopping coin tracking for {token_address}: {e}")
        return False

async def get_tracked_tokens(chat_id: int) -> Set[str]:
    """
    Get all tokens being tracked by a specific chat.
    
    Args:
        chat_id: The Telegram chat ID
        
    Returns:
        Set[str]: Set of token addresses being tracked
    """
    return user_tokens.get(chat_id, set())

async def get_tracking_stats() -> Dict:
    """
    Get statistics about current tracking.
    
    Returns:
        Dict: Statistics about tracking
    """
    total_tokens = len(tracking_data)
    total_chats = sum(len(data['chat_ids']) for data in tracking_data.values())
    
    return {
        'total_tokens_tracked': total_tokens,
        'total_chats_tracking': total_chats,
        'active_tracking_data': tracking_data,
        'user_tokens': user_tokens
    }

async def cleanup_expired_tracking():
    """
    Clean up expired tracking data (placeholder for future implementation).
    """
    try:
        # This is a placeholder for future cleanup logic
        # In a real implementation, you might want to:
        # - Remove tracking data older than X days
        # - Stop tracking tokens that haven't had activity
        # - Clean up orphaned data
        
        logger.debug("Running tracking cleanup (placeholder)")
        
    except Exception as e:
        logger.error(f"Error in cleanup_expired_tracking: {e}")

# Background task for periodic cleanup
async def start_cleanup_task():
    """
    Start the background cleanup task.
    """
    while True:
        try:
            await cleanup_expired_tracking()
            # Run cleanup every hour
            await asyncio.sleep(3600)
        except Exception as e:
            logger.error(f"Error in cleanup task: {e}")
            await asyncio.sleep(300)  # Wait 5 minutes before retrying 