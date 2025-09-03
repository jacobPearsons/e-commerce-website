from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, CallbackQueryHandler, MessageHandler, ContextTypes, filters
import requests

BIRDEYE_API_KEY = "your_birdeye_api_key"  # replace with real key

# Start Command
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [InlineKeyboardButton("🚀 Start Pump", callback_data='start_pump')],
        [InlineKeyboardButton("📊 Volume Boost", callback_data='volume_boost')],
        [InlineKeyboardButton("📢 Bump Boost", callback_data='bump_boost')],
        [InlineKeyboardButton("📣 Main Channel", url="https://t.me/your_channel_link")]
    ]
    await update.message.reply_text(
        "🚨 *Welcome to the Fatality Buy Bot* 🚨\n\n"
        "🎥 *Daily Livestream at 7PM UTC!* (12 hrs)\n"
        "🔥 Premium Trending tokens featured & speak live\n\n"
        "📈 Community Trending via our voting system!\n"
        "🏆 Top 10 tokens → Livestream. Top 3 → Partner calls!\n\n"
        "💰 10 random voters win $20 daily (Paid by us!)\n\n"
        "Choose an option below 👇",
        parse_mode='Markdown',
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

# Button Actions
async def button_handler(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()

    if query.data == 'start_pump':
        await query.message.reply_text("🔍 Send the *Contract Address* (CA) of the token you want to pump:", parse_mode='Markdown')
        context.user_data['expecting_ca'] = True

    elif query.data == 'volume_boost':
        keyboard = [
            [InlineKeyboardButton("💸 Boost $100", callback_data='boost_100')],
            [InlineKeyboardButton("💰 Boost $500", callback_data='boost_500')],
            [InlineKeyboardButton("🚀 Boost $1000", callback_data='boost_1000')],
        ]
        await query.message.reply_text("Select a boost option:", reply_markup=InlineKeyboardMarkup(keyboard))

    elif query.data == 'bump_boost':
        await query.message.reply_text("📢 Coming soon: Bump Boost options!")

    elif query.data.startswith('boost_'):
        amount = query.data.split("_")[1]
        await query.message.reply_text(f"✅ You selected a ${amount} boost. Further actions coming soon!")

# CA Input Handler
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if context.user_data.get('expecting_ca'):
        ca = update.message.text.strip()
        context.user_data['expecting_ca'] = False
        await update.message.reply_text("🔎 Checking token info via Birdeye...")

        # Use Birdeye API
        birdeye_url = f"https://public-api.birdeye.so/public/token/{ca}?apikey={BIRDEYE_API_KEY}"
        response = requests.get(birdeye_url)

        if response.status_code == 200 and 'data' in response.json():
            token_data = response.json()['data']
            name = token_data.get('name')
            symbol = token_data.get('symbol')
            price = token_data.get('priceUsd')
            await update.message.reply_text(
                f"✅ Token Found:\n\n"
                f"📛 Name: {name}\n"
                f"💱 Symbol: {symbol}\n"
                f"💵 Price: ${price:.6f}"
            )
        else:
            await update.message.reply_text("❌ Invalid CA or token not found on Birdeye.")

# Main Entry
if __name__ == '__main__':
    app = ApplicationBuilder().token("YOUR_BOT_TOKEN").build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(button_handler))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    print("Bot running...")
    app.run_polling()
