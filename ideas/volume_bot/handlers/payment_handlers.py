from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes
import logging
import sqlite3
from datetime import datetime
import os

# Set up logging
logger = logging.getLogger(__name__)

# Initialize database connection
def init_db():
    conn = sqlite3.connect('payments.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            token_address TEXT NOT NULL,
            package_id TEXT NOT NULL,
            amount REAL NOT NULL,
            status TEXT DEFAULT 'pending',
            media_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    return conn, cursor

async def handle_payment_proof(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle payment proof upload."""
    try:
        if not update.message.photo:
            await update.message.reply_text(
                "❌ Please send a screenshot of your payment.",
                reply_markup=InlineKeyboardMarkup([[
                    InlineKeyboardButton("Back", callback_data="back_to_packages")
                ]])
            )
            return

        # Get the highest resolution photo
        photo = update.message.photo[-1]
        
        # Get payment details from context
        package = context.user_data.get('selected_package')
        token_address = context.user_data.get('token_address')
        
        if not package or not token_address:
            await update.message.reply_text(
                "❌ Error: Missing payment details. Please try again from the beginning.",
                reply_markup=InlineKeyboardMarkup([[
                    InlineKeyboardButton("Back to Start", callback_data="back_to_main")
                ]])
            )
            return

        # Initialize database
        conn, cursor = init_db()
        
        try:
            # Save payment proof
            cursor.execute(
                """
                INSERT INTO payments 
                (user_id, token_address, package_id, amount, status, media_id, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    update.effective_user.id,
                    token_address,
                    package['duration'],
                    package['price'],
                    'awaiting_review',
                    photo.file_id,
                    datetime.now(),
                    datetime.now()
                )
            )
            conn.commit()
            
            logger.info(f"Payment proof saved for user {update.effective_user.id}: {photo.file_id}")
            
            # Send confirmation message with payment image
            try:
                with open('media/payment/payment_confirmation.png', 'rb') as payment_image:
                    await update.message.reply_photo(
                        photo=payment_image,
                        caption="✅ Payment proof received! Our team will verify your payment shortly.\n\n"
                                "You will be notified once the verification is complete.\n\n"
                                "Use /start to return to the main menu.",
                        reply_markup=InlineKeyboardMarkup([[
                            InlineKeyboardButton("Back to Start", callback_data="back_to_main")
                        ]])
                    )
            except FileNotFoundError:
                # Fallback if image is not found
                await update.message.reply_text(
                    "✅ Payment proof received! Our team will verify your payment shortly.\n\n"
                    "You will be notified once the verification is complete.\n\n"
                    "Use /start to return to the main menu.",
                    reply_markup=InlineKeyboardMarkup([[
                        InlineKeyboardButton("Back to Start", callback_data="back_to_main")
                    ]])
                )
            
            # Clear user data
            context.user_data.clear()
            
        except Exception as e:
            logger.error(f"Database error: {e}")
            await update.message.reply_text(
                "❌ Error saving payment proof. Please try again.",
                reply_markup=InlineKeyboardMarkup([[
                    InlineKeyboardButton("Back", callback_data="back_to_packages")
                ]])
            )
        finally:
            conn.close()
            
    except Exception as e:
        logger.error(f"Error in handle_payment_proof: {e}")
        await update.message.reply_text(
            "❌ An error occurred. Please try again.",
            reply_markup=InlineKeyboardMarkup([[
                InlineKeyboardButton("Back to Start", callback_data="back_to_main")
            ]])
        ) 