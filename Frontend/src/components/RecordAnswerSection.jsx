// import { Webcam } from 'lucide-react';
// import useSpeechToText from 'react-hook-speech-to-text';
// import React from 'react';

// function RecordAnswerSection() {
//   const [userAnswer, setUserAnswer] = React.useState('');
//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   useEffect((results) => {
//     results.map((result) =>(
//       setUserAnswer(prevAns=>prevAns +result?.transcript)
//     ))
//   },[results])

 

//   return (
//     <div className="flex flex-col items-center justify-center h-full w-full">
//       {/* Webcam component */}
//       <div className="flex justify-center mb-4">
//         <Webcam
//           style={{
//             width: '80%',
//             height: '200px',
//             zIndex: 10,
//             borderRadius: '5px',
//           }}
//           mirrored={true}
//         />
//       </div>

//       {/* Button to start/stop recording */}
//       <div className="mb-4">
//         <button
//           onClick={isRecording ? stopSpeechToText : startSpeechToText}
//           className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-all"
//         >
//           {isRecording ? 'Stop Recording' : 'Start Recording'}
//         </button>
//       </div>

//       {/* Displaying whether it's recording or not */}
//       <h1>Recording: {isRecording.toString()}</h1>

//       {/* Card View to display the recorded results
//       <div className="w-full max-w-md mt-6">
//         {results.length > 0 && (
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Recorded Text</h2>
//             <ul>
//               {results.map((result, index) => (
//                 <li key={index} className="text-gray-600 mb-2">{result.transcript}</li>
//               ))}
//             </ul>
//             {interimResult && (
//               <div className="text-gray-500 mt-4 italic">{interimResult}</div>
//             )}
//           </div>
//         )}
//       </div> */}

//       {/* Display any errors */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// }

// export default RecordAnswerSection;

// import React, { useEffect, useState } from "react";
// import useSpeechToText from "react-hook-speech-to-text";
// import Webcam from "react-webcam";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from 'axios'; // To send data to the backend
// import { chatSession } from "../utils/GeminiAIModal"; // Ensure chatSession is correctly imported


// function RecordAnswerSection({ totalQuestions }) {
//   const [userAnswer, setUserAnswer] = useState("");
//   const [showText, setShowText] = useState(false);
//   const [feedback, setFeedback] = useState(""); // State for feedback
//   const [rating, setRating] = useState(""); // State for rating
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
//   const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
//   const [allAnswers, setAllAnswers] = useState([]); // Store all answers for final submission
//   const [isRecordingComplete, setIsRecordingComplete] = useState(false); // To track if recording is completed

//   const {
//     error,
//     interimResult,
//     isRecording,
//     results,
//     startSpeechToText,
//     stopSpeechToText,
//   } = useSpeechToText({
//     continuous: true,
//     useLegacyResults: false,
//   });

//   // Update userAnswer when speech results change
//   useEffect(() => {
//     if (results?.length > 0) {
//       setUserAnswer(results.map((result) => result.transcript).join(" "));
//     }
//   }, [results]);

//   // Handle showing answer and fetching feedback
//   const handleShowClick = async () => {
//     if (userAnswer.length < 10) {
//       toast.error("Recording must be at least 10 characters long!", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       return;
//     }
  
//     toast.success("Recording is valid!", {
//       position: "top-center",
//       autoClose: 3000,
//     });
  
//     console.log("Recorded Text:", userAnswer || "No speech detected yet...");
  
//     try {
//       const feedbackPrompt = `
//         Evaluate the following user's answer and provide feedback in JSON format.
//         User Answer: "${userAnswer}"
  
//         Return JSON strictly in the format:
//         {
//           "feedback": "Your answer is clear, but could be more detailed.",
//           "rating": 4
//         }
//       `;
  
//       const result = await chatSession.sendMessage(feedbackPrompt); // Make sure chatSession is available
//       let responseText = await result.response.text();
  
//       responseText = responseText.replace(/```json|```/g, "").trim();
  
//       const jsonResponse = JSON.parse(responseText);
  
//       setFeedback(jsonResponse.feedback || "No feedback received.");
//       setRating(jsonResponse.rating || "No rating provided.");
  
//     } catch (error) {
//       console.error("Error fetching feedback:", error);
//       toast.error("Failed to fetch feedback.");
//     }
  
//     setShowText((prev) => !prev);
//     setIsRecordingComplete(true); // Enable next question after completion
//   };  

//   const handleNextQuestion = () => {
//     const newAnswer = {
//       answer: userAnswer,
//       questionId: currentQuestionIndex + 1,
//       feedback,
//       rating
//     };
  
//     setAllAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  
//     setAnsweredQuestions((prev) => {
//       const updatedAnswers = [...prev, currentQuestionIndex];
//       if (updatedAnswers.length === totalQuestions) {
//         setIsRecordingComplete(true); // Ensure final submit is enabled
//       }
//       return updatedAnswers;
//     });
  
//     if (currentQuestionIndex < totalQuestions - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       setUserAnswer(""); // Clear previous answer
//       setShowText(false);
//       setIsRecordingComplete(false);
//     }
//   };  

//   const handleSubmitAnswer = async () => {
//     const newAnswer = {
//       questionId: currentQuestionIndex + 1, 
//       answer: userAnswer,
//       feedback,
//       rating
//     };
  
//     setAllAnswers((prevAnswers) => [...prevAnswers, newAnswer]); 
  
//     try {
//       await axios.post('http://localhost:4001/api/answers', newAnswer);
//       toast.success(`Answer for Question ${currentQuestionIndex + 1} submitted!`);
//     } catch (error) {
//       toast.error("Failed to submit answer.");
//     }
//   };


//   // Handle final submit
//   const handleFinalSubmit = async () => {
//     try {
//       // Submit all answers at once
//       const response = await axios.post('http://localhost:4001/api/answers/final', { answers: allAnswers });

//       if (response.status === 200) {
//         toast.success("All answers submitted successfully!");
//       } else {
//         toast.error("Failed to submit all answers.");
//       }
//     } catch (error) {
//       console.error("Error submitting all answers:", error);
//       toast.error("Failed to submit all answers.");
//     }
//   };

//   const allQuestionsAnswered = answeredQuestions.length === totalQuestions;

//   return (
//     <div className="flex flex-col items-center justify-center h-full w-full">
//       <ToastContainer />

//       {/* Webcam Component */}
//       <div className="flex justify-center mb-4">
//         <Webcam
//           style={{
//             width: "80%",
//             height: "200px",
//             zIndex: 10,
//             borderRadius: "5px",
//           }}
//           mirrored={true}
//         />
//       </div>

//       {/* Buttons for Recording & Showing Text */}
//       <div className="mb-4">
//         <button
//           onClick={isRecording ? stopSpeechToText : startSpeechToText}
//           className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-all"
//         >
//           {isRecording ? "Stop Recording" : "Start Recording"}
//         </button>
//         <button
//           onClick={handleShowClick}
//           className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-all ml-4"
//         >
//           {showText ? "Hide" : "Show"}
//         </button>
//       </div>

//       {/* Displaying Recording Status */}
//       <h1>Recording: {isRecording.toString()}</h1>

//       {/* Display Recorded Text & Feedback */}
//       {showText && (
//         <div className="w-full max-w-md mt-6 bg-white p-4 rounded-lg shadow-lg">
//           <h2 className="text-lg font-semibold text-gray-700 mb-3">Your Recorded Answer</h2>
//           <p className="text-gray-600">{userAnswer || "No speech detected yet..."}</p>
//           {interimResult && <p className="text-gray-500 mt-4 italic">{interimResult}</p>}

//           {/* Feedback Section */}
//           {allQuestionsAnswered && feedback && (
//             <div className="mt-4 p-3 border rounded bg-gray-100">
//               <h3 className="text-md font-semibold text-gray-800">Feedback</h3>
//               <p className="text-gray-700">{feedback}</p>
//               <p className="text-gray-600 mt-2">Rating: {rating}</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Submit Answer Button */}
//       {isRecordingComplete && (
//         <button
//           onClick={handleSubmitAnswer}
//           className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 mt-4"
//         >
//           Submit Answer
//         </button>
//       )}

//       {/* Next Question Button */}
//       {isRecordingComplete && currentQuestionIndex < totalQuestions - 1 && !allQuestionsAnswered && (
//         <button
//           onClick={handleNextQuestion}
//           className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 mt-4"
//         >
//           Next Question
//         </button>
//       )}

//       {/* Final Submit Button */}
//       {currentQuestionIndex === totalQuestions - 1 && isRecordingComplete && (
//   <button
//     onClick={handleFinalSubmit}
//     className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mt-4"
//   >
//     Final Submit
//   </button>
// )}

//       {/* Display Any Errors */}
//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// }

// export default RecordAnswerSection;

import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Import your chat session utility (adjust the path as needed)
import { chatSession } from "../utils/GeminiAIModal";

function RecordAnswerSection({ totalQuestions, interviewId, unlockNextQuestion }) {
  // Manage current question index internally
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Array to store answers for each question
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
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Update answer as speech-to-text results update
  useEffect(() => {
    if (results?.length > 0) {
      const newAnswer = results.map((result) => result.transcript).join(" ");
      setUserAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[currentQuestionIndex] = newAnswer; // Store answer for the current question
        return updatedAnswers;
      });
    }
  }, [results, currentQuestionIndex]);

  // Enable submission button when recording is stopped and an answer exists
  useEffect(() => {
    if (!isRecording && userAnswers[currentQuestionIndex]?.trim()) {
      setIsRecordingComplete(true);
    }
  }, [isRecording, userAnswers, currentQuestionIndex]);

  // Process feedback and rating using chatSession
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
      // Remove markdown formatting if present
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

  // Submit the current answer (including feedback and rating) to the database
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
      answer: userAnswers[currentQuestionIndex],
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
      console.error(
        "Submission error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to submit answer. Check the console for details.");
    }
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    // Reset the states for the next question
    setIsSubmitted(false);
    setFeedback("");
    setRating("");
    setIsRecordingComplete(false);
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  // Final submission: Navigate to AddNewInterview.jsx page with feedback and rating
const handleFinalSubmit = () => {
  // Passing feedback and rating to the AddNewInterview page
  navigate("/feedback", {
    state: {
      feedback: feedback,
      rating: rating,
    },
  });
};


  const toggleShowAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <ToastContainer />

      {/* Display the current question number */}
      <h2 className="text-xl font-bold mb-4">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </h2>

      {/* Enable Camera */}
      {!webCamEnabled && (
        <button
          onClick={() => setWebCamEnabled(true)}
          className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-all mb-4"
        >
          Enable Camera
        </button>
      )}

      {/* Webcam Display */}
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

      {/* Recording Buttons */}
      <div className="mb-4">
        <button
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-red-700 transition-all"
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {/* Show/Hide Answer */}
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

      {/* Process Feedback Button */}
      {isRecordingComplete && (!feedback || !rating) && (
        <button
          onClick={handleProcessFeedback}
          className="bg-orange-600 text-white py-2 px-6 rounded hover:bg-orange-700 mt-4"
        >
          Process Feedback
        </button>
      )}

      {/* Submit Answer Button */}
      {isRecordingComplete && feedback && rating && !isSubmitted && (
        <button
          onClick={handleSubmitAnswer}
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 mt-4"
        >
          Submit Answer
        </button>
      )}

      {/* Next Question Button for non-final questions */}
      {isSubmitted && currentQuestionIndex < totalQuestions - 1 && (
        <button
          onClick={handleNextQuestion}
          className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700 mt-4"
        >
          Next Question
        </button>
      )}

      {/* Final Submit Button (visible after last question is submitted) */}
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
