import mongoose from "mongoose";

const responseSchema = mongoose.Schema({
  userId: { type: String, required: true },
  questionId: { type: String, required: true },
  videoPath: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Response = mongoose.model("Response", responseSchema);

export default Response;

