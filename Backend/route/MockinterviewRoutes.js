// // routes/MockInterviewRoutes.js

// import express from 'express';
// import { saveMockInterview } from '../controller/MockinterviewController.js';

// const router = express.Router();

// // Route to save mock interview data
// router.post('/save', saveMockInterview);

// export default router;

import express from 'express';
import { saveMockInterview, getMockInterview } from '../controller/MockinterviewController.js'; // Ensure the controller is imported

const router = express.Router();

// Route to save mock interview data
router.post('/save', saveMockInterview);

// Route to fetch mock interview questions by interviewId
router.get('/:id', getMockInterview);  // This will handle fetching interview details by ID

export default router;
