import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../config/database';
import { User, LoginRequest, RegisterRequest, ApiResponse, AuthTokens } from '../models/types';
import { telegramService } from '../services/telegramService';

export class AuthController {
  // Login user
  static async login(req: Request<{}, ApiResponse<{ user: Omit<User, 'password'>, tokens: AuthTokens }>, LoginRequest>, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }

      // For demo purposes, we'll use simple authentication
      // In production, use proper password hashing
      if (email === 'john.doe@example.com' && password === 'password') {
        // Create or get user
        let user = await db.getUserByEmail(email);
        
        if (!user) {
          // Create demo user
          user = await db.createUser({
            id: uuidv4(),
            email,
            name: 'John Doe',
            username: 'johndoe',
            avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
            bio: 'Senior Full-Stack Developer with 8+ years of experience building scalable web applications. Passionate about React, TypeScript, and modern web technologies.',
            createdAt: new Date('2020-01-15'),
            isOnline: true,
            lastSeen: new Date()
          });

          // Create demo skills
          const skills = [
            { name: 'React', endorsementCount: 47 },
            { name: 'TypeScript', endorsementCount: 42 },
            { name: 'Node.js', endorsementCount: 38 },
            { name: 'Python', endorsementCount: 35 },
            { name: 'GraphQL', endorsementCount: 28 },
            { name: 'AWS', endorsementCount: 31 },
            { name: 'Docker', endorsementCount: 25 },
            { name: 'PostgreSQL', endorsementCount: 33 }
          ];

          for (const skill of skills) {
            await db.createSkill({
              id: uuidv4(),
              name: skill.name,
              endorsementCount: skill.endorsementCount,
              userId: user.id,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }

          // Create demo activities
          const activities = [
            {
              type: 'profile_update' as const,
              description: 'Updated profile bio and skills',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
            },
            {
              type: 'skill_endorsement' as const,
              description: 'Received endorsement for React',
              timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
              metadata: { skill: 'React', endorser: 'Jane Smith' }
            }
          ];

          for (const activity of activities) {
            await db.createActivity({
              id: uuidv4(),
              userId: user.id,
              ...activity
            });
          }

          // Create demo profile views
          for (let i = 0; i < 30; i++) {
            await db.createProfileView({
              id: uuidv4(),
              viewedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
              userId: user.id,
              viewerId: Math.random() > 0.3 ? `viewer-${i + 1}` : undefined
            });
          }
        }

        // Generate tokens
        const accessToken = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET!,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const refreshToken = jwt.sign(
          { userId: user.id, type: 'refresh' },
          process.env.JWT_SECRET!,
          { expiresIn: '30d' }
        );

        // Update user's last seen
        await db.updateUser(user.id, { 
          isOnline: true, 
          lastSeen: new Date() 
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return res.json({
          success: true,
          data: {
            user: userWithoutPassword,
            tokens: {
              accessToken,
              refreshToken
            }
          },
          message: 'Login successful'
        });
      }

      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Register user (for future implementation)
  static async register(req: Request<{}, ApiResponse<{ user: Omit<User, 'password'>, tokens: AuthTokens }>, RegisterRequest>, res: Response) {
    try {
      const { email, password, name, username } = req.body;

      if (!email || !password || !name || !username) {
        return res.status(400).json({
          success: false,
          error: 'All fields are required'
        });
      }

      // Check if user already exists
      const existingUser = await db.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'User already exists'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user
      const user = await db.createUser({
        id: uuidv4(),
        email,
        name,
        username,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff`,
        coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
        bio: '',
        createdAt: new Date(),
        password: hashedPassword,
        isOnline: true,
        lastSeen: new Date()
      });

      // Generate tokens
      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const refreshToken = jwt.sign(
        { userId: user.id, type: 'refresh' },
        process.env.JWT_SECRET!,
        { expiresIn: '30d' }
      );

      // Create welcome activity
      await db.createActivity({
        id: uuidv4(),
        type: 'profile_update',
        description: 'Joined ProfilePro',
        timestamp: new Date(),
        userId: user.id
      });

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;

      return res.status(201).json({
        success: true,
        data: {
          user: userWithoutPassword,
          tokens: {
            accessToken,
            refreshToken
          }
        },
        message: 'Registration successful'
      });

    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Refresh token
  static async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          error: 'Refresh token required'
        });
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as any;
      
      if (decoded.type !== 'refresh') {
        return res.status(403).json({
          success: false,
          error: 'Invalid refresh token'
        });
      }

      const user = await db.getUserById(decoded.userId);
      if (!user) {
        return res.status(403).json({
          success: false,
          error: 'User not found'
        });
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.json({
        success: true,
        data: {
          accessToken
        }
      });

    } catch (error) {
      console.error('Refresh token error:', error);
      return res.status(403).json({
        success: false,
        error: 'Invalid refresh token'
      });
    }
  }

  // Logout
  static async logout(req: Request, res: Response) {
    // In a real app, you might want to blacklist the token
    return res.json({
      success: true,
      message: 'Logout successful'
    });
  }
}