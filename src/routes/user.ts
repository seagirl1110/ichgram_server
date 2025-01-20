import { Router } from 'express';
import {
  getUserProfile,
  updateUserProfile,
  uploadProfileImg,
} from '../controllers/user';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

router.get('/:userId', authMiddleware, getUserProfile);
router.put('/update', authMiddleware, uploadProfileImg, updateUserProfile);

export default router;
