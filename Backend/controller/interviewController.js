// import Interview from "../model/Interview.js";

// export const getQuestions = async (req, res) => {
//   try {
//     const questions = await Interview.find();
//     res.status(200).json(questions);
//   } catch (error) {
//     console.log("Error: ", error);
//     res.status(500).json(error);
//   }
// };

// export const saveResponse = async (req, res) => {
//   const { userId, responses } = req.body;
//   const videoFile = req.file;
//   res.status(201).send("Responses saved");
// };

import Interview from "../model/Interview.js";
import Response from "../model/Response.js"; // Import the Response model

export const getQuestions = async (req, res) => {
  try {
    const questions = await Interview.find();
    res.status(200).json(questions);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const saveResponse = async (req, res) => {
  try {
    const { userId, questionId } = req.body;

    if (!userId || !questionId) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const responseData = { userId, questionId };

    if (req.file) {
      responseData.videoPath = req.file.path.replace(/\\/g, "/"); // Normalize slashes
    } else {
      console.warn("⚠️ No file uploaded.");
    }

    const newResponse = new Response(responseData);
    await newResponse.save();

    res.status(201).json({ message: "Response saved successfully!" });
  } catch (error) {
    console.error("🔥 Error in saveResponse:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
