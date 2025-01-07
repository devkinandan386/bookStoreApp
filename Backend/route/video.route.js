// Backend/route/video.route.js
import express from "express";
import { getAllVideos, addVideo } from "../controller/video.controller.js";

const router = express.Router();

// Get all videos
router.get("/", getAllVideos);

// Add a video
router.post("/", addVideo);

export default router;
