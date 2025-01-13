import { Router } from 'express';
import { searchUsers, searchPosts } from '../controllers/search';

const router: Router = Router();

router.get('/users', searchUsers);
router.get('/posts', searchPosts);

export default router;
