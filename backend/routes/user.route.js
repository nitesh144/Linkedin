import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, getPublicProfile, updateProfile} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);
//public profile for the user
router.get("/:username", protectRoute, getPublicProfile);
//update profile
router.put("/profile", protectRoute, updateProfile);

export default router;