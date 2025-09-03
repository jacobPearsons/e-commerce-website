import asyncio
import websockets
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters
import os
from dotenv import load_dotenv

# Import your real bot handlers
from handlers.callback_handlers import handle_callback, start_command
from handlers.message_handlers import handle_message

load_dotenv()
TOKEN = os.getenv('BOT_TOKEN')

class BotController:
    def __init__(self):
        self.app = None
        self.running = False
        self.loop = asyncio.get_event_loop()

    async def start_bot(self):
        if not self.running:
            self.app = (
                Application.builder()
                .token(TOKEN)
                .concurrent_updates(True)
                .build()
            )
            self.app.add_handler(CommandHandler("start", start_command))
            self.app.add_handler(CallbackQueryHandler(handle_callback))
            self.app.add_handler(MessageHandler(filters.TEXT | filters.PHOTO, handle_message))
            self.running = True
            # Start polling in the background
            asyncio.create_task(self.app.run_polling())

    def is_active(self):
        return self.running

bot_controller = BotController()

async def handle_connection(websocket, path):
    async for message in websocket:
        if message == "start_bot":
            await bot_controller.start_bot()
            await websocket.send("active")
        elif message == "status":
            await websocket.send("active" if bot_controller.is_active() else "inactive")

start_server = websockets.serve(handle_connection, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever() 