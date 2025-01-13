import { Router } from 'express';
import { createPost } from '../controllers/post';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

router.post('/', authMiddleware, createPost);

export default router;
