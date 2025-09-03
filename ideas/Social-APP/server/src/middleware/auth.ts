import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Types } from 'mongoose';

// Extend Express Request to include user and files
export interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    role: string;
    isVerified: boolean;
  };
  file?: Express.Multer.File;
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'No authentication token provided.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ error: 'User not found.' });
      return;
    }

    req.user = {
      _id: user._id.toString(),
      role: user.role,
      isVerified: user.isVerified
    };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid authentication token.' });
      return;
    }
    res.status(401).json({ error: 'Please authenticate.' });
    return;
  }
};

export const requireRole = (role: 'user' | 'creator') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required.' });
      return;
    }

    if (req.user.role !== role) {
      res.status(403).json({ 
        error: `Access denied. This endpoint requires ${role} role.`,
        currentRole: req.user.role
      });
      return;
    }
    next();
  };
};

export const requireVerification = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  if (req.user.role === 'creator' && !req.user.isVerified) {
    res.status(403).json({ 
      error: 'Account verification required.',
      message: 'Please complete the verification process to access creator features.'
    });
    return;
  }
  next();
};

