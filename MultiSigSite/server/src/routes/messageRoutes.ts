import { Router } from 'express';
import { messageController } from '../controllers/messageController';
import { auth } from '../middleware/auth';
import { RequestHandler } from 'express';

const router = Router();

// All routes require authentication
router.use(auth as unknown as RequestHandler);

// Create a new conversation
router.post(
  '/conversations',
  messageController.createConversation as unknown as RequestHandler
);

// Get user's conversations
router.get(
  '/conversations',
  messageController.getConversations as unknown as RequestHandler
);

// Get messages for a conversation
router.get(
  '/conversations/:conversationId/messages',
  messageController.getMessages as unknown as RequestHandler
);

// Send a message
router.post(
  '/messages',
  messageController.sendMessage as unknown as RequestHandler
);

export default router; 