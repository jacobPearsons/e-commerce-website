from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes
import logging
import re
from typing import Dict

from services.token_validator import TokenValidator

from utils.rate_limiter import APIClient
from utils.rate_limiter import escape_markdown_v2
from config.settings import get_config

# Add this utility at the top (after imports):
def get_target_message(update):
    return update.message if update.message else (update.callback_query.message if update.callback_query else None)

# Set up logging
logger = logging.getLogger(__name__)

# Initialize services
try:
    logger.debug("Initializing services in message_handlers...")
    token_validator = TokenValidator()
    logger.debug("Services initialized successfully in message_handlers")
except Exception as e:
    logger.error(f"Failed to initialize services: {e}")
    raise

# Store user states and data
user_states: Dict[int, Dict] = {}

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle the /start command."""
    try:
        # Create welcome message with image
        welcome_text = (
            "╭──────────────────────────────╮\n"
            "          🚀 *FATALITY BUY BOT*          \n"
            "╰──────────────────────────────╯\n\n"
            "🔹 *Professional Solana Token Acceleration*\n"
            "_Algorithmic trading support for Raydium & Pump\.fun tokens_\n\n"
            "📈 *Core Services*\n"
            "┌──────────────────────────────\n"
            "│ 🟢 Chart Momentum Boosting\n"
            "│ 📊 Real\-time Performance Monitoring\n"
            "│ ⚡ Instant Liquidity Provision\n"
            "│ 🔒 Secure Transaction Handling\n"
            "└──────────────────────────────\n\n"
            "💎 *Why Choose Fatality?*\n"
            "• Institutional\-grade trading algorithms\n"
            "• Dedicated token acceleration pipelines\n"
            "• Transparent execution reporting\n"
            "• 24/7 market surveillance\n\n"
            "📌 *Supported Protocols*\n"
            "◈ Raydium \(Full support\)\n"
            "◈ Pump\.fun \(Full support\)\n\n"
            "⚡ *Get Started*\n"
            "1\. Submit your token details\n"
            "2\. Select one of our services\n"
            "3\. Monitor real\-time results\n\n"
            "🔗 _Powered by Fatality Technologies_"
        )
        try:
            with open('media/start/logo.png', 'rb') as photo:
                await update.message.reply_photo(
                    photo=photo,
                    caption=welcome_text,
                    parse_mode='MarkdownV2'
                )
        except Exception as e:
            logger.error(f"Error sending welcome image: {e}")
            # Fallback to text-only message if image fails
            await update.message.reply_text(welcome_text, parse_mode='MarkdownV2')
    except Exception as e:
        logger.error(f"Error in start command: {e}")
        await update.message.reply_text(
            "❌ Sorry, something went wrong. Please try again with /start"
        )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        user_data = context.user_data
        message_text = update.message.text.strip() if update.message and update.message.text else ""

        # Step 1: Awaiting Telegram link
        if user_data.get('awaiting_telegram_link'):
            user_data['telegram_link'] = message_text
            user_data['awaiting_telegram_link'] = False
            user_data['awaiting_logo'] = True
            await update.message.reply_text("🖼 Send your logo or banner (to skip, enter 'no'):")
            return

        # Step 2: Awaiting logo
        if user_data.get('awaiting_logo'):
            if update.message.photo:
                # Get the largest photo
                photo = update.message.photo[-1]
                user_data['logo_file_id'] = photo.file_id
                await update.message.reply_text("✅ Logo received!")
            elif message_text.lower() == "no":
                user_data['logo_file_id'] = None
                await update.message.reply_text("No logo will be used.")
            else:
                await update.message.reply_text("Please send a photo or type 'no' to skip.")
                return
            user_data['awaiting_logo'] = False
            # Now show volume boost packages directly
            from handlers.package_handlers import show_volume_boost_packages
            await show_volume_boost_packages(update, context)
            return

        # Default: check for Solana address
        if token_validator.is_valid_solana_address(message_text):
            await handle_token_address(update, context, message_text)
        else:
            # Show the welcome message and prompt for a valid address
            await start_command(update, context)
    except Exception as e:
        logger.error(f"Error in handle_message: {e}", exc_info=True)
        await update.message.reply_text(
            "Sorry, something went wrong. Please try again or use /start."
        )

async def handle_token_address(update: Update, context: ContextTypes.DEFAULT_TYPE, token_address: str):
    """Handle token address input."""
    try:
        user_id = update.effective_user.id
        # Show the welcome/menu message while validating
        await start_command(update, context)
        loading_message = await update.message.reply_text(
            "🔍 Validating token... Please wait."
        )
        try:
            is_valid, info = await token_validator.validate_token(token_address)
            try:
                await loading_message.delete()
            except Exception:
                pass
            if is_valid:
                # Store token info and address for later steps
                context.user_data['token_info'] = info
                context.user_data['token_address'] = token_address
                price = 0.0
                try:
                    price = float(info.get('price', 0) or 0)
                except Exception:
                    price = 0.0
                msg = (
                    f"{escape_markdown_v2('✅ TOKEN VERIFIED SUCCESSFULLY! ✅')}\n\n"
                    f"{escape_markdown_v2('📋 Token Details')}\n"
                    f"{escape_markdown_v2('┌──────────────────────────────')}\n"
                    f"│ 🏷️  Name: {escape_markdown_v2(str(info.get('name', 'N/A')))}\n"
                    f"│ 🔠  Symbol: {escape_markdown_v2(str(info.get('symbol', 'N/A')))}\n"
                    f"│ 🔗  Address: {escape_markdown_v2(str(info.get('mint', token_address)))}\n"
                    f"{escape_markdown_v2('└──────────────────────────────')}\n\n"
                    f"{escape_markdown_v2('🚀 Status: Ready for promotion!')}\n"
                    f"{escape_markdown_v2('✨ Next Steps: Choose one of our services below')}"
                )
                try:
                    with open('media/token/speed.png', 'rb') as photo:
                        await update.message.reply_photo(
                            photo=photo,
                            caption=msg,
                            parse_mode='MarkdownV2'
                        )
                except Exception as photo_error:
                    logger.error(f"Error sending photo: {photo_error}")
                    await update.message.reply_text(msg, parse_mode='MarkdownV2')
                menu_keyboard = [
                    [InlineKeyboardButton("Our Services", callback_data="our_services"),
                    InlineKeyboardButton("Get Ultimate Boost for 4 SOL", callback_data="ultimate_boost")],
                    [InlineKeyboardButton("Cancel", callback_data="back_to_main")]
                ]
                try:
                    with open('media/packages/menu.png', 'rb') as menu_photo:
                        await update.message.reply_photo(
                            photo=menu_photo,
                            reply_markup=InlineKeyboardMarkup(menu_keyboard)
                        )
                except Exception as menu_photo_error:
                    logger.error(f"Error sending menu photo: {menu_photo_error}")
                    await update.message.reply_text(
                        text="Please choose an option:",
                        reply_markup=InlineKeyboardMarkup(menu_keyboard)
                    )
            else:
                logger.warning(f"Token validation failed. Raw info: {info}")
                await update.message.reply_text(
                    escape_markdown_v2(f"❌ Token validation failed: {info.get('error', 'Unknown error')}")
                    , parse_mode='MarkdownV2'
                )
            return
        except Exception as e:
            logger.error(f"Error validating token: {e}", exc_info=True)
            try:
                await loading_message.delete()
            except Exception:
                pass
            await update.message.reply_text(
                "❌ Error validating token. Please try again."
            )
            return
    except Exception as e:
        logger.error(f"Error handling token address: {e}", exc_info=True)
        await update.message.reply_text(
            "Sorry, there was an error processing the token address. Please try again."
        )

async def cleanup_monitoring(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Clean up monitoring task when user goes back or cancels."""
    try:
        user_id = update.effective_user.id

        if user_id in user_states:
            # Remove all tracked tokens for this user
            for token_address in user_states[user_id].get('tracked_tokens', []):
                try:
                    await stop_coin_tracking(token_address, update.effective_chat.id, context)
                except Exception as e:
                    logger.error(f"Error removing coin {token_address}: {e}")

            # Clear user state
            user_states[user_id] = {
                'waiting_for_token': False,
                'waiting_for_telegram': False,
                'tracked_tokens': set()
            }
    except Exception as e:
        logger.error(f"Error in cleanup_monitoring: {e}", exc_info=True)

# If you need a token tracking callback handler, use a unique name:
async def handle_token_tracking_callback(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle token tracking related callback queries."""
    try:
        query = update.callback_query
        await query.answer()

        if query.data == 'back_to_main':
            await cleanup_monitoring(update, context)
            await start_command(update, context)

        elif query.data == 'track_token':
            await query.message.edit_text(
                "📊 Token Tracking\n\n"
                "Enter your Token Address to start tracking:"
            )
            # Set user state to waiting for token
            user_id = query.from_user.id
            if user_id not in user_states:
                user_states[user_id] = {}
            user_states[user_id]['waiting_for_token'] = True

        elif query.data.startswith('stop_tracking_'):
            token_address = query.data.replace('stop_tracking_', '')
            await stop_coin_tracking(token_address, query.message.chat_id, context)
            await query.message.edit_text(
                f"✅ Stopped tracking token: {token_address}\n"
                "Send another token address to track a different token."
            )

    except Exception as e:
        logger.error(f"Error in handle_token_tracking_callback: {e}", exc_info=True)
        try:
            target_message = get_target_message(update)
            if target_message:
                await target_message.reply_text(
                    "❌ Sorry, something went wrong. Please try again."
                )
        except Exception as e2:
            logger.error(f"Error sending error message: {e2}", exc_info=True)

async def ultimate_boost(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle the ultimate_boost callback."""
    try:
        welcome_text = (
            f"🌟 *{escape_markdown_v2('ULTIMATE BOOST SERVICE')}* 🌟\n\n"
            f"🔹 *{escape_markdown_v2('Premium Liquidity Solutions for Discerning Projects')}*\n\n"
            f"📈 *{escape_markdown_v2('Key Benefits')}*\n"
            f"┌──────────────────────────────\n"
            f"│ ✅ {escape_markdown_v2('Exchange Visibility Guarantee')}\n"
            f"│ ✅ {escape_markdown_v2('Sustainable Volume Growth')}\n"
            f"│ ✅ {escape_markdown_v2('Market Credibility Enhancement')}\n"
            f"│ ✅ {escape_markdown_v2('Comprehensive Fee Structure')}\n"
            f"└──────────────────────────────\n\n"
            f"💎 *{escape_markdown_v2('Why Choose Ultimate Boost?')}*\n"
            f"• {escape_markdown_v2('Institutional-grade volume engineering')}\n"
            f"• {escape_markdown_v2('Algorithmic market positioning')}\n"
            f"• {escape_markdown_v2('Transparent performance metrics')}\n"
            f"• {escape_markdown_v2('White-glove client support')}\n\n"
            f"📌 *{escape_markdown_v2('Payment Information')}*\n"
            f"• {escape_markdown_v2('All-inclusive pricing - no hidden fees')}\n"
            f"• {escape_markdown_v2('Flexible payment options available')}\n"
            f"• {escape_markdown_v2('Transaction confirmation required')}\n\n"
            f"🛎️ *{escape_markdown_v2('Need assistance?')}* {escape_markdown_v2('Contact @Fatality_bot')}"
        )
        # Support both message and callback_query
        target_message = get_target_message(update)
        if not target_message:
            logger.error("No message found in update for ultimate_boost.")
            return
        try:
            with open('media/volume/ultimate.png', 'rb') as photo:
                await target_message.reply_photo(
                    photo=photo,
                    caption=welcome_text,
                    parse_mode='MarkdownV2'
                )
        except Exception as e:
            logger.error(f"Error sending ultimate boost image: {e}")
            await target_message.reply_text(welcome_text, parse_mode='MarkdownV2')
    except Exception as e:
        logger.error(f"Error in ultimate_boost: {e}")
        # Fallback to replying to the user in any way possible
        try:
            target_message = get_target_message(update)
            if target_message:
                await target_message.reply_text(
                    "❌ Sorry, something went wrong. Please try again with /start"
                )
        except Exception as e2:
            logger.error(f"Error sending fallback error message: {e2}") 