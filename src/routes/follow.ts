import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import {
  getUserFollowers,
  getUserFollowing,
  followUser,
  unfollowUser,
} from '../controllers/follow';

const router: Router = Router();

router.get('/:userId/followers', authMiddleware, getUserFollowers);
router.get('/:userId/following', authMiddleware, getUserFollowing);
router.post('/follow/:targetUserId', authMiddleware, followUser);
router.delete('/unfollow/:targetUserId', authMiddleware, unfollowUser);

export default router;
