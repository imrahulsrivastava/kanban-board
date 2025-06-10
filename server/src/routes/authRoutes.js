import { Router } from "express";
import protectedRoute from "../middlewares/protectedRoute.js";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authControllers.js";
import authenticateUser from "../middlewares/authenticateUser.js";

const router = Router();

router.get("/me", authenticateUser, getMe);
router.get("/logout", protectedRoute, logout);
router.post("/register", register);
router.post("/login", authenticateUser, login);

export default router;
