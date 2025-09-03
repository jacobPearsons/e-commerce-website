import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();

// POST /api/auth/login
router.post('/login', AuthController.login);

// POST /api/auth/register
router.post('/register', AuthController.register);

// POST /api/auth/refresh
router.post('/refresh', AuthController.refreshToken);

// POST /api/auth/logout
router.post('/logout', AuthController.logout);

export default router;