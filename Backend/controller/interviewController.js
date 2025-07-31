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
    console.log("📩 Request body:", req.body);
    console.log("📦 Uploaded file:", req.file);

    const { userId, questionId } = req.body;

    const responseData = {
      userId,
      questionId,
    };

    if (req.file) {
      responseData.videoPath = req.file.path;
    } else {
      console.warn("⚠️ No file uploaded.");
    }

    const newResponse = new Response(responseData);
    await newResponse.save();

    res.status(201).json({ message: "Response saved successfully!" });
  } catch (error) {
    console.error("🔥 Error in saveResponse:", error.message);
    console.error("📄 Stack trace:", error.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};
