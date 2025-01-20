import { Router } from 'express';
import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  uploadPostImg,
} from '../controllers/post';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/', authMiddleware, uploadPostImg, createPost);
router.get('/:postId', authMiddleware, getPost);
router.put('/:postId', authMiddleware, updatePost);
router.delete('/:postId', authMiddleware, deletePost);

export default router;
