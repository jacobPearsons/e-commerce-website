import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes
from utils.rate_limiter import escape_markdown_v2

logger = logging.getLogger(__name__)

async def show_package_options(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show token information and service selection with professional Fatality branding."""
    try:
        token_info = context.user_data.get('token_info')
        if not token_info:
            error_msg = "❌ *Token information missing*\nPlease restart with /start"
            await _send_error_response(update, error_msg)
            return

        # Prepare service keyboard
        service_keyboard = [
            [InlineKeyboardButton("📊 Dex Visibility Package", callback_data="cheap_dex_screener")],
            [InlineKeyboardButton("🚀 Volume Boost Service", callback_data="volume_boost")],
            [InlineKeyboardButton("💎 Ultimate Boost Suite", callback_data="ultimate_boost")]
        ]
        reply_markup = InlineKeyboardMarkup(service_keyboard)

        # Get token details
        token_details = _format_token_details(context)
        
        # Build the message with professional sections
        message = (
            "╭──────────────────────────────╮\n"
            "          🌌 *FATALITY SERVICES*          \n"
            "╰──────────────────────────────╯\n\n"
            f"{_format_token_details(context)}\n"
            "📌 *Available Services*\n"
            "┌──────────────────────────────\n"
            "│ 📊 *Dex Visibility*\n"
            "│   Guaranteed exchange listings\n"
            "│   Chart positioning\n"
            "│   Basic trending support\n\n"
            "│ 🚀 *Volume Boost*\n"
            "│   Liquidity enhancement\n"
            "│   Sustainable volume\n"
            "│   Market credibility\n\n"
            "│ 💎 *Ultimate Boost*\n"
            "│   Full\-service package\n"
            "│   Premium visibility\n"
            "│   Priority support\n"
            "└──────────────────────────────\n\n"
            "🔹 *Select your service below*"
        )

        # Send the message with photo or fallback
        await _send_service_message(update, message, reply_markup)

        logger.info(f"Service selection shown for token: {context.user_data.get('token_address')}")

    except Exception as e:
        logger.error(f"Error in show_package_options: {e}", exc_info=True)
        await _send_error_response(update, "⚠️ Service unavailable\nPlease try again later")

async def show_cheap_dex_screener(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Send the Dex Screener package image and info to the user."""
    caption = (
        "📊 *Dex Visibility Package*\n\n"
        "Get instant chart visibility and trending support for your token.\n"
        "No manual setup required – fully automated and affordable.\n\n"
        "Track your token's performance and plan your next move with confidence!"
    )
    try:
        with open('media/packages/dex-screener.png', 'rb') as photo:
            if update.callback_query:
                await update.callback_query.message.reply_photo(
                    photo=photo,
                    caption=caption,
                    parse_mode='MarkdownV2'
                )
            else:
                await update.message.reply_photo(
                    photo=photo,
                    caption=caption,
                    parse_mode='MarkdownV2'
                )
    except Exception as e:
        logger.error(f"Error sending Dex Screener image: {e}")
        fallback_text = (
            "📊 *Dex Visibility Package*\n\n"
            "Get instant chart visibility and trending support for your token.\n"
            "No manual setup required – fully automated and affordable.\n\n"
            "Track your token's performance and plan your next move with confidence!"
        )
        if update.callback_query:
            await update.callback_query.message.reply_text(fallback_text, parse_mode='MarkdownV2')
        else:
            await update.message.reply_text(fallback_text, parse_mode='MarkdownV2')

def _format_token_details(context):
    """Format token details section with proper escaping."""
    token_info = context.user_data.get('token_info', {})
    token_address = context.user_data.get('token_address', 'N/A')
    
    return (
        f"🔹 *Token Overview*\n"
        f"┌──────────────────────────────\n"
        f"│ 🏷️  *Name:* `{escape_markdown_v2(token_info.get('name', 'Unknown'))}`\n"
        f"│ 🔠  *Symbol:* `{escape_markdown_v2(token_info.get('symbol', 'N/A'))}`\n"
        f"│ 📍  *Address:* `{escape_markdown_v2(token_address)}`\n"
        f"│ 🔥  *Type:* `{escape_markdown_v2(token_info.get('token_type', 'Standard'))}`\n"
        f"└──────────────────────────────"
    )

async def _send_service_message(update, message, reply_markup):
    """Handle message sending with photo fallback."""
    try:
        with open('media/packages/services.png', 'rb') as photo:
            if update.callback_query:
                await update.callback_query.message.reply_photo(
                    photo=photo,
                    caption=message,
                    reply_markup=reply_markup,
                    parse_mode='MarkdownV2'
                )
                await update.callback_query.message.delete()
            else:
                await update.message.reply_photo(
                    photo=photo,
                    caption=message,
                    reply_markup=reply_markup,
                    parse_mode='MarkdownV2'
                )
    except Exception as photo_error:
        logger.error(f"Error sending photo: {photo_error}")
        if update.callback_query:
            try:
                await update.callback_query.edit_message_text(
                    text=message,
                    reply_markup=reply_markup,
                    parse_mode='MarkdownV2'
                )
            except Exception as edit_error:
                logger.error(f"Error editing message: {edit_error}")
                await update.callback_query.message.reply_text(
                    text=message,
                    reply_markup=reply_markup,
                    parse_mode='MarkdownV2'
                )
        else:
            await update.message.reply_text(
                text=message,
                reply_markup=reply_markup,
                parse_mode='MarkdownV2'
            )

async def _send_error_response(update, error_msg):
    """Handle error responses consistently."""
    error_keyboard = [[InlineKeyboardButton("🔙 Main Menu", callback_data="back_to_main")]]
    markup = InlineKeyboardMarkup(error_keyboard)
    
    if update.callback_query:
        try:
            await update.callback_query.edit_message_text(
                text=error_msg,
                reply_markup=markup,
                parse_mode='MarkdownV2'
            )
        except Exception:
            await update.callback_query.message.reply_text(
                text=error_msg,
                reply_markup=markup,
                parse_mode='MarkdownV2'
            )
    else:
        await update.message.reply_text(
            text=error_msg,
            reply_markup=markup,
            parse_mode='MarkdownV2'
        )

async def show_payment_details(query, package, context):
    """Show payment details for selected package."""
    try:
        token_info = context.user_data.get('token_info')
        token_address = context.user_data.get('token_address', '')
        token_name = token_info.get('name', 'Unknown')
        token_symbol = token_info.get('symbol', 'N/A')
        context.user_data['selected_package'] = package
        payment_message = (
            f"{escape_markdown_v2('🎯 *Token Boost Payment*')}\n\n"
            f"*Token:* `{escape_markdown_v2(token_name)} ({escape_markdown_v2(token_symbol)})`\n"
            f"*Address:* `{escape_markdown_v2(token_address)}`\n"
        )
        if token_info.get('description'):
            payment_message += f"\n📝 *Description:*\n`{escape_markdown_v2(token_info['description'])}`\n"
        if token_info.get('social_links'):
            payment_message += "\n🔗 *Social Links:*\n"
            for link in token_info['social_links']:
                payment_message += f"• `{escape_markdown_v2(link['label'])}`: {escape_markdown_v2(link['url'])}\n"
        payment_message += (
            f"\n📊 *Selected Package:*\n"
            f"• Duration: `{escape_markdown_v2(package['duration'])}`\n"
            f"• Price: `{escape_markdown_v2(str(package['price']))} SOL`\n\n"
            f"💳 *Payment Details:*\n"
            f"Send `{escape_markdown_v2(str(package['price']))} SOL` to:\n"
            f"`54sBoKPai8EWptDfioiANfi9MvZkQq4PXDis89AtYoNX`\n\n"
            f"📝 *Package Benefits:*\n"
            f"• Trending visibility for `{escape_markdown_v2(package['duration'])}`\n"
            f"• Front page announcement\n"
            f"• Top position on Trending Board\n"
            f"• Price alerts to 30k\+ investors\n\n"
            f"💡 You can pay in parts — share this message to chip in with others\!\n\n"
            f"⚠️ After sending payment, please send a screenshot of the transaction\.\n\n"
            f"Need help\? Contact @Fatality\_bot"
        )
        keyboard = [
            [InlineKeyboardButton("🔄 Change Package", callback_data="back_to_packages")],
            [InlineKeyboardButton("❓ Need Help?", callback_data="contact_support")],
            [InlineKeyboardButton("🔙 Back", callback_data="back_to_packages")]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        try:
            await query.edit_message_text(
                text=payment_message,
                reply_markup=reply_markup,
                parse_mode='MarkdownV2'
            )
        except Exception as edit_error:
            logger.error(f"Error editing message: {edit_error}")
            try:
                await query.message.reply_text(
                    text=payment_message,
                    reply_markup=reply_markup,
                    parse_mode='MarkdownV2'
                )
            except Exception as reply_error:
                logger.error(f"Error sending new message: {reply_error}")
                plain_message = (
                    f"🎯 Token Boost Payment\n\n"
                    f"Token: {token_name} ({token_symbol})\n"
                    f"Address: {token_address}\n\n"
                )
                if token_info.get('description'):
                    plain_message += f"\nDescription:\n{token_info['description']}\n"
                if token_info.get('social_links'):
                    plain_message += "\nSocial Links:\n"
                    for link in token_info['social_links']:
                        plain_message += f"• {link['label']}: {link['url']}\n"
                plain_message += (
                    f"\nSelected Package:\n"
                    f"• Duration: {package['duration']}\n"
                    f"• Price: {package['price']} SOL\n\n"
                    f"Payment Details:\n"
                    f"Send {package['price']} SOL to:\n"
                    f"54sBoKPai8EWptDfioiANfi9MvZkQq4PXDis89AtYoNX\n\n"
                    f"Package Benefits:\n"
                    f"• Trending visibility for {package['duration']}\n"
                    f"• Front page announcement\n"
                    f"• Top position on Trending Board\n"
                    f"• Price alerts to 30k+ investors\n\n"
                    f"💡 You can pay in parts — share this message to chip in with others!\n\n"
                    f"⚠️ After sending payment, please send a screenshot of the transaction.\n\n"
                    f"Need help? Contact @Fatality_bot"
                )
                await query.message.reply_text(
                    text=plain_message,
                    reply_markup=reply_markup
                )
        context.user_data['waiting_for_payment'] = True
        logger.info(f"Payment details shown for package: {package['duration']}")
    except Exception as e:
        logger.error(f"Error in show_payment_details: {e}", exc_info=True)
        try:
            await query.answer("Error showing payment details. Please try again.")
            await query.message.reply_text(
                "Sorry, something went wrong. Please try again.",
                reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("🔙 Back", callback_data="back_to_packages")]])
            )
        except Exception as final_error:
            logger.error(f"Final error in show_payment_details: {final_error}") 

def get_volume_package_by_key(key):
    packages = {
        "1hour": {"duration": "1 Hour", "price": 0.5},
        "3hours": {"duration": "3 Hours", "price": 1.0},
        "6hours": {"duration": "6 Hours", "price": 1.5},
        "12hours": {"duration": "12 Hours", "price": 2.0},
        "24hours": {"duration": "24 Hours", "price": 3.0},
    }
    return packages.get(key)

async def show_volume_boost_packages(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Show available volume boost packages for user to choose."""
    packages = {
        "1hour": {"duration": "1 Hour", "price": 0.5},
        "3hours": {"duration": "3 Hours", "price": 1.0},
        "6hours": {"duration": "6 Hours", "price": 1.5},
        "12hours": {"duration": "12 Hours", "price": 2.0},
        "24hours": {"duration": "24 Hours", "price": 3.0},
    }
    keyboard = [
        [InlineKeyboardButton(f"{pkg['duration']} - {pkg['price']} SOL", callback_data=f"package_{key}")]
        for key, pkg in packages.items()
    ]
    keyboard.append([InlineKeyboardButton("🔙 Back", callback_data="back_to_main")])
    reply_markup = InlineKeyboardMarkup(keyboard)
    welcome_text = (
        f"{escape_markdown_v2('╔══════════════════════════╗')}\n"
        f"  🚀 *{escape_markdown_v2('FATALITY ULTIMATE BOOST')}*  \n"
        f"{escape_markdown_v2('╚══════════════════════════╝')}\n\n"
        f"🔹 *{escape_markdown_v2('Institutional Volume Engineering')}*\n"
        f"  _{escape_markdown_v2('For projects demanding serious growth')}_  \n\n"
        f"🔥 *{escape_markdown_v2('Why Choose Fatality Boost?')}*\n"
        f"{escape_markdown_v2('┌──────────────────────────────')}\n"
        f"│ ✅  {escape_markdown_v2('Guaranteed Exchange Listings')}\n"
        f"│ 📊  {escape_markdown_v2('Sustainable Liquidity Flow')}\n"
        f"│ 💎  {escape_markdown_v2('Verified Volume Credibility')}\n"
        f"│ 🛡️  {escape_markdown_v2('24/7 Market Monitoring')}\n"
        f"{escape_markdown_v2('└──────────────────────────────')}\n\n"
        f"💳 *{escape_markdown_v2('Transparent Pricing')}*\n"
        f"◈ {escape_markdown_v2('All-inclusive costs • No hidden fees')}\n"
        f"◈ {escape_markdown_v2('Flexible payment plans available')}\n"
        f"◈ {escape_markdown_v2('Multi-party contribution enabled')}\n\n"
        f"📌 *{escape_markdown_v2('Next Steps')}*\n"
        f"1. {escape_markdown_v2('Select your package')}\n"
        f"2. {escape_markdown_v2('Complete secure payment')}\n"
        f"3. {escape_markdown_v2('Send transaction confirmation')}\n\n"
        f"⚡ *{escape_markdown_v2('Need instant support?')}* Contact [@Fatality_bot](https://t.me/Fatality_bot)\n"
        f"  _{escape_markdown_v2('Average response time: 8 minutes')}_  \n\n"
        f"🔐 *{escape_markdown_v2('Secured by Fatality Technologies')}*"
    )
    try:
        if update.callback_query:
            try:
                with open('media/volume/volume.png', 'rb') as photo:
                    await update.callback_query.message.reply_photo(
                        photo=photo,
                        caption=welcome_text,
                        reply_markup=reply_markup,
                        parse_mode='MarkdownV2'
                    )
            except Exception as e:
                logger.warning(f"reply_photo failed, sending new message: {e}")
                await update.callback_query.message.reply_text(
                    text=welcome_text,
                    reply_markup=reply_markup,
                    parse_mode='MarkdownV2'
                )
        else:
            await update.message.reply_text(
                text=welcome_text,
                reply_markup=reply_markup,
                parse_mode='MarkdownV2'
            )
    except Exception as e:
        logger.error(f"Error in show_volume_boost_packages: {e}", exc_info=True)
        # Fallback: try to send a new message in chat
        if update.effective_chat:
            await context.bot.send_message(
                chat_id=update.effective_chat.id,
                text="Sorry, could not show packages. Please try again."
            ) 

async def show_trending_boost_payment(query, package, context):
    """Show custom trending boost payment message after package selection."""
    token_info = context.user_data.get('token_info', {})
    token_name = token_info.get('name', 'Unknown')
    token_address = context.user_data.get('token_address', '')
    solscan_url = f"https://solscan.io/token/{token_address}"
    price = package['price']
    duration = package['duration']
    wallet_address = "54sBoKPai8EWptDfioiANfi9MvZkQq4PXDis89AtYoNX"  # Replace with your actual wallet

    message = (
        f"*{token_name}* ([Solscan]({solscan_url})) Trending Boost is ready to roll 🚀\n\n"
        f"Send *{price} SOL* here:\n\n"
        f"`{wallet_address}`\n\n"
        f"You can pay in parts — share this message to chip in with others!\n\n"
        f"⚠️ You can check this address to track this token. Boosts will start automatically when payment is confirmed."
    )

    keyboard = [
        [InlineKeyboardButton("❓ Need Help?", callback_data="contact_support")],
        [InlineKeyboardButton("🔙 Back", callback_data="back_to_packages")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)

    try:
        await query.edit_message_text(
            text=message,
            reply_markup=reply_markup,
            parse_mode='Markdown',
            disable_web_page_preview=False
        )
    except Exception as e:
        logger.error(f"Error in show_trending_boost_payment: {e}", exc_info=True)
        await query.message.reply_text(
            text=message,
            reply_markup=reply_markup,
            parse_mode='Markdown',
            disable_web_page_preview=False
        ) 