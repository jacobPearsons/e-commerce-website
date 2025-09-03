import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { uploadToS3 } from '../utils/upload';
import { Types } from 'mongoose';
import { AuthenticatedRequest } from '../middleware/auth';

export const register = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password, username, displayName, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      username,
      displayName,
      role,
    });

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating user' });
  }
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error logging in' });
  }
};

export const verifyProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { bio, contentCategories } = req.body;
    const userId = new Types.ObjectId(req.user?._id as string);
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if (!files.idDocument?.[0] || !files.selfieWithId?.[0]) {
      return res.status(400).json({ error: 'ID document and selfie are required' });
    }

    // Upload documents to S3
    const [idDocumentUrl, selfieUrl] = await Promise.all([
      uploadToS3(files.idDocument[0], 'verification'),
      uploadToS3(files.selfieWithId[0], 'verification'),
    ]).catch(error => {
      throw new Error('Error uploading verification documents');
    });

    // Update user profile
    const user = await User.findByIdAndUpdate(
      userId,
      {
        verificationDocuments: {
          idDocument: idDocumentUrl,
          selfieWithId: selfieUrl,
        },
        bio,
        contentCategories: JSON.parse(contentCategories),
        isVerified: true,
        verificationStatus: 'pending',
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        isVerified: user.isVerified,
        verificationStatus: user.verificationStatus,
        bio: user.bio,
        contentCategories: user.contentCategories,
      },
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Error verifying profile' });
  }
};

export const getCreatorProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username, role: 'creator' })
      .select('-password -verificationDocuments')
      .lean();

    if (!user) {
      return res.status(404).json({ error: 'Creator not found' });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching creator profile' });
  }
};

export const updateCreatorProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = new Types.ObjectId(req.user?._id as string);
    const { bio, contentCategories, displayName } = req.body;
    const profileImage = req.file;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const updateData: any = {
      bio,
      contentCategories: JSON.parse(contentCategories),
      displayName,
    };

    if (profileImage) {
      const profileImageUrl = await uploadToS3(profileImage, 'content');
      updateData.profileImage = profileImageUrl;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).select('-password -verificationDocuments');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating profile' });
  }
};


