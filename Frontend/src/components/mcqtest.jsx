import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import Navbar from "./Navbar"; // Adjust the path based on Navbar location

function MCQTest() {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);

  // Fetch questions from the backend
  useEffect(() => {
    if (isTestStarted) {
      axios
        .get("http://localhost:4001/mcqtest")
        .then((response) => {
          setQuestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
        });
    }
  }, [isTestStarted]);

  const handleStartTest = () => {
    setIsTestStarted(true);
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmitSection = (section) => {
    const startIndex = (section - 1) * 20;
    const endIndex = section * 20;

    // Get the questions for the current section
    const sectionQuestions = questions.slice(startIndex, endIndex);

    // Check if the user has answered at least one question in the section
    const unansweredQuestions = sectionQuestions.filter(
      (question) => !userAnswers[question.id]
    );

    if (unansweredQuestions.length === sectionQuestions.length) {
      // If no questions are answered, show a SweetAlert
      Swal.fire({
        icon: "warning",
        title: "😞 No Answers Attempted",
        text: "Please attempt at least one question before submitting the section.",
        confirmButtonText: "Got it!",
        confirmButtonColor: "#3085d6", // Attractive color
        background: "#fff3cd", // Soft background for better visibility
        iconColor: "#d39e00", // Warning icon color
        showCancelButton: false,
      });
      return; // Don't proceed with submission if no answers are selected
    }

    // Calculate the score for the section
    const sectionScore = sectionQuestions.reduce((acc, question) => {
      if (userAnswers[question.id] === question.answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(sectionScore);
    setIsSubmitted(true); // Mark the section as submitted

    // Prevent scoring from affecting other sections
    setUserAnswers((prevAnswers) => {
      const sectionAnswers = {};
      sectionQuestions.forEach((question) => {
        sectionAnswers[question.id] = prevAnswers[question.id];
      });
      return sectionAnswers;
    });
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setCurrentSection(1); // Reset section to first
    setIsTestStarted(false); // Reset test visibility
  };

  const renderSectionNavigation = () => {
    const totalSections = Math.ceil(questions.length / 20);
    const sections = [];

    for (let i = 1; i <= totalSections; i++) {
      sections.push(
        <button
          key={i}
          onClick={() => setCurrentSection(i)}
          className={`px-4 py-2 m-2 ${
            currentSection === i
              ? "bg-blue-600 text-white"
              : "bg-pink-300 text-black"
          } rounded-lg text-xl font-bold hover:bg-blue-700 transition duration-300`}
        >
          🏆 Section {i}
        </button>
      );
    }

    return sections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 py-10">
      {/* Navbar */}
      <Navbar /> {/* Import your Navbar component */}

      {!isTestStarted ? (
        <div className="text-center mt-20">
          <h1 className="text-4xl font-extrabold mb-6 text-white">
            🎉 Welcome to the Fun MCQ Test!
          </h1>
          <p className="text-xl text-white mb-4">
            Are you ready to challenge yourself? Test your knowledge now! 🌟
          </p>
          <button
            onClick={handleStartTest}
            className="px-8 py-4 bg-yellow-500 text-white text-lg rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            🚀 Start the Test
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-14">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            MCQ Test - Section {currentSection} 🚀
          </h1>

          {/* Render Section Navigation */}
          <div className="text-center mb-6">{renderSectionNavigation()}</div>

          {/* Show the current section's questions */}
          {!isSubmitted ? (
            <div>
              {questions
                .slice((currentSection - 1) * 20, currentSection * 20)
                .map((question) => (
                  <div
                    key={question.id}
                    className="mb-6 transition duration-500 ease-in-out transform hover:scale-105"
                  >
                    <h2 className="text-xl font-semibold text-blue-600">
                      {question.id}. {question.question} 🤔
                    </h2>
                    <div className="mt-4">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center mb-4 transition duration-300 transform hover:scale-105"
                        >
                          <input
                            type="radio"
                            id={`option-${question.id}-${index}`}
                            name={`question-${question.id}`}
                            value={option}
                            checked={userAnswers[question.id] === option}
                            onChange={() =>
                              handleOptionChange(question.id, option)
                            }
                            className={`mr-3 w-6 h-6 text-blue-600 bg-gray-100 border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 transition duration-300 ${
                              userAnswers[question.id] === option
                                ? "checked:bg-blue-600"
                                : ""
                            }`}
                          />
                          <label
                            htmlFor={`option-${question.id}-${index}`}
                            className="text-base cursor-pointer transition duration-300 hover:text-blue-600"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              <button
                onClick={() => handleSubmitSection(currentSection)}
                className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600 transition duration-300"
              >
                Submit Section {currentSection} ✅
              </button>
            </div>
          ) : (
            <div className="text-center">
              {score === 0 ? (
                <div>
                  <h2 className="text-3xl font-bold text-red-600 mb-4">
                    🏆 Oh no! You got 0 points! 😢
                  </h2>
                  <img
                    src="https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif"
                    alt="Trophy Taken"
                    className="mx-auto"
                  />
                </div>
              ) : (
                <h2 className="text-3xl font-bold text-purple-600 mb-4">
                  🎯 Your Score: {score} / 20
                </h2>
              )}
              {questions
                .slice((currentSection - 1) * 20, currentSection * 20)
                .map((question) => (
                  <div key={question.id} className="mt-6 text-left">
                    <h3 className="text-lg font-semibold text-blue-600">
                      {question.id}. {question.question} 🏅
                    </h3>
                    <p
                      className={`${
                        userAnswers[question.id] === question.answer
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Your Answer: {userAnswers[question.id] || "Not Answered"}{" "}
                      {userAnswers[question.id] === question.answer ? "✅" : "❌"}
                    </p>
                    {userAnswers[question.id] !== question.answer && (
                      <p className="text-gray-600">
                        Correct Answer: {question.answer} 🎉
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}

          {/* Reset Button */}
          <div className="text-center mt-6">
            <button
              onClick={handleReset}
              className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300"
            >
              🔄 Reset Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MCQTest;
