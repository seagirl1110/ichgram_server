import { Router } from 'express';
import { createComment, deleteComment } from '../controllers/comment';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/:postId', authMiddleware, createComment);
router.delete('/:commentId', authMiddleware, deleteComment);

export default router;
