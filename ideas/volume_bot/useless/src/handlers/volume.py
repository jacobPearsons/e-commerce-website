from telegram import Update
from telegram.ext import ContextTypes
from handlers.package_handlers import show_package_options, show_volume_boost_packages

class VolumeHandler:
    def __init__(self, database=None):
        self.db = database

    async def show_volume_menu(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show the main token info and service selection menu (uses show_package_options)."""
        await show_package_options(update, context)

    async def show_packages(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Show available volume boost packages (uses show_volume_boost_packages)."""
        await show_volume_boost_packages(update, context)
