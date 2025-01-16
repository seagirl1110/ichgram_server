import { Router } from 'express';
import { likePost, unlikePost } from '../controllers/like';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/:postId/like', authMiddleware, likePost);
router.delete('/:postId/unlike', authMiddleware, unlikePost);

export default router;
