import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables early
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Atlas connection
const MongoDBURI = process.env.MONGODB_URI;
mongoose.connect(MongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(error => {
  console.error("❌ MongoDB Connection Error:", error);
  process.exit(1);
});

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
import bookRoute from './route/book.route.js';
import userRoute from './route/user.route.js';
import videoRoute from './route/video.route.js';
import interviewRoute from './route/interview.route.js';
import mockInterviewRoutes from './route/MockinterviewRoutes.js';
import answerRoutes from './route/answerRoutes.js';

import interviewRoute from './route/interview.route.js';
app.use('/interview', interviewRoute);

app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use('/video', videoRoute);
app.use('/interview', interviewRoute);
app.use('/mockinterview', mockInterviewRoutes);
app.use('/api', answerRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('✅ Bookstore backend is running!');
});

// Production build (deployment)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'Frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
  });
}

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
