import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
  read: boolean;
  attachments?: string[];
}

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  read: {
    type: Boolean,
    default: false
  },
  attachments: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Message = mongoose.model<IMessage>('Message', messageSchema); 