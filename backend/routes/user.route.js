import express from "express";
import { register, login, logout, updateUser } from "../controllers/user.controller.js";
import  isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// User registration route
router.post("/register", register);

// User login route
router.post("/login", login);

// User logout route
router.get("/logout", logout);

// User update route (with authentication middleware)
router.post("/profile/update", isAuthenticated, updateUser);

export default router;
