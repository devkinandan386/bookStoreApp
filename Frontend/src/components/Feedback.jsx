import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function AddNewInterview() {
  const location = useLocation();
  const { feedback = [] } = location.state || {};
  const [userRating, setUserRating] = useState(0);
  const [userFeedback, setUserFeedback] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("success");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleSubmit = () => {
    if (userRating === 0 || userFeedback.trim() === "") {
      setSnackMessage("Please provide a rating and feedback before proceeding.");
      setSnackSeverity("error");
      setSnackOpen(true);
      return;
    }

    setIsSubmitted(true);
    setSnackMessage("Feedback submitted successfully!");
    setSnackSeverity("success");
    setSnackOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 flex flex-col items-center min-h-screen"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl p-6 rounded-lg shadow-xl mt-4 border-4 border-yellow-500 backdrop-blur-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 animate-pulse">
          Interview Feedback
        </h2>

        {Array.isArray(feedback) && feedback.length > 0 ? (
          feedback.map((item, index) => (
            <div key={index} className="mb-6 border-b pb-4">
              <h3 className="font-bold text-lg text-indigo-700 mb-1">
                Q{index + 1}: {item.question}
              </h3>
              <p className="text-gray-800 mb-1">
                <strong>Your Answer:</strong> {item.answer}
              </p>
              <p className="text-green-700">
                <strong>Suggestion:</strong> {item.feedback}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No feedback available for this interview.</p>
        )}

        <div className="mt-6 text-center">
          <h3 className="font-semibold text-lg text-indigo-600">Your Overall Rating:</h3>
          <div className="flex justify-center space-x-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                onClick={() => handleRatingChange(star)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`text-3xl transition-transform duration-200 ${
                  userRating >= star ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                {userRating >= star ? "★" : "☆"}
              </motion.button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Write your overall feedback here..."
          className="w-full border p-3 rounded mt-5 shadow-md focus:ring-2 focus:ring-blue-500"
          value={userFeedback}
          onChange={(e) => setUserFeedback(e.target.value)}
        ></textarea>

        <div className="mt-6 flex flex-col space-y-3">
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700 w-full text-lg font-semibold shadow-lg"
          >
            Submit Feedback
          </motion.button>

          <motion.button
            onClick={() => isSubmitted && navigate("/")}
            disabled={!isSubmitted}
            whileHover={isSubmitted ? { scale: 1.1 } : {}}
            whileTap={isSubmitted ? { scale: 0.9 } : {}}
            className={`py-3 px-6 rounded w-full text-lg font-semibold shadow-lg transition-colors duration-300 ${
              isSubmitted
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Go Home
          </motion.button>
        </div>
      </motion.div>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default AddNewInterview;
