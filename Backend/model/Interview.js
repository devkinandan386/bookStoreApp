// import mongoose from "mongoose";

// const interviewSchema = mongoose.Schema({
//   question: { type: String, required: true },
// });

// const Interview = mongoose.model("Interview", interviewSchema, "interviewQuestions");

// export default Interview;

import mongoose from "mongoose";

const interviewSchema = mongoose.Schema({
  question: { type: String, required: true },
});

const Interview = mongoose.model("Interview", interviewSchema, "interviewQuestions");

export default Interview;
