import express from 'express';
import { createUserProfile , getUserProfile , updateUserProfile , getMyProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.post('/create', createUserProfile);
router.get('/:id', getUserProfile);
router.put('/', protect ,updateUserProfile);
router.get('/', protect, getMyProfile);
export default router;

