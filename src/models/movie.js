import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ageRating: { type: String, required: true }, 
  duration: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
