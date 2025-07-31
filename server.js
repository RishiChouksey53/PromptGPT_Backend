import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import mainRouter from "./routes/main.router.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://prompt-gpt-frontend.vercel.app" }));

app.use("/", mainRouter);

app.set("PORT", process.env.PORT || 8080);

const start = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to DB host ${connectDB.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to DB:", error.message);
    process.exit(-1);
  }
  app.listen(app.get("PORT"), () => {
    console.log(`Server running on ${app.get("PORT")}`);
  });
};
start();
