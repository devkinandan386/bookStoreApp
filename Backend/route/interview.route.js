// import express from "express";
// import { getQuestions, saveResponse } from "../controller/interviewController.js";
// import multer from 'multer';

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });


// // Define routes here
// router.get("/", getQuestions)

// router.get("/questions", getQuestions);
// router.post("/response", upload.single('video'), saveResponse);

// export default router;

import express from "express";
import { getQuestions, saveResponse } from "../controller/interviewController.js";
import multer from 'multer';

const router = express.Router();

// Configure multer to store uploaded videos in 'uploads/' folder
const upload = multer({ dest: 'uploads/' }); // Make sure this folder exists

router.get("/", getQuestions);
router.get("/questions", getQuestions);

// ✅ Use upload.single('video') here to handle file upload!
router.post('/response', upload.single('video'), saveResponse);

export default router;

