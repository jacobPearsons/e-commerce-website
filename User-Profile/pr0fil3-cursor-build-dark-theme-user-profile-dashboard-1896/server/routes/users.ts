import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken, optionalAuth } from '../middleware/auth';

const router = Router();

// GET /api/users/profile - Get current user profile
router.get('/profile', authenticateToken, UserController.getProfile);

// PUT /api/users/profile - Update current user profile
router.put('/profile', authenticateToken, UserController.updateProfile);

// GET /api/users/skills - Get user's skills
router.get('/skills', authenticateToken, UserController.getSkills);

// POST /api/users/skills - Add new skill
router.post('/skills', authenticateToken, UserController.addSkill);

// POST /api/users/skills/:skillId/endorse - Endorse a skill
router.post('/skills/:skillId/endorse', optionalAuth, UserController.endorseSkill);

// DELETE /api/users/skills/:skillId - Delete skill
router.delete('/skills/:skillId', authenticateToken, UserController.deleteSkill);

// GET /api/users/activities - Get user activities
router.get('/activities', authenticateToken, UserController.getActivities);

// POST /api/users/:userId/view - Record profile view
router.post('/:userId/view', optionalAuth, UserController.recordProfileView);

export default router;