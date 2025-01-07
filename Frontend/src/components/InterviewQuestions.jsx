import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function InterviewQuestions() {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    // Fetching the JSON file (assuming it's located in public folder or a server endpoint)
    fetch('list3.json') // Adjust the path as per your file location
      .then((response) => response.json())
      .then((data) => setQuestionsAndAnswers(data))
      .catch((error) => console.error("Error fetching the JSON file:", error));
  }, []);

  const handleQuestionClick = (section, index) => {
    setSelectedAnswer(selectedAnswer === `${section}-${index}` ? null : `${section}-${index}`);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-200 to-purple-300 p-20">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Interview Questions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(questionsAndAnswers).map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-lg px-4 py-2 mb-4 text-center">
                {section}
              </h2>
              <div className="space-y-4">
                {questionsAndAnswers[section].map((qa, index) => (
                  <div key={index} className="border-b border-gray-300 pb-2">
                    <div
                      className="text-lg font-medium cursor-pointer hover:text-purple-600 text-blue-600"
                      onClick={() => handleQuestionClick(section, index)}
                    >
                      Q{index + 1}: {qa.question}
                    </div>
                    {selectedAnswer === `${section}-${index}` && (
                      <div className="mt-2 bg-gray-100 p-3 rounded-md">
                        <span className="font-semibold text-red-600">Answer:</span>
                        <span className="text-green-600">{qa.answer}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
