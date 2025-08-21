import movie from "../models/movie.js";

export const getAllMovies = async(req, res) => {
    try {
        const movies = await movie.find();
        return res.json(movies);
    } catch (err) {
        return res.status(500).json({error: err.message});
    };
};

export const getMovieById = async(req, res) => {
    try {
        const { id } = req.params;
        const movieDoc = await movie.findById(id);

        if (!movieDoc) {
            return res.status(404).json({message:"Filme não encontrado"});
        };
        return res.json(movieDoc);

    } catch (err) {
        return res.status(500).json({error: err.message});
    };
};

export const addMovie = async(req, res) => {
    try {
        const createMovie = new movie(req.body);
        await createMovie.save();

        return res.status(201).json(createMovie);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
};

export const updateMovie = async(req, res) => {
    try {
        const updateMovie = await movie.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(updateMovie);
    } catch (err) {
        return res.status(500).json({error: err.message});
    };
};

export const deleteMovie = async(req, res) => {
    try {
        await movie.findByIdAndDelete(req.params.id);
        return res.json({message: "Filme deletado com sucesso"});
    } catch (err) {
        res.status(500).json({error: err.message});
    };
};

