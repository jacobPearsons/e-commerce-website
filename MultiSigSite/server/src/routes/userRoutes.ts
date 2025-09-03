import { Router } from 'express';
import { userController } from '../controllers/userController';
import { auth } from '../middleware/auth';
import { RequestHandler } from 'express';

const router = Router();

// All routes require authentication
router.use(auth as unknown as RequestHandler);

// Follow/Unfollow routes
router.post(
  '/follow/:username',
  userController.followUser as unknown as RequestHandler
);

router.post(
  '/unfollow/:username',
  userController.unfollowUser as unknown as RequestHandler
);

// Get followers/following
router.get(
  '/:username/followers',
  userController.getFollowers as unknown as RequestHandler
);

router.get(
  '/:username/following',
  userController.getFollowing as unknown as RequestHandler
);

export default router; 