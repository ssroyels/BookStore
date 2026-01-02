import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import BookRoute from "./routes/book.routes.js";
import UserRoute from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = 4000;
const URI = process.env.MONGOURI;

/* ---------------- MIDDLEWARE ---------------- */

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ exact frontend
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // ✅ cookies allowed
  })
);

/* ---------------- DATABASE ---------------- */

async function connectDB() {
  try {
    await mongoose.connect(URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
}

/* ---------------- ROUTES ---------------- */

app.use("/book", BookRoute);
app.use("/user", UserRoute);

/* ---------------- SERVER ---------------- */

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});

