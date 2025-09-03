import { Router } from 'express';
import { interactionController } from '../controllers/interactionController';
import { auth } from '../middleware/auth';
import { RequestHandler } from 'express';

const router = Router();

// All routes require authentication
router.use(auth as unknown as RequestHandler);

// Post interactions
router.post(
  '/posts/:postId/comments',
  interactionController.addComment as unknown as RequestHandler
);

router.post(
  '/posts/:postId/like',
  interactionController.togglePostLike as unknown as RequestHandler
);

router.delete(
  '/posts/:postId/comments/:commentIndex',
  interactionController.deleteComment as unknown as RequestHandler
);

router.post(
  '/posts/:postId/comments/:commentIndex/like',
  interactionController.toggleCommentLike as unknown as RequestHandler
);

export default router; 