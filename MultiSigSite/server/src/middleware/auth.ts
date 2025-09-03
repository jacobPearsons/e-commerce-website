import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Types } from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Define the user type that will be attached to the request
interface RequestUser {
  _id: string;
  role: string;
  isVerified: boolean;
}

// Extend Express Request to include user and files
export interface AuthenticatedRequest extends Request {
  user?: RequestUser;
  file?: Express.Multer.File;
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

// Rate limiting middleware
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: { error: 'Too many login attempts, please try again after 15 minutes' }
});

// Security headers middleware
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: true,
  crossOriginResourcePolicy: { policy: "same-site" },
  dnsPrefetchControl: true,
  frameguard: { action: "deny" },
  hidePoweredBy: true,
  hsts: true,
  ieNoOpen: true,
  noSniff: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  xssFilter: true,
});

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ error: 'No authentication token provided.' });
      return;
    }

    // Verify token with proper error handling
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ error: 'Token has expired.' });
        return;
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ error: 'Invalid token.' });
        return;
      }
      throw error;
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ error: 'User not found.' });
      return;
    }

    // Add user info to request
    req.user = {
      _id: user._id.toString(),
      role: user.role,
      isVerified: user.isVerified
    };

    // Add security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal server error during authentication.' });
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

