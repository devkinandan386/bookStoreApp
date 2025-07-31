// import mongoose from 'mongoose';

// const AnswerSchema = new mongoose.Schema({
//   question: { type: String, required: true },
//   answer: { type: String, required: true },
//   feedback: { type: String },
//   rating: { type: Number },
// });

// const MockInterviewSchema = new mongoose.Schema({
//   mockId: { type: String, required: true, unique: true },
//   jsonMockResp: { type: Array, required: true },
//   jobPosition: { type: String, required: true },
//   jobDesc: { type: String, required: true },
//   jobExperience: { type: String, required: true },
//   createdBy: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   answers: { type: [AnswerSchema], default: [] },
// });

// const MockInterviewModel = mongoose.model('MockInterview', MockInterviewSchema);
// export default MockInterviewModel;

import mongoose from 'mongoose';

const MockInterviewSchema = new mongoose.Schema({
  mockId: { type: String, required: true, unique: true },
  jsonMockResp: { type: Array, required: true },
  jobPosition: { type: String, required: true },
  jobDesc: { type: String, required: true },
  jobExperience: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  answers: [
    {
      question: { type: String, required: true },
      answer: { type: String, required: true },
      feedback: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
});

const MockInterviewModel = mongoose.model('MockInterview', MockInterviewSchema);
export default MockInterviewModel;
