import express from 'express';
import { submitAnswer } from '../controller/answerController.js'; // Ensure correct import path

const router = express.Router();


router.post('/answers', submitAnswer); // Ensure this matches the frontend request

export default router;
