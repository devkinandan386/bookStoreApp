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

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 4000;
const MongoDBURI = process.env.MONGODB_URI || "mongodb://localhost:27017/BookStore";

// Define __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(MongoDBURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.log("error", error));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/video", videoRoute);
app.use("/interview", interviewRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
