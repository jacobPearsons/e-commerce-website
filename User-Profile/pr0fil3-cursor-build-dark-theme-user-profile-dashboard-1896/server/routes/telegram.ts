import { Router } from 'express';
import { telegramService } from '../services/telegramService';

const router = Router();

// POST /api/telegram/webhook - Telegram webhook endpoint
router.post('/webhook', async (req, res) => {
  try {
    // Telegram webhook handler would go here
    // For now, we'll just acknowledge the webhook
    console.log('Telegram webhook received:', req.body);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    res.status(500).json({ success: false, error: 'Webhook processing failed' });
  }
});

// GET /api/telegram/status - Get bot status
router.get('/status', async (req, res) => {
  try {
    const isReady = telegramService.isReady();
    const botInfo = await telegramService.getBotInfo();
    
    res.json({
      success: true,
      data: {
        isReady,
        botInfo,
        webhookUrl: process.env.TELEGRAM_WEBHOOK_URL
      }
    });
  } catch (error) {
    console.error('Get Telegram status error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get bot status' 
    });
  }
});

// POST /api/telegram/test-notification - Test notification (dev only)
router.post('/test-notification', async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ 
      success: false, 
      error: 'Not available in production' 
    });
  }

  try {
    const { userId, title, message } = req.body;
    
    if (!userId || !title || !message) {
      return res.status(400).json({
        success: false,
        error: 'userId, title, and message are required'
      });
    }

    const sent = await telegramService.sendNotification(userId, title, message);
    
    res.json({
      success: true,
      data: { sent },
      message: sent ? 'Notification sent successfully' : 'User not linked to Telegram'
    });
  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send test notification' 
    });
  }
});

export default router;