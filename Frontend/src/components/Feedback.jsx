import React from "react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const feedback = Math.floor(Math.random() * 10) + 1; // Mock rating

  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
      <p>Your overall interview rating: {feedback} out of 10</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Go Home
      </button>
    </div>
  );
};

export default Feedback;
