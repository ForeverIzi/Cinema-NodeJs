import express from "express";
import { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie} from "../controllers/movieController.js";

const router = express.Router();

router.get("/movie", getAllMovies);
router.get("/movie/getMovieById/:id", getMovieById);
router.post("/movie/addMovie", addMovie);
router.put("/movie/updateMovie/:id", updateMovie);
router.delete("/movie/deleteMovie/:id", deleteMovie);

export default router;
