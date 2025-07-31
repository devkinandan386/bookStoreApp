// models/Answer.js

import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  answer: {
    type: String,
    required: true,
  },
  questionId: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
  },
  rating: {
    type: Number,
  },
}, { timestamps: true });

const Answer = mongoose.model('Answer', answerSchema);
export default Answer;
