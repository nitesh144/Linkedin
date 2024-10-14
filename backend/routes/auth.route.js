import express from 'express'
import { login, logout, signup, GetCurrentUser } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

//fetch the current user profile
router.get("/me", protectRoute, GetCurrentUser);

export default router;