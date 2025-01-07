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
    const videoFile = req.file;

    // Check if file is present
    if (!videoFile) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    const newResponse = new Response({
      userId,
      questionId,
      videoPath: videoFile.path, // Save the path of the uploaded video
    });

    await newResponse.save();

    res.status(201).json({ message: "Response saved successfully!" });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
