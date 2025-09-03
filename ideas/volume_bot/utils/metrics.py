import sqlite3
import json
import os
from datetime import datetime, timedelta
import logging
from typing import Dict, List, Optional
from config.settings import DB_CONFIG

logger = logging.getLogger(__name__)

class MetricsCollector:
    def __init__(self):
        self.db_path = DB_CONFIG["path"]
        self._ensure_db_directory()
        self._init_db()
        
    def _ensure_db_directory(self):
        """Ensure the database directory exists"""
        db_dir = os.path.dirname(self.db_path)
        if db_dir and not os.path.exists(db_dir):
            os.makedirs(db_dir)
            logger.info(f"Created database directory: {db_dir}")
        
    def _init_db(self):
        """Initialize the metrics database"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Create API metrics table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS api_metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    service TEXT NOT NULL,
                    endpoint TEXT NOT NULL,
                    status_code INTEGER,
                    response_time REAL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            # Create alert metrics table
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS alert_metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    token_address TEXT NOT NULL,
                    alert_type TEXT NOT NULL,
                    alert_data TEXT,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            conn.commit()
            logger.info(f"Initialized database at {self.db_path}")
        except Exception as e:
            logger.error(f"Error initializing database: {e}")
            raise
        finally:
            conn.close()
        
    def record_api_call(self, service: str, endpoint: str, status_code: int, response_time: float):
        """Record an API call metric"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute(
                """
                INSERT INTO api_metrics (service, endpoint, status_code, response_time)
                VALUES (?, ?, ?, ?)
                """,
                (service, endpoint, status_code, response_time)
            )
            
            conn.commit()
        except Exception as e:
            logger.error(f"Error recording API metric: {e}")
        finally:
            conn.close()
            
    def record_alert(self, token_address: str, alert_type: str, alert_data: Dict):
        """Record an alert metric"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cursor.execute(
                """
                INSERT INTO alert_metrics (token_address, alert_type, alert_data)
                VALUES (?, ?, ?)
                """,
                (token_address, alert_type, json.dumps(alert_data))
            )
            
            conn.commit()
        except Exception as e:
            logger.error(f"Error recording alert metric: {e}")
        finally:
            conn.close()
            
    def get_api_metrics(self, service: Optional[str] = None, 
                       start_time: Optional[datetime] = None,
                       end_time: Optional[datetime] = None) -> List[Dict]:
        """Get API metrics with optional filters"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            query = "SELECT * FROM api_metrics WHERE 1=1"
            params = []
            
            if service:
                query += " AND service = ?"
                params.append(service)
                
            if start_time:
                query += " AND timestamp >= ?"
                params.append(start_time.isoformat())
                
            if end_time:
                query += " AND timestamp <= ?"
                params.append(end_time.isoformat())
                
            cursor.execute(query, params)
            rows = cursor.fetchall()
            
            return [
                {
                    "id": row[0],
                    "service": row[1],
                    "endpoint": row[2],
                    "status_code": row[3],
                    "response_time": row[4],
                    "timestamp": row[5]
                }
                for row in rows
            ]
        except Exception as e:
            logger.error(f"Error getting API metrics: {e}")
            return []
        finally:
            conn.close()
            
    def get_alert_metrics(self, token_address: Optional[str] = None,
                         alert_type: Optional[str] = None,
                         start_time: Optional[datetime] = None,
                         end_time: Optional[datetime] = None) -> List[Dict]:
        """Get alert metrics with optional filters"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            query = "SELECT * FROM alert_metrics WHERE 1=1"
            params = []
            
            if token_address:
                query += " AND token_address = ?"
                params.append(token_address)
                
            if alert_type:
                query += " AND alert_type = ?"
                params.append(alert_type)
                
            if start_time:
                query += " AND timestamp >= ?"
                params.append(start_time.isoformat())
                
            if end_time:
                query += " AND timestamp <= ?"
                params.append(end_time.isoformat())
                
            cursor.execute(query, params)
            rows = cursor.fetchall()
            
            return [
                {
                    "id": row[0],
                    "token_address": row[1],
                    "alert_type": row[2],
                    "alert_data": json.loads(row[3]),
                    "timestamp": row[4]
                }
                for row in rows
            ]
        except Exception as e:
            logger.error(f"Error getting alert metrics: {e}")
            return []
        finally:
            conn.close()
            
    def cleanup_old_metrics(self, days: int = 7):
        """Clean up metrics older than specified days"""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            cutoff_date = (datetime.now() - timedelta(days=days)).isoformat()
            
            cursor.execute(
                "DELETE FROM api_metrics WHERE timestamp < ?",
                (cutoff_date,)
            )
            
            cursor.execute(
                "DELETE FROM alert_metrics WHERE timestamp < ?",
                (cutoff_date,)
            )
            
            conn.commit()
        except Exception as e:
            logger.error(f"Error cleaning up old metrics: {e}")
        finally:
            conn.close() 