import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const InterviewLayout = () => {
  // ... your existing state & effects for questions, timer, etc.

  const [submittedResponses, setSubmittedResponses] = useState([]);

  // Fetch submitted responses when the page loads.
  useEffect(() => {
    const fetchSubmittedResponses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/interview/responses?userId=123" // adjust userId accordingly
        );
        setSubmittedResponses(response.data);
      } catch (error) {
        console.error("Error fetching submitted responses:", error);
      }
    };
    fetchSubmittedResponses();
  }, []);

  const playVideo = (videoPath) => {
    // If you have video answers, you can play them here.
    // For text answers, you might not need this function.
    window.open(`http://localhost:4001/${videoPath}`, "_blank");
  };

  return (
    <div style={styles.container}>
      {/* ... Your existing interview questions and recording sections */}

      {/* Submitted Responses Section */}
      {submittedResponses.length > 0 && (
        <div style={styles.responsesSection}>
          <h2 style={styles.header}>Your Submitted Responses</h2>
          {submittedResponses.map((response, index) => (
            <div key={index} style={styles.responseItem}>
              <p style={styles.responseText}>
                <strong>Question {response.questionId}:</strong>
              </p>
              <p>
                <strong>Answer:</strong> {response.answer}
              </p>
              <p>
                <strong>Feedback:</strong> {response.feedback}
              </p>
              <p>
                <strong>Rating:</strong> {response.rating}
              </p>
              {response.videoPath && (
                <button
                  onClick={() => playVideo(response.videoPath)}
                  style={styles.playButton}
                >
                  Play Video Answer
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
  },
  responsesSection: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    borderLeft: "1px solid #ddd",
  },
  header: {
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
    fontSize: "20px",
  },
  responseItem: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#f1f1f1",
  },
  responseText: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  playButton: {
    padding: "8px 12px",
    backgroundColor: "#2196f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default InterviewLayout;
