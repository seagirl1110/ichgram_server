import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user';
import authMiddleware from '../middlewares/authMiddleware';

const router: Router = Router();

router.get('/:userId', getUserProfile);
router.put('/update', authMiddleware, updateUserProfile);

export default router;
