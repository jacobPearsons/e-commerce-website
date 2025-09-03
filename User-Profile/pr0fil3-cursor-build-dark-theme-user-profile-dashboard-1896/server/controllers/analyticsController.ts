import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { db } from '../config/database';
import { ApiResponse } from '../models/types';

export class AnalyticsController {
  // Get profile views analytics
  static async getProfileViewsAnalytics(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const days = parseInt(req.query.days as string) || 30;
      const analytics = await db.getProfileViewsAnalytics(req.user.id, days);

      return res.json({
        success: true,
        data: analytics
      });

    } catch (error) {
      console.error('Get profile views analytics error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get skills analytics
  static async getSkillsAnalytics(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const skills = await db.getSkillsByUserId(req.user.id);
      
      // Calculate analytics
      const totalEndorsements = skills.reduce((sum, skill) => sum + skill.endorsementCount, 0);
      const averageEndorsements = skills.length > 0 ? totalEndorsements / skills.length : 0;
      const topSkills = skills
        .sort((a, b) => b.endorsementCount - a.endorsementCount)
        .slice(0, 5);

      const skillsAnalytics = {
        totalSkills: skills.length,
        totalEndorsements,
        averageEndorsements: Math.round(averageEndorsements * 100) / 100,
        topSkills: topSkills.map(skill => ({
          name: skill.name,
          endorsements: skill.endorsementCount,
          percentage: totalEndorsements > 0 ? Math.round((skill.endorsementCount / totalEndorsements) * 100) : 0
        })),
        skillsDistribution: skills.map(skill => ({
          skill: skill.name,
          count: skill.endorsementCount
        }))
      };

      return res.json({
        success: true,
        data: skillsAnalytics
      });

    } catch (error) {
      console.error('Get skills analytics error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get engagement analytics
  static async getEngagementAnalytics(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const days = parseInt(req.query.days as string) || 7;
      const activities = await db.getActivitiesByUserId(req.user.id);
      const profileViews = await db.getProfileViewsByUserId(req.user.id);

      // Filter recent activities
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      const recentActivities = activities.filter(activity => activity.timestamp >= cutoffDate);
      const recentViews = profileViews.filter(view => view.viewedAt >= cutoffDate);

      // Group by day
      const engagementByDay = new Map<string, number>();
      
      // Initialize all days with 0
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        engagementByDay.set(dateKey, 0);
      }

      // Count activities
      recentActivities.forEach(activity => {
        const dateKey = activity.timestamp.toISOString().split('T')[0];
        const current = engagementByDay.get(dateKey) || 0;
        engagementByDay.set(dateKey, current + 1);
      });

      // Count views
      recentViews.forEach(view => {
        const dateKey = view.viewedAt.toISOString().split('T')[0];
        const current = engagementByDay.get(dateKey) || 0;
        engagementByDay.set(dateKey, current + 1);
      });

      const engagement = Array.from(engagementByDay.entries())
        .map(([date, interactions]) => ({ date, interactions }))
        .sort((a, b) => a.date.localeCompare(b.date));

      const totalEngagement = Array.from(engagementByDay.values()).reduce((sum, count) => sum + count, 0);
      const averageDaily = totalEngagement / days;

      return res.json({
        success: true,
        data: {
          engagement,
          summary: {
            totalEngagement,
            averageDaily: Math.round(averageDaily * 100) / 100,
            totalActivities: recentActivities.length,
            totalViews: recentViews.length,
            period: `${days} days`
          }
        }
      });

    } catch (error) {
      console.error('Get engagement analytics error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Get dashboard summary
  static async getDashboardSummary(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const [skills, activities, profileViews] = await Promise.all([
        db.getSkillsByUserId(req.user.id),
        db.getActivitiesByUserId(req.user.id),
        db.getProfileViewsByUserId(req.user.id)
      ]);

      // Calculate recent metrics (last 7 days)
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const recentViews = profileViews.filter(view => view.viewedAt >= weekAgo);
      const recentActivities = activities.filter(activity => activity.timestamp >= weekAgo);

      // Calculate previous week for comparison
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      const previousWeekViews = profileViews.filter(view => 
        view.viewedAt >= twoWeeksAgo && view.viewedAt < weekAgo
      );

      const totalEndorsements = skills.reduce((sum, skill) => sum + skill.endorsementCount, 0);
      
      // Calculate growth
      const viewsGrowth = previousWeekViews.length > 0 
        ? ((recentViews.length - previousWeekViews.length) / previousWeekViews.length) * 100
        : recentViews.length > 0 ? 100 : 0;

      const summary = {
        profileViews: {
          total: profileViews.length,
          recent: recentViews.length,
          growth: Math.round(viewsGrowth)
        },
        skills: {
          total: skills.length,
          totalEndorsements,
          topSkill: skills.length > 0 
            ? skills.reduce((top, skill) => skill.endorsementCount > top.endorsementCount ? skill : top)
            : null
        },
        activities: {
          total: activities.length,
          recent: recentActivities.length
        },
        engagement: {
          score: Math.min(100, Math.round((recentViews.length + recentActivities.length) * 2.5)),
          trend: recentViews.length > previousWeekViews.length ? 'up' : 'down'
        }
      };

      return res.json({
        success: true,
        data: summary
      });

    } catch (error) {
      console.error('Get dashboard summary error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  // Export data
  static async exportData(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required'
        });
      }

      const format = req.query.format as string || 'json';
      
      const [user, skills, activities, profileViews] = await Promise.all([
        db.getUserById(req.user.id),
        db.getSkillsByUserId(req.user.id),
        db.getActivitiesByUserId(req.user.id),
        db.getProfileViewsByUserId(req.user.id)
      ]);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      const { password, ...userWithoutPassword } = user;

      const exportData = {
        user: userWithoutPassword,
        skills,
        activities,
        profileViews,
        exportedAt: new Date().toISOString(),
        exportFormat: format
      };

      if (format === 'csv') {
        // Convert to CSV format (simplified)
        let csv = 'Type,Name,Count,Date\n';
        
        skills.forEach(skill => {
          csv += `Skill,"${skill.name}",${skill.endorsementCount},${skill.createdAt}\n`;
        });
        
        activities.forEach(activity => {
          csv += `Activity,"${activity.description}",1,${activity.timestamp}\n`;
        });
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="profilepro-export-${Date.now()}.csv"`);
        return res.send(csv);
      }

      // Default to JSON
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="profilepro-export-${Date.now()}.json"`);
      
      return res.json({
        success: true,
        data: exportData
      });

    } catch (error) {
      console.error('Export data error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
}