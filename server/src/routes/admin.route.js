import express from "express";
import {
  adminAuth,
  adminlogin,
  adminregister,
} from "../controllers/auth.controller.js";
import { adminRoute } from "../middleware/auth.middleware.js";
import { createUser } from "../controllers/admin.controller.js";

const router = express.Router();

// admin register route used in testing only
//router.post("/admin-register", adminregister);

// admin login route
router.post("/admin-login", adminlogin);

// admin protected routes
router.post("/create-user", adminRoute, createUser);

// check if admin authenticated
router.get("/checkAdmin", adminRoute, adminAuth);

export default router;
