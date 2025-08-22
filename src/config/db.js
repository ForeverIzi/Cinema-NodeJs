import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();  

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI não definida no .env");

    await mongoose.connect(uri);
    console.log("✅ MongoDB conectado!");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
