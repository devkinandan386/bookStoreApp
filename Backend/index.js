import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import videoRoute from "./route/video.route.js";
import interviewRoute from "./route/interview.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load environment variables
dotenv.config();

// Setup path for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables
const PORT = process.env.PORT || 4000;
const MongoDBURI = process.env.MONGODB_URI || "mongodb://localhost:27017/BookStore";

// Connect to MongoDB
mongoose.connect(MongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(error => console.error("❌ MongoDB connection error:", error));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/video", videoRoute);
app.use("/interview", interviewRoute);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Bookstore backend is running!");
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
