import { Router } from 'express';
import { 
  register, 
  login, 
  verifyProfile, 
  getCreatorProfile, 
  updateCreatorProfile 
} from '../controllers/auth';
import { auth, requireRole, requireVerification } from '../middleware/auth';
import multer from 'multer';
import { RequestHandler } from 'express';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.post('/register', register as unknown as RequestHandler);
router.post('/login', login as unknown as RequestHandler);
router.get('/creator/:username', getCreatorProfile as unknown as RequestHandler);

// Protected routes
router.post(
  '/verify-profile',
  auth as unknown as RequestHandler,
  requireRole('creator') as unknown as RequestHandler,
  upload.fields([
    { name: 'idDocument', maxCount: 1 },
    { name: 'selfieWithId', maxCount: 1 },
  ]),
  verifyProfile as unknown as RequestHandler
);

// Creator profile routes
router.put(
  '/creator/profile',
  auth as unknown as RequestHandler,
  requireRole('creator') as unknown as RequestHandler,
  upload.single('profileImage'),
  updateCreatorProfile as unknown as RequestHandler
);

export default router;



