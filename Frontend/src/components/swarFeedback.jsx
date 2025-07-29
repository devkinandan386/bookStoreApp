import React, { useState } from "react";
import axios from "axios";

function SwarFeedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (star) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      await axios.post("http://localhost:4001/api/submitFeedback", {
        rating,
        comment,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback.");
    }
  };

  return (
    <div style={styles.container}>
      {submitted ? (
        <h2 style={styles.thankYou}>🎉 Thank You for Your Feedback! 🎉</h2>
      ) : (
        <div style={styles.form}>
          <h2>SWAR Round Feedback</h2>

          {/* Star Rating */}
          <div style={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  color: star <= rating ? "gold" : "gray",
                }}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {/* Comment Box */}
          <textarea
            placeholder="Write your feedback here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={styles.textarea}
          ></textarea>

          {/* Submit Button */}
          <button onClick={handleSubmit} style={styles.button}>
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
}

// Inline CSS Styles
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    background: "#f5f5f5",
    borderRadius: "10px",
    width: "50%",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  rating: {
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "18px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  thankYou: {
    fontSize: "24px",
    color: "green",
  },
};

export default SwarFeedback;
