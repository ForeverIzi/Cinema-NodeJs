import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/user", getAllUsers);
router.get("/user/getUserById/:id", getUserById);
router.post("/user/createUser", createUser);
router.put("/user/updateUser/:id", updateUser);
router.delete("/user/deleteUser/:id", deleteUser);

export default router;

