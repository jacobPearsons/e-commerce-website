import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  _id: string;
  email: string;
  password: string;
  username: string;
  displayName: string;
  role: 'user' | 'creator';
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
  verificationDocuments?: {
    idDocument: string;
    selfieWithId: string;
  };
  profileImage?: string;
  bio?: string;
  contentCategories?: string[];
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  subscriptionPrice?: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  displayName: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'creator'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  verificationDocuments: {
    idDocument: String,
    selfieWithId: String,
  },
  profileImage: String,
  bio: String,
  contentCategories: [String],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  subscriptionPrice: {
    type: Number,
    default: 0,
    min: 0,
  }
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);



