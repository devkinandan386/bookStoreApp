import React, { useState, useEffect } from "react";
import axios from "axios";

const InterviewLayout = () => {
  const [submittedResponses, setSubmittedResponses] = useState([]);

  useEffect(() => {
    const fetchSubmittedResponses = async () => {
      try {
        const response = await axios.get(
          "https://bookstoreapp-backend-f2em.onrender.com/interview/user-responses?userId=123"
        );
        setSubmittedResponses(response.data);
      } catch (error) {
        console.error("Error fetching submitted responses:", error);
      }
    };
    fetchSubmittedResponses();
  }, []);

  const playVideo = (videoPath) => {
    window.open(`https://bookstoreapp-backend-f2em.onrender.com/${videoPath}`, "_blank");
  };

  return (
    <div style={styles.container}>
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
