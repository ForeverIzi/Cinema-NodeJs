import mongoose from "mongoose";
import Session from "../models/session.js";
import User from "../models/user.js";
import Movie from "../models/movie.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/cinema";

const rows = "ABCDEFGHIJKLMN";
const seatsPerRow = 20;

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado ao MongoDB");

    // Limpa a coleção
    await Session.deleteMany({});
    console.log("Coleção de sessões limpa.");

    const movies = await Movie.find();
    const users = await User.find();

    if (movies.length === 0) {
      console.log("❌ Não há filmes cadastrados.");
      return;
    }

    const sessions = [];

    for (let i = 0; i < 10; i++) {
      const movie = getRandomElement(movies);
      const totalSeats = rows.length * seatsPerRow;
      const occupiedSeats = [];

      const reservedCount = Math.floor(Math.random() * 10); 
      for (let j = 0; j < reservedCount; j++) {
        const row = getRandomElement(rows);
        const number = Math.floor(Math.random() * seatsPerRow) + 1;
        const seatNumber = `${row}${number}`;

        if (!occupiedSeats.find(s => s.seatNumber === seatNumber)) {
          const user = getRandomElement(users);
          occupiedSeats.push({ seatNumber, user: user._id });
        }
      }

      const date = new Date();
      date.setDate(date.getDate() + i);
      const startTime = new Date(date);
      startTime.setHours(14 + i, 0, 0);

      sessions.push({
        movie: movie._id,
        room: `Sala ${i + 1}`,
        date: date,
        startTime: startTime,
        version: getRandomElement(["2D", "3D", "IMAX"]),
        lenguage: getRandomElement(["Dublado", "Legendado"]),
        totalSeats,
        occupiedSeats,
        price: 25 + i
      });
    }

    for (let i = 0; i < 5; i++) {
      const movie = getRandomElement(movies);
      const totalSeats = rows.length * seatsPerRow;
      const date = new Date();
      date.setDate(date.getDate() + 20 + i); 
      const startTime = new Date(date);
      startTime.setHours(18, 0, 0);

      sessions.push({
        movie: movie._id,
        room: `Sala Livre ${i + 1}`,
        date: date,
        startTime: startTime,
        version: getRandomElement(["2D", "3D", "IMAX"]),
        lenguage: getRandomElement(["Dublado", "Legendado"]),
        totalSeats,
        occupiedSeats: [], 
        price: 20
      });
    }

    await Session.insertMany(sessions);
    console.log("Sessões inseridas com sucesso!");

    await mongoose.disconnect();
    console.log("Desconectado do MongoDB");
  } catch (err) {
    console.error("Erro ao conectar ou adicionar sessões:", err.message);
  }
}

run();
