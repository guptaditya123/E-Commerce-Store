import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { signup, login, logout , refreshToken, getProfile, getAllUsers} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

router.get("/profile",protectRoute, getProfile);

router.get('/allUsers',protectRoute,getAllUsers)

export default router;
