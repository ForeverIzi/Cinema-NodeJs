import express from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/user/createUser", createUser);

export default router;

