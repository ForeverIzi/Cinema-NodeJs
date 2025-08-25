import express from "express";
import {getAvailableSeats} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/session/getSessionSeats/:id/seats" , getAvailableSeats);

export default router;
