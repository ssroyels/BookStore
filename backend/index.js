import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import BookRoute from "./routes/book.routes.js";
import UserRoute from "./routes/user.routes.js";
import cors from "cors";

const app = express();
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 9000;
const URI = process.env.MONGOURI;

// Middleware
app.use(express.json());


async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log("MongoDB connection error:", err);
    process.exit(1); // server exit if not connected
  }
}

// Routes
app.use("/book", BookRoute);
app.use("/user",UserRoute);

// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
