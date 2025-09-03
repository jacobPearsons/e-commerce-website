import { Router } from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getCreatorPosts,
  getCreatorStats,
} from '../controllers/content';
import { auth, requireRole, requireVerification } from '../middleware/auth';
import multer from 'multer';
import { RequestHandler } from 'express';

const router = Router();

// Configure multer for video upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  },
});

// Video upload route
router.post(
  '/upload',
  auth as unknown as RequestHandler,
  requireRole('creator') as unknown as RequestHandler,
  requireVerification as unknown as RequestHandler,
  upload.single('video'),
  createPost as unknown as RequestHandler
);

// Creator routes
router.post(
  '/creator/posts',
  auth as unknown as RequestHandler,
  requireRole('creator') as unknown as RequestHandler,
  requireVerification as unknown as RequestHandler,
  upload.array('media', 10),
  createPost as unknown as RequestHandler
);

router.put(
  '/creator/posts/:postId',
  auth as unknown as RequestHandler,
  requireRole('creator') as unknown as RequestHandler,
  requireVerification as unknown as RequestHandler,
  upload.single('video'),
  updatePost as unknown as RequestHandler
);

router.delete(
  '/creator/posts/:postId',
  auth as unknown as RequestHandler,
  requireRole('creator') as unknown as RequestHandler,
  requireVerification as unknown as RequestHandler,
  deletePost as unknown as RequestHandler
);

// Get creator's own posts
router.get(
  '/creator/posts',
  auth as unknown as RequestHandler,
  requireRole('creator') as unknown as RequestHandler,
  getCreatorPosts as unknown as RequestHandler
);

// Get creator's statistics
router.get(
  '/creator/stats',
  auth as unknown as RequestHandler,
  requireRole('creator') as unknown as RequestHandler,
  getCreatorStats as unknown as RequestHandler
);

// Get posts by creator username
router.get(
  '/creator/:username/posts',
  auth as unknown as RequestHandler,
  getCreatorPosts as unknown as RequestHandler
);

// Public/Subscriber routes
router.get(
  '/posts/:postId',
  auth as unknown as RequestHandler,
  getPost as unknown as RequestHandler
);

// Subscriber-specific routes
router.get(
  '/subscriber/feed',
  auth as unknown as RequestHandler,
  requireRole('user') as unknown as RequestHandler,
  async (req, res) => {
    // TODO: Implement subscriber feed
    res.status(501).json({ message: 'Not implemented yet' });
  }
);

router.post(
  '/subscriber/purchase/:postId',
  auth as unknown as RequestHandler,
  requireRole('user') as unknown as RequestHandler,
  async (req, res) => {
    // TODO: Implement post purchase
    res.status(501).json({ message: 'Not implemented yet' });
  }
);

export default router;


