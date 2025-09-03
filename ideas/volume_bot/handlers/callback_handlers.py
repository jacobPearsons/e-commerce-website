import logging
from .package_handlers import show_package_options, show_volume_boost_packages, show_trending_boost_payment, get_volume_package_by_key
from .message_handlers import ultimate_boost
logger = logging.getLogger(__name__)

def get_target_message(update):
    return update.message if update.message else (update.callback_query.message if update.callback_query else None)

async def handle_callback(update, context):
    query = update.callback_query
    data = query.data
    try:
        if data == "cheap_dex_screener":
            from .package_handlers import show_cheap_dex_screener
            await show_cheap_dex_screener(update, context)
            target_message = get_target_message(update)
            if target_message:
                await target_message.reply_text("➡️ Please enter Telegram link:")
                await target_message.reply_text("🖼 Send your logo or banner (to skip, enter 'no'):")
            else:
                await update.effective_chat.send_message("➡️ Please enter Telegram link:")
                await update.effective_chat.send_message("🖼 Send your logo or banner (to skip, enter 'no'):")
            context.user_data['awaiting_telegram_link'] = True
            context.user_data['awaiting_logo'] = True
            return
        elif data == "our_services":
            await show_package_options(update, context)
            return
        elif data == "volume_boost":
            await show_volume_boost_packages(update, context)
            return
        elif data == "ultimate_boost":
            await ultimate_boost(update, context)
        elif data.startswith("package_"):
            package_key = data.replace("package_", "")
            package = get_volume_package_by_key(package_key)
            if package:
                context.user_data['selected_package'] = package
                await show_trending_boost_payment(query, package, context)
                return
            else:
                try:
                    await query.edit_message_text("Invalid package selected.")
                except Exception as e:
                    logger.warning(f"edit_message_text failed, sending new message: {e}")
                    target_message = get_target_message(update)
                    if target_message:
                        await target_message.reply_text("Invalid package selected.")
                return
        elif data.startswith("confirm_"):
            try:
                await query.edit_message_text("✅ Payment confirmed! Thank you for your purchase.")
            except Exception as e:
                logger.warning(f"edit_message_text failed, sending new message: {e}")
                target_message = get_target_message(update)
                if target_message:
                    await target_message.reply_text("✅ Payment confirmed! Thank you for your purchase.")
            await start_command(update, context)
            return
        elif data == "back_to_main":
            # Only clear navigation-related user data
            for key in ["awaiting_telegram_link", "awaiting_logo", "selected_package", "waiting_for_payment"]:
                context.user_data.pop(key, None)
            try:
                await query.edit_message_text("Welcome back to the main menu.")
            except Exception as e:
                logger.warning(f"edit_message_text failed, sending new message: {e}")
                target_message = get_target_message(update)
                if target_message:
                    await target_message.reply_text("Welcome back to the main menu.")
            await start_command(update, context)
            return
        elif data == "back_to_packages":
            # Only clear package/payment-related user data
            for key in ["selected_package", "waiting_for_payment"]:
                context.user_data.pop(key, None)
            await show_volume_boost_packages(update, context)
            try:
                await query.edit_message_text("Returning to package selection.")
            except Exception as e:
                logger.warning(f"edit_message_text failed, sending new message: {e}")
                target_message = get_target_message(update)
                if target_message:
                    await target_message.reply_text("Returning to package selection.")
            return
        elif data == "contact_support":
            try:
                await query.edit_message_text("Need help? Contact @Rails0_bot for support.")
            except Exception as e:
                logger.warning(f"edit_message_text failed, sending new message: {e}")
                target_message = get_target_message(update)
                if target_message:
                    await target_message.reply_text("Need help? Contact @Rails0_bot for support.")
            await start_command(update, context)
            return
        else:
            try:
                await query.answer("Unknown action.")
            except Exception as e:
                logger.warning(f"query.answer failed: {e}")
    except Exception as e:
        logger.error(f"Error in handle_callback: {e}", exc_info=True)
        try:
            await query.edit_message_text("Sorry, something went wrong. Please try again.")
        except Exception as e2:
            logger.warning(f"edit_message_text failed, sending new message: {e2}")
            target_message = get_target_message(update)
            if target_message:
                await target_message.reply_text("Sorry, something went wrong. Please try again.")
        await start_command(update, context)
        return

async def start_command(update, context):
    target_message = get_target_message(update)
    if target_message:
        await target_message.reply_text("Welcome! Please enter your Solana token address to begin.")
    else:
        logger.error("No message found in update for start_command.") 