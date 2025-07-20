import express from 'express';
import { createUserProfile , getUserProfile , updateUserProfile } from '../controllers/profileController.js';

const router = express.Router();

router.post('/create', createUserProfile);
router.get('/:id', getUserProfile);
router.put('/:id', updateUserProfile);

export default router;

