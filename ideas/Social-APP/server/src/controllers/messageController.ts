import { Response } from 'express';
import { Message } from '../models/Message';
import { Conversation } from '../models/Conversation';
import { AuthenticatedRequest } from '../middleware/auth';
import { Types } from 'mongoose';

export const messageController = {
  // Create a new conversation
  async createConversation(req: AuthenticatedRequest, res: Response) {
    try {
      const { participantId } = req.body;
      const userId = new Types.ObjectId(req.user?._id as string);
      const participantObjectId = new Types.ObjectId(participantId);

      // Check if conversation already exists
      const existingConversation = await Conversation.findOne({
        participants: { $all: [userId, participantObjectId] }
      });

      if (existingConversation) {
        return res.json(existingConversation);
      }

      const conversation = new Conversation({
        participants: [userId, participantObjectId],
        unreadCounts: new Map([[userId.toString(), 0], [participantObjectId.toString(), 0]])
      });

      await conversation.save();
      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ message: 'Error creating conversation', error });
    }
  },

  // Send a message
  async sendMessage(req: AuthenticatedRequest, res: Response) {
    try {
      const { conversationId, content, attachments } = req.body;
      const userId = new Types.ObjectId(req.user?._id as string);

      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }

      // Verify user is part of the conversation
      if (!conversation.participants.some(p => p.equals(userId))) {
        return res.status(403).json({ message: 'Not authorized to send message in this conversation' });
      }

      const message = new Message({
        conversationId,
        sender: userId,
        content,
        attachments
      });

      await message.save();

      // Update conversation's last message and unread count
      conversation.lastMessage = message._id as Types.ObjectId;
      const otherParticipant = conversation.participants.find(p => !p.equals(userId));
      if (otherParticipant) {
        const currentCount = conversation.unreadCounts.get(otherParticipant.toString()) || 0;
        conversation.unreadCounts.set(otherParticipant.toString(), currentCount + 1);
      }
      await conversation.save();

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: 'Error sending message', error });
    }
  },

  // Get messages for a conversation
  async getMessages(req: AuthenticatedRequest, res: Response) {
    try {
      const { conversationId } = req.params;
      const userId = new Types.ObjectId(req.user?._id as string);

      const conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: 'Conversation not found' });
      }

      // Verify user is part of the conversation
      if (!conversation.participants.some(p => p.equals(userId))) {
        return res.status(403).json({ message: 'Not authorized to view this conversation' });
      }

      const messages = await Message.find({ conversationId })
        .sort({ createdAt: -1 })
        .limit(50)
        .populate('sender', 'username displayName profileImage');

      // Mark messages as read
      await Message.updateMany(
        { conversationId, sender: { $ne: userId }, read: false },
        { read: true }
      );

      // Reset unread count
      conversation.unreadCounts.set(userId.toString(), 0);
      await conversation.save();

      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages', error });
    }
  },

  // Get user's conversations
  async getConversations(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = new Types.ObjectId(req.user?._id as string);

      const conversations = await Conversation.find({ participants: userId })
        .populate('participants', 'username displayName profileImage')
        .populate('lastMessage')
        .sort({ updatedAt: -1 });

      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching conversations', error });
    }
  }
}; 