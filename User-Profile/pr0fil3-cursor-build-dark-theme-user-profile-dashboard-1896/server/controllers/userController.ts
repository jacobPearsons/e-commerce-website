import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthRequest } from '../middleware/auth';
import { db } from '../config/database';
import { UpdateProfileRequest, ApiResponse } from '../models/types';
import { telegramService } from '../services/telegramService';

export class UserController {
  // Get current user profile
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const user = await db.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Get user's skills
      const skills = await db.getSkillsByUserId(user.id);
      
      // Get user's activities
      const activities = await db.getActivitiesByUserId(user.id);
      
      // Get profile views
      const profileViews = await db.getProfileViewsByUserId(user.id);

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      return res.json({
        success: true,
        data: {
          ...userWithoutPassword,
          skills,
          activities,
          profileViews
        }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Update user profile
  static async updateProfile(req: AuthRequest<{}, ApiResponse, UpdateProfileRequest>, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const { name, bio, avatarUrl, coverUrl } = req.body;
      const updates: Partial<UpdateProfileRequest> = {};

      if (name) updates.name = name;
      if (bio !== undefined) updates.bio = bio;
      if (avatarUrl) updates.avatarUrl = avatarUrl;
      if (coverUrl) updates.coverUrl = coverUrl;

      const updatedUser = await db.updateUser(req.user.id, updates);
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      // Create activity
      await db.createActivity({
        id: uuidv4(),
        type: 'profile_update',
        description: 'Updated profile information',
        timestamp: new Date(),
        userId: req.user.id,
        metadata: { updatedFields: Object.keys(updates) }
      });

      // Send Telegram notification if linked
      if (updatedUser.telegramId) {
        await telegramService.sendNotification(
          req.user.id,
          '📝 Profile Updated',
          `Your ProfilePro profile has been updated successfully.`
        );
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;

      return res.json({
        success: true,
        data: userWithoutPassword,
        message: 'Profile updated successfully'
      });

    } catch (error) {
      console.error('Update profile error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get user's skills
  static async getSkills(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const skills = await db.getSkillsByUserId(req.user.id);

      return res.json({
        success: true,
        data: skills
      });

    } catch (error) {
      console.error('Get skills error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Add new skill
  static async addSkill(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const { name } = req.body;
      
      if (!name || typeof name !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'Skill name is required'
        });
      }

      // Check if skill already exists for this user
      const existingSkills = await db.getSkillsByUserId(req.user.id);
      const duplicate = existingSkills.find(skill => 
        skill.name.toLowerCase() === name.toLowerCase()
      );

      if (duplicate) {
        return res.status(409).json({
          success: false,
          error: 'Skill already exists'
        });
      }

      const skill = await db.createSkill({
        id: uuidv4(),
        name: name.trim(),
        endorsementCount: 0,
        userId: req.user.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Create activity
      await db.createActivity({
        id: uuidv4(),
        type: 'profile_update',
        description: `Added new skill: ${skill.name}`,
        timestamp: new Date(),
        userId: req.user.id,
        metadata: { skillName: skill.name }
      });

      return res.status(201).json({
        success: true,
        data: skill,
        message: 'Skill added successfully'
      });

    } catch (error) {
      console.error('Add skill error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Endorse skill
  static async endorseSkill(req: AuthRequest, res: Response) {
    try {
      const { skillId } = req.params;
      
      if (!skillId) {
        return res.status(400).json({
          success: false,
          error: 'Skill ID is required'
        });
      }

      // For demo purposes, we'll increment the endorsement count
      // In a real app, you'd track who endorsed what to prevent duplicates
      const skills = await db.getSkillsByUserId('1'); // Demo user
      const skill = skills.find(s => s.id === skillId);
      
      if (!skill) {
        return res.status(404).json({
          success: false,
          error: 'Skill not found'
        });
      }

      const updatedSkill = await db.updateSkill(skillId, {
        endorsementCount: skill.endorsementCount + 1,
        updatedAt: new Date()
      });

      if (!updatedSkill) {
        return res.status(404).json({
          success: false,
          error: 'Failed to update skill'
        });
      }

      // Create activity
      await db.createActivity({
        id: uuidv4(),
        type: 'skill_endorsement',
        description: `Received endorsement for ${skill.name}`,
        timestamp: new Date(),
        userId: skill.userId,
        metadata: { 
          skillName: skill.name,
          endorser: req.user?.name || 'Anonymous'
        }
      });

      // Send Telegram notification
      await telegramService.notifySkillEndorsement(
        skill.userId,
        skill.name,
        req.user?.name
      );

      return res.json({
        success: true,
        data: updatedSkill,
        message: 'Skill endorsed successfully'
      });

    } catch (error) {
      console.error('Endorse skill error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Delete skill
  static async deleteSkill(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const { skillId } = req.params;
      
      if (!skillId) {
        return res.status(400).json({
          success: false,
          error: 'Skill ID is required'
        });
      }

      const skills = await db.getSkillsByUserId(req.user.id);
      const skill = skills.find(s => s.id === skillId);
      
      if (!skill) {
        return res.status(404).json({
          success: false,
          error: 'Skill not found'
        });
      }

      const deleted = await db.deleteSkill(skillId);
      
      if (!deleted) {
        return res.status(500).json({
          success: false,
          error: 'Failed to delete skill'
        });
      }

      // Create activity
      await db.createActivity({
        id: uuidv4(),
        type: 'profile_update',
        description: `Removed skill: ${skill.name}`,
        timestamp: new Date(),
        userId: req.user.id,
        metadata: { skillName: skill.name }
      });

      return res.json({
        success: true,
        message: 'Skill deleted successfully'
      });

    } catch (error) {
      console.error('Delete skill error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get user activities
  static async getActivities(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const activities = await db.getActivitiesByUserId(req.user.id);

      return res.json({
        success: true,
        data: activities
      });

    } catch (error) {
      console.error('Get activities error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Record profile view
  static async recordProfileView(req: AuthRequest, res: Response) {
    try {
      const { userId } = req.params;
      
      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      const profileView = await db.createProfileView({
        id: uuidv4(),
        viewedAt: new Date(),
        userId,
        viewerId: req.user?.id,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      // Create activity for the viewed user
      await db.createActivity({
        id: uuidv4(),
        type: 'profile_view',
        description: req.user 
          ? `Profile viewed by ${req.user.name}`
          : 'Profile viewed by anonymous user',
        timestamp: new Date(),
        userId,
        metadata: { 
          viewer: req.user?.name,
          viewerId: req.user?.id
        }
      });

      // Send Telegram notification
      if (req.user) {
        await telegramService.notifyProfileView(userId, req.user.name);
      }

      return res.status(201).json({
        success: true,
        data: profileView,
        message: 'Profile view recorded'
      });

    } catch (error) {
      console.error('Record profile view error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}