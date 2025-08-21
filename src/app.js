import express from "express";
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
app.use(express.json());

app.use("/api", movieRoutes);

app.get("/", (req, res) => {
  res.send("Servidor rodando e conectado ao MongoDB Local! 🎬");
});

export default app;
