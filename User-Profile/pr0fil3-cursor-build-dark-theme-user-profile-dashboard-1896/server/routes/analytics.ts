import { Router } from 'express';
import { AnalyticsController } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// GET /api/analytics/profile-views - Get profile views analytics
router.get('/profile-views', authenticateToken, AnalyticsController.getProfileViewsAnalytics);

// GET /api/analytics/skills - Get skills analytics
router.get('/skills', authenticateToken, AnalyticsController.getSkillsAnalytics);

// GET /api/analytics/engagement - Get engagement analytics
router.get('/engagement', authenticateToken, AnalyticsController.getEngagementAnalytics);

// GET /api/analytics/dashboard - Get dashboard summary
router.get('/dashboard', authenticateToken, AnalyticsController.getDashboardSummary);

// GET /api/analytics/export - Export user data
router.get('/export', authenticateToken, AnalyticsController.exportData);

export default router;