import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();

router.post('/login', asyncHandler(login));
router.post('/logout', logout);
router.get('/me', requireAdmin, asyncHandler(me));

export default router;
