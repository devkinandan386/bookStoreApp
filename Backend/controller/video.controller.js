// Backend/controller/video.controller.js
import Video from "../model/video.model.js";

// Fetch all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching videos", error });
  }
};

// Add a new video
export const addVideo = async (req, res) => {
  try {
    const { title, videoUrl, description } = req.body;
    const newVideo = new Video({ title, videoUrl, description });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: "Error adding video", error });
  }
};
