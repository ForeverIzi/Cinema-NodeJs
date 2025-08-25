import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js"

const app = express();
app.use(express.json());

app.use("/api", movieRoutes);
app.use("/api", userRoutes);
app.use("/api", sessionRoutes)

app.get("/", (req, res) => {
  res.send("Servidor rodando e conectado ao MongoDB Local! 🎬");
});

export default app;
