from typing import Dict, Any, Optional
from datetime import datetime, timedelta
from src.config.settings import BUMP_INTERVAL, MAX_BUMPS_PER_DAY

class BumpService:
    def __init__(self, database):
        self.db = database

    def can_bump(self, user_id: int, contract_address: str) -> Dict[str, Any]:
        """Check if a user can bump a token"""
        try:
            # Check if user has reached daily limit
            if not self.db.can_bump(user_id, contract_address):
                return {
                    "can_bump": False,
                    "reason": "Daily bump limit reached",
                    "next_bump": None
                }

            # Get last bump time
            self.db.cursor.execute("""
                SELECT last_bump_at
                FROM bumps
                WHERE user_id = %s AND contract_address = %s
            """, (user_id, contract_address))
            result = self.db.cursor.fetchone()

            if not result:
                return {
                    "can_bump": True,
                    "reason": None,
                    "next_bump": None
                }

            last_bump = result['last_bump_at']
            next_bump_time = last_bump + timedelta(seconds=BUMP_INTERVAL)
            
            if datetime.now() < next_bump_time:
                return {
                    "can_bump": False,
                    "reason": "Bump cooldown active",
                    "next_bump": next_bump_time
                }

            return {
                "can_bump": True,
                "reason": None,
                "next_bump": None
            }
        except Exception as e:
            print(f"Error checking bump status: {e}")
            return {
                "can_bump": False,
                "reason": "Error checking bump status",
                "next_bump": None
            }

    def execute_bump(self, user_id: int, contract_address: str) -> bool:
        """Execute a bump for a token"""
        try:
            # Check if user can bump
            bump_status = self.can_bump(user_id, contract_address)
            if not bump_status["can_bump"]:
                return False

            # Add bump record
            return self.db.add_bump(user_id, contract_address)
        except Exception as e:
            print(f"Error executing bump: {e}")
            return False

    def get_bump_stats(self, user_id: int, contract_address: str) -> Dict[str, Any]:
        """Get bump statistics for a token"""
        try:
            self.db.cursor.execute("""
                SELECT 
                    bumps_today,
                    last_bump_at,
                    created_at
                FROM bumps
                WHERE user_id = %s AND contract_address = %s
            """, (user_id, contract_address))
            result = self.db.cursor.fetchone()

            if not result:
                return {
                    "bumps_today": 0,
                    "last_bump": None,
                    "first_bump": None,
                    "bumps_remaining": MAX_BUMPS_PER_DAY
                }

            return {
                "bumps_today": result['bumps_today'],
                "last_bump": result['last_bump_at'],
                "first_bump": result['created_at'],
                "bumps_remaining": MAX_BUMPS_PER_DAY - result['bumps_today']
            }
        except Exception as e:
            print(f"Error getting bump stats: {e}")
            return {
                "bumps_today": 0,
                "last_bump": None,
                "first_bump": None,
                "bumps_remaining": MAX_BUMPS_PER_DAY
            }
