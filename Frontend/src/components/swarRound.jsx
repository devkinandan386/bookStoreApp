// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // function SwarRound() {
// //   const [questions, setQuestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
// //   const [userAnswer, setUserAnswer] = useState("");
// //   const [isRecording, setIsRecording] = useState(false);

// //   useEffect(() => {
// //     const fetchQuestions = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:4001/api/swar/fetchQuestions?section=1");
// //         if (!response.data || response.data.length === 0) {
// //           throw new Error("No questions available.");
// //         }
// //         setQuestions(response.data); // ✅ Store all questions in state
// //       } catch (err) {
// //         console.error("Error fetching questions:", err);
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     fetchQuestions();
// //   }, []);
  

// //   // ✅ Convert Speech to Text
// //   const startRecording = () => {
// //     if ("webkitSpeechRecognition" in window) {
// //       setIsRecording(true);
// //       const recognition = new window.webkitSpeechRecognition();
// //       recognition.continuous = false;
// //       recognition.interimResults = false;
// //       recognition.lang = "en-US";

// //       recognition.onresult = (event) => {
// //         setUserAnswer(event.results[0][0].transcript);
// //         setIsRecording(false);
// //       };

// //       recognition.onerror = (event) => {
// //         console.error("Speech Recognition Error:", event.error);
// //         setIsRecording(false);
// //       };

// //       recognition.start();
// //     } else {
// //       alert("Speech Recognition is not supported in this browser.");
// //     }
// //   };

// //   // ✅ Handle answer submission
// //   const handleSubmitAnswer = async () => {
// //     if (!userAnswer) {
// //       alert("Please speak your answer before submitting.");
// //       return;
// //     }

// //     try {
// //       const currentQuestion = questions[activeQuestionIndex];

// //       await axios.post("http://localhost:4001/api/swar/submitAnswer", {
// //         section: 1,
// //         questionId: currentQuestion._id,
// //         userAnswer,
// //       });

// //       alert("✅ Answer submitted successfully!");

// //       // Move to the next question
// //       setUserAnswer(""); // Clear previous answer
// //       setActiveQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
// //     } catch (error) {
// //       console.error("❌ Error submitting answer:", error);
// //       alert("Failed to submit answer.");
// //     }
// //   };

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-bold">SWAR Round - Section 1</h1>

// //       {loading && <p>Loading questions...</p>}
// //       {error && <p className="text-red-500">{error}</p>}

// //       {!loading && !error && questions.length > 0 && (
// //         <div className="mt-6 p-4 border border-blue-500 rounded-lg">
// //           {/* 🔹 Display Question */}
// //           <h2 className="text-lg font-semibold mb-4">
// //             {`Q${activeQuestionIndex + 1}: ${questions[activeQuestionIndex].question}`}
// //           </h2>

// //           {/* 🎤 Voice Recording */}
// //           <button
// //             onClick={startRecording}
// //             className="bg-blue-500 text-white px-4 py-2 rounded mt-4 flex items-center"
// //           >
// //             🎤 {isRecording ? "Listening..." : "Start Speaking"}
// //           </button>

// //           {/* 🎵 Animated Sound Wave (Realistic Listening Effect) */}
// //           {isRecording && (
// //             <div className="flex justify-center mt-4">
// //               <div className="flex space-x-2">
// //                 <div className="h-6 w-2 bg-green-500 animate-wave"></div>
// //                 <div className="h-8 w-2 bg-green-500 animate-wave delay-100"></div>
// //                 <div className="h-5 w-2 bg-green-500 animate-wave delay-200"></div>
// //                 <div className="h-7 w-2 bg-green-500 animate-wave delay-300"></div>
// //                 <div className="h-6 w-2 bg-green-500 animate-wave delay-400"></div>
// //               </div>
// //             </div>
// //           )}

// //           {/* 📄 Display Recorded Answer */}
// //           {userAnswer && <p className="mt-4">📝 Your Answer: {userAnswer}</p>}

// //           {/* ✅ Submit Answer Button */}
// //           <button
// //             onClick={handleSubmitAnswer}
// //             className="bg-green-500 text-white px-4 py-2 rounded mt-4"
// //           >
// //             Submit Answer
// //           </button>
// //         </div>
// //       )}

// //       {/* 🔹 Tailwind CSS Animations */}
// //       <style>
// //         {`
// //           @keyframes wave {
// //             0%, 100% { transform: scaleY(1); }
// //             50% { transform: scaleY(1.8); }
// //           }

// //           .animate-wave {
// //             animation: wave 0.6s infinite alternate ease-in-out;
// //           }

// //           .delay-100 { animation-delay: 0.1s; }
// //           .delay-200 { animation-delay: 0.2s; }
// //           .delay-300 { animation-delay: 0.3s; }
// //           .delay-400 { animation-delay: 0.4s; }
// //         `}
// //       </style>
// //     </div>
// //   );
// // }

// // export default SwarRound;
/////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // ✅ For navigation

// function SwarRound() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [isRecording, setIsRecording] = useState(false);
//   const [currentSection, setCurrentSection] = useState(1); // ✅ Start from Section 1
//   const navigate = useNavigate(); // ✅ Navigation hook

//   // ✅ Fetch all questions for the current section
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4001/api/swar/fetchQuestions?section=${currentSection}`);
//         if (!response.data || response.data.length === 0) {
//           throw new Error("No questions available.");
//         }
//         setQuestions(response.data);
//         setActiveQuestionIndex(0); // Reset index for new section
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [currentSection]); // ✅ Runs when section changes

//   // ✅ Convert Speech to Text
//   const startRecording = () => {
//     if ("webkitSpeechRecognition" in window) {
//       setIsRecording(true);
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.continuous = false;
//       recognition.interimResults = false;
//       recognition.lang = "en-US";

//       recognition.onresult = (event) => {
//         setUserAnswer(event.results[0][0].transcript);
//         setIsRecording(false);
//       };

//       recognition.onerror = (event) => {
//         console.error("Speech Recognition Error:", event.error);
//         setIsRecording(false);
//       };

//       recognition.start();
//     } else {
//       alert("Speech Recognition is not supported in this browser.");
//     }
//   };

//   // ✅ Handle answer submission & move to next section
//   const handleSubmitAnswer = async () => {
//     if (!userAnswer) {
//       alert("Please speak your answer before submitting.");
//       return;
//     }

//     try {
//       const currentQuestion = questions[activeQuestionIndex];

//       await axios.post("http://localhost:4001/api/swar/submitAnswer", {
//         questionId: currentQuestion._id,
//         section: currentSection,
//         userAnswer,
//       });

//       alert("✅ Answer submitted successfully!");

//       if (activeQuestionIndex < questions.length - 1) {
//         // ✅ Move to next question
//         setUserAnswer("");
//         setActiveQuestionIndex((prevIndex) => prevIndex + 1);
//       } else {
//         // ✅ Move to next section
//         if (currentSection < 4) {
//           setCurrentSection((prevSection) => prevSection + 1);
//         } else {
//           alert("🎉 SWAR Round Completed! ✅");
//           navigate("/swarfeedback"); // ✅ Move to Feedback page
//         }
//       }
//     } catch (error) {
//       console.error("❌ Error submitting answer:", error);
//       alert("Failed to submit answer.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">SWAR Round - Section {currentSection}</h1>

//       {loading && <p>Loading questions...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && questions.length > 0 && (
//         <div className="mt-6 p-4 border border-blue-500 rounded-lg">
//           {/* 🔹 Display Question */}
//           <h2 className="text-lg font-semibold mb-4">
//             {`Q${activeQuestionIndex + 1}: ${questions[activeQuestionIndex].question}`}
//           </h2>

//           {/* 🎤 Voice Recording */}
//           <button
//             onClick={startRecording}
//             className="bg-blue-500 text-white px-4 py-2 rounded mt-4 flex items-center"
//           >
//             🎤 {isRecording ? "Listening..." : "Start Speaking"}
//           </button>

//           {/* 🎵 Animated Sound Wave (Realistic Listening Effect) */}
//           {isRecording && (
//             <div className="flex justify-center mt-4">
//               <div className="flex space-x-2">
//                 <div className="h-6 w-2 bg-green-500 animate-wave"></div>
//                 <div className="h-8 w-2 bg-green-500 animate-wave delay-100"></div>
//                 <div className="h-5 w-2 bg-green-500 animate-wave delay-200"></div>
//                 <div className="h-7 w-2 bg-green-500 animate-wave delay-300"></div>
//                 <div className="h-6 w-2 bg-green-500 animate-wave delay-400"></div>
//               </div>
//             </div>
//           )}

//           {/* 📄 Display Recorded Answer */}
//           {userAnswer && <p className="mt-4">📝 Your Answer: {userAnswer}</p>}

//           {/* ✅ Submit Answer Button */}
//           <button
//             onClick={handleSubmitAnswer}
//             className="bg-green-500 text-white px-4 py-2 rounded mt-4"
//           >
//             Submit Answer
//           </button>
//         </div>
//       )}

//       {/* 🔹 Tailwind CSS Animations */}
//       <style>
//         {`
//           @keyframes wave {
//             0%, 100% { transform: scaleY(1); }
//             50% { transform: scaleY(1.8); }
//           }

//           .animate-wave {
//             animation: wave 0.6s infinite alternate ease-in-out;
//           }

//           .delay-100 { animation-delay: 0.1s; }
//           .delay-200 { animation-delay: 0.2s; }
//           .delay-300 { animation-delay: 0.3s; }
//           .delay-400 { animation-delay: 0.4s; }
//         `}
//       </style>
//     </div>
//   );
// }

// export default SwarRound;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function SwarRound() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [currentSection, setCurrentSection] = useState(1);
//   const [storyPlayed, setStoryPlayed] = useState(false); // ✅ Control Story Listening
//   const navigate = useNavigate();

//   // ✅ Fetch questions based on section
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4001/api/swar/fetchQuestions?section=${currentSection}`);
//         if (!response.data || response.data.length === 0) {
//           throw new Error("No questions available.");
//         }
//         setQuestions(response.data);
//         setActiveQuestionIndex(0);
//         setStoryPlayed(false); // ✅ Reset story listening for Section 4
//       } catch (err) {
//         console.error("Error fetching questions:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [currentSection]);

//   // ✅ Convert Speech to Text (Section 1)
//   const startRecording = () => {
//     if ("webkitSpeechRecognition" in window) {
//       setIsRecording(true);
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.continuous = false;
//       recognition.interimResults = false;
//       recognition.lang = "en-US";

//       recognition.onresult = (event) => {
//         setUserAnswer(event.results[0][0].transcript);
//         setIsRecording(false);
//       };

//       recognition.onerror = (event) => {
//         console.error("Speech Recognition Error:", event.error);
//         setIsRecording(false);
//       };

//       recognition.start();
//     } else {
//       alert("Speech Recognition is not supported in this browser.");
//     }
//   };

//   // ✅ Handle answer submission
//   const handleSubmitAnswer = async () => {
//     let finalAnswer = currentSection === 1 ? userAnswer : selectedOption;
//     if (!finalAnswer) {
//       alert("Please provide an answer before submitting.");
//       return;
//     }

//     try {
//       const currentQuestion = questions[activeQuestionIndex];

//       await axios.post("http://localhost:4001/api/swar/submitAnswer", {
//         questionId: currentQuestion._id,
//         section: currentSection,
//         userAnswer: finalAnswer,
//       });

//       alert("✅ Answer submitted successfully!");

//       if (activeQuestionIndex < questions.length - 1) {
//         // ✅ Move to next question
//         setUserAnswer("");
//         setSelectedOption(null);
//         setActiveQuestionIndex((prevIndex) => prevIndex + 1);
//       } else {
//         // ✅ Move to next section
//         if (currentSection < 4) {
//           setCurrentSection((prevSection) => prevSection + 1);
//         } else {
//           alert("🎉 SWAR Round Completed! ✅");
//           navigate("/swarfeedback");
//         }
//       }
//     } catch (error) {
//       console.error("❌ Error submitting answer:", error);
//       alert("Failed to submit answer.");
//     }
//   };

//   // ✅ Listen to Story (Only once) - Section 4
//   const handleListenStory = () => {
//     if ("speechSynthesis" in window && !storyPlayed) {
//       const story = questions[0]?.storySummary; // ✅ Fetch story from first question
//       if (story) {
//         const utterance = new SpeechSynthesisUtterance(story);
//         utterance.onend = () => setStoryPlayed(true); // ✅ Hide story after playing
//         window.speechSynthesis.speak(utterance);
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">SWAR Round - Section {currentSection}</h1>

//       {loading && <p>Loading questions...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && questions.length > 0 && (
//         <div className="mt-6 p-4 border border-blue-500 rounded-lg">
//           {/* 🔹 Display Question (Except in Section 4 before listening) */}
//           {(currentSection !== 4 || storyPlayed) && (
//             <h2 className="text-lg font-semibold mb-4">
//               {`Q${activeQuestionIndex + 1}: ${questions[activeQuestionIndex].question}`}
//             </h2>
//           )}

//           {/* 🔹 Section 1 - Speech to Text */}
//           {currentSection === 1 && (
//             <>
//               <button onClick={startRecording} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 flex items-center">
//                 🎤 {isRecording ? "Listening..." : "Start Speaking"}
//               </button>

//               {/* 🎵 Animated Sound Wave */}
//               {isRecording && (
//                 <div className="flex justify-center mt-4">
//                   <div className="flex space-x-2">
//                     <div className="h-6 w-2 bg-green-500 animate-wave"></div>
//                     <div className="h-8 w-2 bg-green-500 animate-wave delay-100"></div>
//                     <div className="h-5 w-2 bg-green-500 animate-wave delay-200"></div>
//                     <div className="h-7 w-2 bg-green-500 animate-wave delay-300"></div>
//                     <div className="h-6 w-2 bg-green-500 animate-wave delay-400"></div>
//                   </div>
//                 </div>
//               )}

//               {userAnswer && <p className="mt-4">📝 Your Answer: {userAnswer}</p>}
//             </>
//           )}

//           {/* 🔹 Sections 2, 3, 4 - MCQ Options */}
//           {(currentSection === 2 || currentSection === 3 || (currentSection === 4 && storyPlayed)) &&
//             questions[activeQuestionIndex]?.options && (
//               <div className="mt-4">
//                 {questions[activeQuestionIndex].options.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedOption(option)}
//                     className={`block w-full px-4 py-2 mt-2 border rounded ${
//                       selectedOption === option ? "bg-green-500 text-white" : "bg-gray-200"
//                     }`}
//                   >
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             )}

//           {/* 🔹 Section 4 - Listen to Story Once */}
//           {currentSection === 4 && !storyPlayed && (
//             <button onClick={handleListenStory} className="bg-purple-500 text-white px-4 py-2 rounded mt-4">
//               🎧 Listen to Story
//             </button>
//           )}

//           {/* ✅ Submit Answer Button */}
//           {(currentSection !== 4 || storyPlayed) && (
//             <button onClick={handleSubmitAnswer} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
//               Submit Answer
//             </button>
//           )}
//         </div>
//       )}

//       <style>
//         {`
//           @keyframes wave {
//             0%, 100% { transform: scaleY(1); }
//             50% { transform: scaleY(1.8); }
//           }
//           .animate-wave {
//             animation: wave 0.6s infinite alternate ease-in-out;
//           }
//           .delay-100 { animation-delay: 0.1s; }
//           .delay-200 { animation-delay: 0.2s; }
//           .delay-300 { animation-delay: 0.3s; }
//           .delay-400 { animation-delay: 0.4s; }
//         `}
//       </style>
//     </div>
//   );
// }

// export default SwarRound;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam"; // 📷 Import Webcam
import "../index.css"; // Import CSS for animations and styling

function SwarRound() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [sectionCompleted, setSectionCompleted] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [allSectionsCompleted, setAllSectionsCompleted] = useState(false);
  const [questionPlayed, setQuestionPlayed] = useState({});
  const navigate = useNavigate();

  // ✅ Fetch questions based on the selected section
  useEffect(() => {
    if (currentSection === null|| !cameraEnabled) return;

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:4001/api/swar/fetchQuestions?section=${currentSection}`);
        if (!response.data || response.data.length === 0) {
          throw new Error("No questions available.");
        }
        setQuestions(response.data);
        setActiveQuestionIndex(0);
        setQuestionPlayed({});
        setUserAnswer(""); // ✅ Reset answer input
        setSectionCompleted(false); // Reset section completion status
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [currentSection, cameraEnabled]);

  // ✅ Enable Camera
  const enableCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setCameraEnabled(true);
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("⚠ Please allow camera access to continue.");
    }
  };

  // ✅ Play Question (For Section 4) - Allow Listening Per Question
  const handlePlayQuestion = () => {
    if ("speechSynthesis" in window && !questionPlayed[activeQuestionIndex]) {
      setIsListening(true);
      const sentence = questions[activeQuestionIndex]?.correctAnswer;
      if (sentence) {
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.onend = () => {
          setQuestionPlayed((prev) => ({ ...prev, [activeQuestionIndex]: true }));
          setIsListening(false);
        };
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // ✅ Speech to Text (For Section 1 & Section 4)
  const startRecording = () => {
    if ("webkitSpeechRecognition" in window) {
      setIsSpeaking(true);
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        setUserAnswer(event.results[0][0].transcript);
        setIsSpeaking(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsSpeaking(false);
      };

      recognition.start();
    } else {
      alert("Speech Recognition is not supported in this browser.");
    }
  };

  // ✅ Submit Answer
  const handleSubmitAnswer = async () => {
    let finalAnswer = currentSection === 2 || currentSection === 3 ? selectedOption : userAnswer;
    if (!finalAnswer) {
      alert("Please provide an answer before submitting.");
      return;
    }

    try {
      const currentQuestion = questions[activeQuestionIndex];

      await axios.post("http://localhost:4001/api/swar/submitAnswer", {
        questionId: currentQuestion._id,
        section: currentSection,
        userAnswer: finalAnswer,
      });

      alert("✅ Answer submitted successfully!");

      if (activeQuestionIndex < questions.length - 1) {
        setUserAnswer("");
        setSelectedOption(null);
        setActiveQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // ✅ Mark section as completed
        setSectionCompleted(true);
        alert("🎉 Section Completed!");

        // ✅ Check if all sections are completed
        if (currentSection === 4) {
          setAllSectionsCompleted(true);
          navigate("/feedback"); // Navigate to feedback page
        }
      }
    } catch (error) {
      console.error("❌ Error submitting answer:", error);
      alert("Failed to submit answer.");
    }
  };

  return (
    <div className="p-6 swar-container">
      
      <h1 className="text-2xl font-bold swar-title">SWAR Round</h1>

      {!cameraEnabled && (
          <button
            onClick={enableCamera}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4 block"
          >
            📷 Enable Camera to Start
          </button>
        )}

        {/* ✅ Section Selection Dropdown */}
        {cameraEnabled && (
      <div className="mt-4 swar-section-selector">
        <label className="font-semibold">Select Section:</label>
        <select
          value={currentSection || ""}
          onChange={(e) => setCurrentSection(Number(e.target.value))}
          className="border p-2 ml-2 swar-select"
          disabled={currentSection !== null && !sectionCompleted} // Disable if a section is selected and not completed
        >
          <option value="" disabled>Select a section</option>
          <option value={1}>Section 1 - Speaking</option>
          <option value={2}>Section 2 - MCQ</option>
          <option value={3}>Section 3 - MCQ</option>
          <option value={4}>Section 4 - Sentence Repetition</option>
        </select>
      </div>
      )}

      {loading && <p>Loading questions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Display Questions for All Sections */}
      {currentSection && !loading && !error && questions.length > 0 && (
        <div className="mt-6 p-4 border border-blue-500 rounded-lg swar-question-container">
          {/* ✅ Display Question (Disabled in Section 4) */}
          <h2 className="text-lg font-semibold mb-4 swar-question-title">
            {currentSection === 4 ? `Question ${activeQuestionIndex + 1}` : `Q${activeQuestionIndex + 1}: ${questions[activeQuestionIndex].question}`}
          </h2>

          {/* ✅ Section 4 - Listen to Sentence (Once Per Question) */}
          {currentSection === 4 && !questionPlayed[activeQuestionIndex] && (
            <button onClick={handlePlayQuestion} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 block swar-button">
              🎧 Listen to Sentence
            </button>
          )}

          {/* ✅ Start Speaking Button for Section 1 & Section 4 (After Listening) */}
          {(currentSection === 1 || (currentSection === 4 && questionPlayed[activeQuestionIndex])) && (
            <button onClick={startRecording} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 block swar-button">
              🎤 Start Speaking
            </button>
          )}

          {/* ✅ Listening & Speaking Animation */}
          {(isListening || isSpeaking) && <div className="wave-animation blue mt-4"></div>}

          {/* ✅ Show User Answer in Section 1 */}
          {currentSection === 1 && userAnswer && (
            <p className="mt-4 bg-gray-100 p-2 rounded-lg border swar-answer">📝 Your Answer: {userAnswer}</p>
          )}

          {/* ✅ MCQ Options for Section 2, 3, & 4 (After Listening) */}
          {(currentSection === 2 || currentSection === 3 || (currentSection === 4 && questionPlayed[activeQuestionIndex])) &&
            questions[activeQuestionIndex]?.options && (
              <div className="mt-4 swar-options-container">
                {questions[activeQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(option)}
                    className={`block w-full px-4 py-2 mt-2 border rounded ${
                      selectedOption === option ? "bg-green-500 text-white" : "bg-gray-200"
                    } swar-option-button`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

          {/* ✅ Submit Answer */}
          <button onClick={handleSubmitAnswer} className="bg-green-500 text-white px-4 py-2 rounded mt-4 swar-button">
            Submit Answer
          </button>
        </div>
      )}
      {/* ✅ Right Side: Camera Card */}
      <div className="w-1/4 p-4 border border-gray-300 rounded-lg shadow-lg">
        {cameraEnabled ? (
          <Webcam className="w-full rounded-lg" />
        ) : (
          <p className="text-gray-500">📷 Camera is required to continue.</p>
        )}
      </div>
    </div>
    
  );
}

export default SwarRound;
