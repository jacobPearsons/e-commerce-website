from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes
from src.database.models import Database
from src.config.settings import ADMIN_IDS

class AdminHandler:
    def __init__(self, database: Database):
        self.db = database

    def is_admin(self, user_id: int) -> bool:
        """Check if user is admin"""
        return user_id in ADMIN_IDS

    async def admin_panel(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show admin panel"""
        message = update.message
        if not self.is_admin(message.from_user.id):
            await message.reply_text("❌ Unauthorized")
            return

        # Get pending payments
        payments = self.db.get_pending_payments()
        if not payments:
            await message.reply_text("No pending payments.")
            return

        # Show each payment with approve/reject buttons
        for payment in payments:
            kb = InlineKeyboardMarkup([[
                InlineKeyboardButton("✅ Confirm", callback_data=f"confirm_{payment['user_id']}"),
                InlineKeyboardButton("❌ Reject", callback_data=f"reject_{payment['user_id']}")
            ]])
            
            await message.reply_photo(
                payment['media_id'],
                caption=f"User: {payment['user_id']}\nPackage: ${payment['package']}",
                reply_markup=kb
            )

    async def handle_admin_decision(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Handle admin's decision on payment"""
        query = update.callback_query
        if not self.is_admin(query.from_user.id):
            await query.answer("❌ Unauthorized")
            return

        action, user_id = query.data.split("_")
        status = "confirmed" if action == "confirm" else "rejected"

        if self.db.update_payment_status(int(user_id), status):
            # Notify user
            await context.bot.send_message(
                user_id,
                f"💬 Your payment has been {status}."
            )
            
            # Notify admin
            await query.answer(f"Payment {status}.")
        else:
            await query.answer("❌ Error updating payment status.")

    async def show_stats(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show bot statistics"""
        message = update.message
        if not self.is_admin(message.from_user.id):
            await message.reply_text("❌ Unauthorized")
            return

        # Get statistics
        stats = self.db.get_stats()
        
        await message.reply_text(
            "📊 Bot Statistics\n\n"
            f"Total Users: {stats['total_users']}\n"
            f"Active Trackings: {stats['active_trackings']}\n"
            f"Pending Payments: {stats['pending_payments']}\n"
            f"Total Volume: ${stats['total_volume']:,.2f}\n"
            f"Total Bumps: {stats['total_bumps']}"
        )

    async def broadcast_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Broadcast message to all users"""
        message = update.message
        if not self.is_admin(message.from_user.id):
            await message.reply_text("❌ Unauthorized")
            return

        # Get broadcast message
        broadcast_text = message.text.split("/broadcast", 1)[1].strip()
        if not broadcast_text:
            await message.reply_text("Please provide a message to broadcast.")
            return

        # Get all users
        users = self.db.get_all_users()
        success = 0
        failed = 0

        for user in users:
            try:
                await context.bot.send_message(user['user_id'], broadcast_text)
                success += 1
            except Exception as e:
                print(f"Error sending broadcast to {user['user_id']}: {e}")
                failed += 1

        await message.reply_text(
            f"📢 Broadcast completed\n"
            f"✅ Successfully sent: {success}\n"
            f"❌ Failed: {failed}"
        )
