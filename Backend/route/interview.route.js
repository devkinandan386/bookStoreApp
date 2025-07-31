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
const upload = multer({ dest: 'uploads/' }); // Ensure this path exists

router.get("/", getQuestions);
router.get("/questions", getQuestions);
router.post("/response", saveResponse); // Temporarily skip multer

export default router;
