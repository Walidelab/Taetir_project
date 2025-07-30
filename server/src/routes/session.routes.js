import express from 'express';
import { createSession, getSessionsForMonth ,updateSessionStatus } from '../controllers/sessionController.js';

const router = express.Router();

router.post('/', createSession);
router.get('/', getSessionsForMonth);
router.put('/:sessionId/status', updateSessionStatus); 


export default router;