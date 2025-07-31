

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import videoRoute from "./route/video.route.js";
import interviewRoute from "./route/interview.route.js";
import mockInterviewRoutes from './route/MockinterviewRoutes.js'; // Mock Interview
import answerRoutes from './route/answerRoutes.js'; // Answer Submission

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
//////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';
import videoRoute from './route/video.route.js';
import interviewRoute from './route/interview.route.js';
import mockInterviewRoutes from './route/MockinterviewRoutes.js'; // Mock Interview
import answerRoutes from './route/answerRoutes.js'; // Answer Submission


const app = express();

dotenv.config(); // Load .env variables

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MongoDBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/BookStore';
mongoose.connect(MongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(error => {
  console.error('❌ MongoDB Connection Error:', error);
  process.exit(1); // Exit the process if MongoDB connection fails
});

// Define __dirname and __filename for file pathing
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use('/video', videoRoute);
app.use('/interview', interviewRoute);
app.use('/mockinterview', mockInterviewRoutes);
app.use('/api', answerRoutes);

// Deployment configuration for production build
if (process.env.NODE_ENV === 'production') {
  const dirPath = path.resolve();
  app.use(express.static(path.join(__dirname, 'Frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirPath, 'Frontend', 'dist', 'index.html'));
  });
}

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
