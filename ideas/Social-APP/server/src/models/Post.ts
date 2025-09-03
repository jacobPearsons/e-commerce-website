import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  media: {
    url: string;
    type: 'image' | 'video';
  }[];
  isPrivate: boolean;
  price: number;
  tags: string[];
  likes: mongoose.Types.ObjectId[];
  views: number;
  purchases: mongoose.Types.ObjectId[];
  comments: {
    user: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    likes: mongoose.Types.ObjectId[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  media: [{
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
  }],
  isPrivate: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
  },
  
  tags: [{
    type: String,
    trim: true,
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0,
  },
  purchases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }]
}, {
  timestamps: true,
});

// Index for better search performance
postSchema.index({ title: 'text', content: 'text', tags: 'text' });

export const Post = mongoose.model<IPost>('Post', postSchema);
