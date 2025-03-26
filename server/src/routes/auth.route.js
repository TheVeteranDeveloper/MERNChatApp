import express from "express";
// controllers
import {
  login,
  signup,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
// middleware to authenticate user
import { protectRoute } from "../middleware/auth.middleware.js";

// create router
const router = express.Router();

// registration router
router.post("/signup", signup);
// login router
router.post("/login", login);
// logout router
router.post("/logout", logout);

// profile update end-point
router.put("/update-profile", protectRoute, updateProfile);

// check if user is authenticated
router.get("/check", protectRoute, checkAuth);

// export
export default router;
