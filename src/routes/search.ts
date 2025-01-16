import { Router } from 'express';
import { searchUsers, searchPosts } from '../controllers/search';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

router.get('/users', authMiddleware, searchUsers);
router.get('/posts', authMiddleware, searchPosts);

export default router;
