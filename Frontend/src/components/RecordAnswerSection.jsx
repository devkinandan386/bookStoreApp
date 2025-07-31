// import React, { useEffect, useState } from "react";
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import Webcam from "react-webcam";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // Import your chat session utility (adjust the path as needed)
// import { chatSession } from "../utils/GeminiAIModal";

// function RecordAnswerSection({ totalQuestions, interviewId, unlockNextQuestion }) {
//   // Manage current question index internally
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState([]); // Array to store answers for each question
//   const [feedback, setFeedback] = useState("");
//   const [rating, setRating] = useState("");
//   const [isRecordingComplete, setIsRecordingComplete] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [webCamEnabled, setWebCamEnabled] = useState(false);
//   const [showAnswer, setShowAnswer] = useState(false);

//   const navigate = useNavigate();

//   const {
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechRecognition({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   // Update answer as speech-to-text results update
//   useEffect(() => {
//     if (results?.length > 0) {
//       const newAnswer = results.map((result) => result.transcript).join(" ");
//       setUserAnswers((prevAnswers) => {
//         const updatedAnswers = [...prevAnswers];
//         updatedAnswers[currentQuestionIndex] = newAnswer; // Store answer for the current question
//         return updatedAnswers;
//       });
//     }
//   }, [results, currentQuestionIndex]);

//   // Enable submission button when recording is stopped and an answer exists
//   useEffect(() => {
//     if (!isRecording && userAnswers[currentQuestionIndex]?.trim()) {
//       setIsRecordingComplete(true);
//     }
//   }, [isRecording, userAnswers, currentQuestionIndex]);

//   // Process feedback and rating using chatSession
//   const handleProcessFeedback = async () => {
//     const answer = userAnswers[currentQuestionIndex];
//     if (!answer || answer.trim().length < 10) {
//       toast.error("Answer is too short to process feedback.");
//       return;
//     }
//     try {
//       const prompt = `
//         Evaluate the following user's answer and provide feedback in JSON format.
//         User Answer: "${answer}"
        
//         Return JSON strictly in the format:
//         {
//           "feedback": "Your answer is clear, but could be more detailed.",
//           "rating": 4
//         }
//       `;
//       const result = await chatSession.sendMessage(prompt);
//       let responseText = await result.response.text();
//       // Remove markdown formatting if present
//       responseText = responseText.replace(/```json|```/g, "").trim();
//       const jsonResponse = JSON.parse(responseText);
//       setFeedback(jsonResponse.feedback || "No feedback received.");
//       setRating(jsonResponse.rating || "No rating provided.");
//       toast.success("Feedback processed.");
//     } catch (error) {
//       console.error("Error processing feedback:", error);
//       toast.error("Failed to process feedback.");
//     }
//   };

//   // Submit the current answer (including feedback and rating) to the database
//   const handleSubmitAnswer = async () => {
//     const answer = userAnswers[currentQuestionIndex];
//     if (!answer || !answer.trim()) {
//       toast.error("Cannot submit an empty answer!");
//       return;
//     }
//     if (!feedback || !rating) {
//       toast.error("Please process feedback before submitting!");
//       return;
//     }

//     const payload = {
//       interviewId,
//       questionId: currentQuestionIndex + 1,
//       answer: userAnswers[currentQuestionIndex],
//       feedback,
//       rating,
//     };

//     try {
//       const res = await axios.post("http://localhost:4001/api/answers", payload);
//       if (res.status === 200) {
//         toast.success(`Answer for Question ${currentQuestionIndex + 1} submitted!`);
//         setIsSubmitted(true);
//         unlockNextQuestion(currentQuestionIndex);
//       } else {
//         throw new Error("Failed to submit answer.");
//       }
//     } catch (error) {
//       console.error(
//         "Submission error:",
//         error.response ? error.response.data : error.message
//       );
//       toast.error("Failed to submit answer. Check the console for details.");
//     }
//   };

//   // Handle moving to the next question
//   const handleNextQuestion = () => {
//     // Reset the states for the next question
//     setIsSubmitted(false);
//     setFeedback("");
//     setRating("");
//     setIsRecordingComplete(false);
//     setShowAnswer(false);
//     setCurrentQuestionIndex((prev) => prev + 1);
//   };

//   // Final submission: Navigate to AddNewInterview.jsx page with feedback and rating
// const handleFinalSubmit = () => {
//   // Passing feedback and rating to the AddNewInterview page
//   navigate("/feedback", {
//     state: {
//       feedback: feedback,
//       rating: rating,
//     },
//   });
// };


//   const toggleShowAnswer = () => {
//     setShowAnswer((prev) => !prev);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-full w-full">
//       <ToastContainer />

//       {/* Display the current question number */}
//       <h2 className="text-xl font-bold mb-4">
//         Question {currentQuestionIndex + 1} of {totalQuestions}
//       </h2>

//       {/* Enable Camera */}
//       {!webCamEnabled && (
//         <button
//           onClick={() => setWebCamEnabled(true)}
//           className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-all mb-4"
//         >
//           Enable Camera
//         </button>
//       )}

//       {/* Webcam Display */}
//       {webCamEnabled && (
//         <div className="flex justify-center mb-4">
//           <Webcam
//             style={{
//               width: "80%",
//               height: "200px",
//               zIndex: 10,
//               borderRadius: "5px",
//             }}
//             mirrored={true}
//           />
//         </div>
//       )}

//       {/* Recording Buttons */}
//       <div className="mb-4">
//         <button
//           onClick={isRecording ? stopSpeechToText : startSpeechToText}
//           className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-all"
//         >
//           {isRecording ? "Stop Recording" : "Start Recording"}
//         </button>
//       </div>

//       {/* Show/Hide Answer */}
//       {userAnswers[currentQuestionIndex] && (
//         <div className="mb-4">
//           <button
//             onClick={toggleShowAnswer}
//             className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-700 transition-all"
//           >
//             {showAnswer ? "Hide Answer" : "Show Answer"}
//           </button>
//         </div>
//       )}

//       {showAnswer && userAnswers[currentQuestionIndex] && (
//         <div className="w-full max-w-md mt-4 bg-white p-4 rounded-lg shadow-lg">
//           <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Answer</h2>
//           <p className="text-gray-600">{userAnswers[currentQuestionIndex]}</p>
//         </div>
//       )}

//       {/* Process Feedback Button */}
//       {isRecordingComplete && (!feedback || !rating) && (
//         <button
//           onClick={handleProcessFeedback}
//           className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 mt-4"
//         >
//           Process Feedback
//         </button>
//       )}

//       {/* Submit Answer Button */}
//       {isRecordingComplete && feedback && rating && !isSubmitted && (
//         <button
//           onClick={handleSubmitAnswer}
//           className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 mt-4"
//         >
//           Submit Answer
//         </button>
//       )}

//       {/* Next Question Button for non-final questions */}
//       {isSubmitted && currentQuestionIndex < totalQuestions - 1 && (
//         <button
//           onClick={handleNextQuestion}
//           className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700 mt-4"
//         >
//           Next Question
//         </button>
//       )}

//       {/* Final Submit Button (visible after last question is submitted) */}
//       {currentQuestionIndex === totalQuestions - 1 && isSubmitted && (
//         <button
//           onClick={handleFinalSubmit}
//           className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
//         >
//           Final Submit
//         </button>
//       )}
//     </div>
//   );
// }

// export default RecordAnswerSection;
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Webcam from "react-webcam";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { chatSession } from "../utils/GeminiAIModal";

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
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechRecognition({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results?.length > 0) {
      const newAnswer = results.map((result) => result.transcript).join(" ");
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = newAnswer;
        return updatedAnswers;
      });
    }
  }, [results, currentQuestionIndex]);

  useEffect(() => {
    if (!isRecording && userAnswers[currentQuestionIndex]?.trim()) {
      setIsRecordingComplete(true);
    }
  }, [isRecording, userAnswers, currentQuestionIndex]);

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
      setRating(jsonResponse.rating || "No rating provided.");
      toast.success("Feedback processed.");
    } catch (error) {
      console.error("Error processing feedback:", error);
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
      const res = await axios.post("http://localhost:4001/api/answers", payload);
      if (res.status === 200) {
        toast.success(`Answer for Question ${currentQuestionIndex + 1} submitted!`);
        setIsSubmitted(true);
        unlockNextQuestion(currentQuestionIndex);
      } else {
        throw new Error("Failed to submit answer.");
      }
    } catch (error) {
      console.error("Submission error:", error.response ? error.response.data : error.message);
      toast.error("Failed to submit answer. Check the console for details.");
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

  const toggleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-xl font-bold mb-4">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </h2>

      {!webCamEnabled && (
        <button
          onClick={() => setWebCamEnabled(true)}
          className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-all mb-4"
        >
          Enable Camera
        </button>
      )}

      {webCamEnabled && (
        <div className="flex justify-center mb-4">
          <Webcam
            style={{
              width: "80%",
              height: "200px",
              zIndex: 10,
              borderRadius: "5px",
            }}
            mirrored={true}
          />
        </div>
      )}

      <div className="mb-4">
        <button
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-all"
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {userAnswers[currentQuestionIndex] && (
        <div className="mb-4">
          <button
            onClick={toggleShowAnswer}
            className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-700 transition-all"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        </div>
      )}

      {showAnswer && userAnswers[currentQuestionIndex] && (
        <div className="w-full max-w-md mt-4 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Answer</h2>
          <p className="text-gray-600">{userAnswers[currentQuestionIndex]}</p>
        </div>
      )}

      {isRecordingComplete && (!feedback || !rating) && (
        <button
          onClick={handleProcessFeedback}
          className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 mt-4"
        >
          Process Feedback
        </button>
      )}

      {isRecordingComplete && feedback && rating && !isSubmitted && (
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

      {currentQuestionIndex === totalQuestions - 1 && isSubmitted && (
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
