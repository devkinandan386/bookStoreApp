import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Webcam from "react-webcam";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { chatSession } from "../utils/GeminiAIModal"; // assumes this is set up for Gemini/GPT API

function RecordAnswerSection({ totalQuestions, interviewId, unlockNextQuestion }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("");
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Fallback if browser does not support speech recognition
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast.error("Your browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  // Store transcript into userAnswers when recording stops
  useEffect(() => {
    if (!listening && transcript.trim()) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = transcript.trim();
      setUserAnswers(updatedAnswers);
      setIsRecordingComplete(true);
    }
  }, [listening]);

  const handleStartRecording = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopRecording = () => {
    SpeechRecognition.stopListening();
  };

  const handleProcessFeedback = async () => {
    const answer = userAnswers[currentQuestionIndex];
    if (!answer || answer.trim().length < 10) {
      toast.error("Answer is too short to process feedback.");
      return;
    }

    try {
      const prompt = `
        Evaluate the following user's answer and provide feedback in JSON format.
        User Answer: "${answer}"
        Return JSON strictly in the format:
        {
          "feedback": "Your answer is clear, but could be more detailed.",
          "rating": 4
        }
      `;

      const result = await chatSession.sendMessage(prompt);
      let responseText = await result.response.text();

      responseText = responseText.replace(/```json|```/g, "").trim();
      const jsonResponse = JSON.parse(responseText);

      setFeedback(jsonResponse.feedback || "No feedback received.");
      setRating(jsonResponse.rating?.toString() || "No rating provided.");
      toast.success("Feedback processed.");
    } catch (error) {
      console.error("Feedback error:", error);
      toast.error("Failed to process feedback.");
    }
  };

  const handleSubmitAnswer = async () => {
    const answer = userAnswers[currentQuestionIndex];
    if (!answer || !answer.trim()) {
      toast.error("Cannot submit an empty answer!");
      return;
    }

    if (!feedback || !rating) {
      toast.error("Please process feedback before submitting!");
      return;
    }

    const payload = {
      interviewId,
      questionId: currentQuestionIndex + 1,
      answer,
      feedback,
      rating,
    };

    try {
      const res = await axios.post(
        "https://bookstoreapp-backend-f2em.onrender.com/api/answers",
        payload
      );

      if (res.status === 200 || res.status === 201) {
        toast.success(`Answer for Question ${currentQuestionIndex + 1} submitted!`);
        setIsSubmitted(true);
        unlockNextQuestion(currentQuestionIndex);
      } else {
        toast.error("Server did not accept the answer.");
      }
    } catch (error) {
      console.error("Submit error:", error?.response?.data || error.message);
      toast.error("Error submitting answer.");
    }
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    setFeedback("");
    setRating("");
    setIsRecordingComplete(false);
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handleFinalSubmit = () => {
    navigate("/feedback", {
      state: {
        feedback,
        rating,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Toaster position="top-right" />

      <h2 className="text-xl font-bold mb-4">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </h2>

      {!webCamEnabled && (
        <button
          onClick={() => setWebCamEnabled(true)}
          className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 mb-4"
        >
          Enable Camera
        </button>
      )}

      {webCamEnabled && (
        <div className="mb-4">
          <Webcam
            style={{ width: "100%", height: "200px", borderRadius: "8px" }}
            mirrored={true}
          />
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={listening ? handleStopRecording : handleStartRecording}
          className={`py-2 px-6 rounded text-white transition-all ${
            listening ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {listening ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {userAnswers[currentQuestionIndex] && (
        <div className="mb-4">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-700"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        </div>
      )}

      {showAnswer && (
        <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Your Answer</h2>
          <p className="text-gray-700">{userAnswers[currentQuestionIndex]}</p>
        </div>
      )}

      {isRecordingComplete && !feedback && (
        <button
          onClick={handleProcessFeedback}
          className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700"
        >
          Process Feedback
        </button>
      )}

      {feedback && rating && !isSubmitted && (
        <button
          onClick={handleSubmitAnswer}
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 mt-4"
        >
          Submit Answer
        </button>
      )}

      {isSubmitted && currentQuestionIndex < totalQuestions - 1 && (
        <button
          onClick={handleNextQuestion}
          className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700 mt-4"
        >
          Next Question
        </button>
      )}

      {isSubmitted && currentQuestionIndex === totalQuestions - 1 && (
        <button
          onClick={handleFinalSubmit}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
        >
          Final Submit
        </button>
      )}
    </div>
  );
}

export default RecordAnswerSection;
