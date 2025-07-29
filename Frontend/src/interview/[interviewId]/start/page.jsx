import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RecordAnswerSection from "../../../components/RecordAnswerSection";

function StartInterview() {
  const { interviewId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [unlockedQuestions, setUnlockedQuestions] = useState([true]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:4001/mockinterview/${interviewId}`);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format (not JSON). Check backend.");
        }

        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }

        const data = await response.json();
        setQuestions(data.questions || []);
        setUnlockedQuestions([true, ...Array(data.questions.length - 1).fill(false)]); // Unlock first question only
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (interviewId) {
      fetchQuestions();
    }
  }, [interviewId]);

  // Unlock the next question after submission
  // const unlockNextQuestion = (index) => {
  //   setUnlockedQuestions((prev) => {
  //     const newUnlocked = [...prev];
  //     newUnlocked[index + 1] = true;
  //     return newUnlocked;
  //   });
  //   setActiveQuestionIndex(index + 1);
  // };
  const unlockNextQuestion = (index) => {
    setUnlockedQuestions((prev) => {
      const newUnlocked = [...prev];
      if (index + 1 < newUnlocked.length) {
        newUnlocked[index + 1] = true; // Unlock next question
      }
      return newUnlocked;
    });
    setActiveQuestionIndex(index + 1);
  };  

  const handleListenClick = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(questions[activeQuestionIndex]?.question);
      window.speechSynthesis.cancel(); 
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left Side - Questions List */}
      <div className="w-full md:w-1/2 p-6 bg-gray-100 overflow-y-auto h-screen no-scrollbar">
        {!loading && !error && questions.length > 0 && (
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 space-y-4">
            <h2 className="text-xl font-semibold mb-4">Select a Question</h2>
            
            <div className="flex flex-wrap md:flex-nowrap gap-4 overflow-x-auto">
              {questions.map((q, index) => (
                <div
                  key={index}
                  onClick={() => unlockedQuestions[index] && setActiveQuestionIndex(index)}
                  className={`cursor-pointer py-2 px-4 rounded-lg ${
                    index === activeQuestionIndex ? "bg-blue-500 text-white" : unlockedQuestions[index] ? "bg-gray-200" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {`Question ${index + 1}`}
                </div>
              ))}
            </div>

            {questions[activeQuestionIndex] && (
              <div className="mt-6 p-4 border border-blue-500 rounded-lg">
                <h3 className="text-lg pb-3 font-semibold">
                  {`Q${activeQuestionIndex + 1}: ${questions[activeQuestionIndex].question}`}
                </h3>

                <button
                  onClick={handleListenClick}
                  className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all"
                >
                  🔊
                </button>

                <div className="bg-sky-100 border-4 border-blue-500 shadow-md rounded-lg p-6 mt-4">
                  <h2 className="text-lg font-semibold mb-2 text-blue-700">Note:</h2>
                  <p className="text-blue-700 text-sm md:text-md">
                    Click on "Record Answer" to answer the question. You must submit an answer to unlock the next question.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side - Video/Audio Recording */}
      <div className="w-full md:w-1/2 p-6 bg-white flex flex-col items-center justify-center">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Video/Audio Recording</h2>
          <RecordAnswerSection 
            totalQuestions={questions.length}
            currentQuestionIndex={activeQuestionIndex}
            unlockNextQuestion={unlockNextQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
