import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const InterviewLayout = () => {
  const firstQuestion = { question: "Tell me about yourself." };
  
  const [questions, setQuestions] = useState(() => {
    const storedQuestions = localStorage.getItem('questions');
    return storedQuestions ? JSON.parse(storedQuestions) : [firstQuestion];
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    return parseInt(localStorage.getItem('currentQuestionIndex')) || 0;
  });
  const [attemptedQuestions, setAttemptedQuestions] = useState(new Set());
  const [submittedResponses, setSubmittedResponses] = useState([]);
  const videoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [timer, setTimer] = useState(() => {
    return parseInt(localStorage.getItem('timer')) || 1680; // 28 minutes in seconds
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackCard, setShowFeedbackCard] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (questions.length === 1) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get('http://localhost:4001/interview/questions');
          const remainingQuestions = response.data.sort(() => Math.random() - 0.5).slice(0, 19);
          const allQuestions = [firstQuestion, ...remainingQuestions];
          setQuestions(allQuestions);
          localStorage.setItem('questions', JSON.stringify(allQuestions));
        } catch (error) {
          console.error('Error fetching questions:', error);
        }
      };
      fetchQuestions();
    }
  }, [questions]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown);
          finalSubmit(); // Automatically submit when timer reaches 0
          return 0;
        }
        const newTimer = prevTimer - 1;
        localStorage.setItem('timer', newTimer);
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        setVideoBlob((prevBlob) => {
          if (prevBlob) {
            return new Blob([prevBlob, event.data], { type: 'video/webm' });
          }
          return new Blob([event.data], { type: 'video/webm' });
        });
      };

      recorder.onstop = () => {
        setIsVideoReady(true);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing camera and microphone:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const submitAnswer = () => {
    if (videoBlob) {
      const formData = new FormData();
      formData.append('video', videoBlob);
      formData.append('userId', '123'); // Replace with actual user ID
      formData.append('questionId', questions[currentQuestionIndex]._id); // Replace with actual question ID

      axios.post('http://localhost:4001/interview/response', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          alert('Answer submitted successfully!', 'success');
          setIsVideoReady(false);
          setAttemptedQuestions(new Set([...attemptedQuestions, currentQuestionIndex]));
          handleNextQuestion();
        })
        .catch((error) => {
          console.error('Error submitting video:', error);
        });
    } else {
      alert('No video recorded to submit.', 'warning');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      localStorage.setItem('currentQuestionIndex', newIndex);
      resetRecordingState();
    } else {
      alert('This is the last question. You can now finalize the interview.', 'info');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      localStorage.setItem('currentQuestionIndex', newIndex);
      resetRecordingState();
    } else {
      alert('This is the first question.', 'warning');
    }
  };

  const finalSubmit = async () => {
    if (attemptedQuestions.size === 0) {
      alert('No questions have been attempted. Please attempt at least one question before final submission.', 'warning');
    } else {
      alert('Interview completed. All answers have been successfully submitted.', 'success');
      localStorage.removeItem('currentQuestionIndex');
      localStorage.removeItem('timer');
      localStorage.removeItem('questions');
      fetchSubmittedResponses();
      fetchFeedback(); // Fetch interviewer feedback
      setShowFeedbackCard(true); // Display feedback card
      setIsModalOpen(true); // Open the modal to display feedback
    }
  };

  const fetchSubmittedResponses = async () => {
    try {
      const response = await axios.get('http://localhost:4001/interview/responses?userId=123'); // Replace with actual user ID
      setSubmittedResponses(response.data);
    } catch (error) {
      console.error('Error fetching submitted responses:', error);
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:4001/interview/feedback?userId=123');
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const playVideo = (videoPath) => {
    setSelectedVideo(`http://localhost:4001/${videoPath}`); // Ensure the correct path to the video
  };

  const resetRecordingState = () => {
    setIsRecording(false);
    setMediaRecorder(null);
    setVideoBlob(null);
    setIsVideoReady(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const alert = (message, type) => {
    const colors = {
      success: '#4caf50',
      warning: '#ff9800',
      info: '#2196f3',
    };
    const alertDiv = document.createElement('div');
    alertDiv.textContent = message;
    alertDiv.style.backgroundColor = colors[type] || '#333';
    alertDiv.style.color = '#fff';
    alertDiv.style.padding = '10px 20px';
    alertDiv.style.margin = '10px 0';
    alertDiv.style.borderRadius = '5px';
    alertDiv.style.fontWeight = 'bold';
    alertDiv.style.textAlign = 'center';
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.left = '50%';
    alertDiv.style.transform = 'translateX(-50%)';
    document.body.appendChild(alertDiv);
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 3000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.questionsSection}>
        <h2 style={styles.header}>Interview Questions</h2>
        {questions.length > 0 && timer > 0 && (
          <div>
            <p style={styles.questionText}>
              <strong>Time Remaining: {formatTime(timer)}</strong><br />
              <strong>Question {currentQuestionIndex + 1}:</strong> {questions[currentQuestionIndex].question}
            </p>
            <div style={styles.navigationButtons}>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                style={{
                  ...styles.button,
                  backgroundColor: currentQuestionIndex === 0 ? '#ccc' : '#ff9800',
                  cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                Previous Question
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                style={{
                  ...styles.button,
                  backgroundColor: currentQuestionIndex === questions.length - 1 ? '#ccc' : '#2196f3',
                  cursor: currentQuestionIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
                }}
              >
                Next Question
              </button>
            </div>
          </div>
        )}
      </div>
      <div style={styles.videoSection}>
        <h2 style={styles.header}>Record Your Answer</h2>
        <video ref={videoRef} autoPlay muted style={styles.video} />
        <div style={styles.buttonGroup}>
          {!isRecording && timer > 0 ? (
            <button onClick={startRecording} style={{ ...styles.button, backgroundColor: '#2196f3' }}>
              Start Recording
            </button>
          ) : (
            <button onClick={stopRecording} style={{ ...styles.button, backgroundColor: '#f44336' }}>
              Stop Recording
            </button>
          )}
          <button
            onClick={submitAnswer}
            disabled={!isVideoReady}
            style={{
              ...styles.button,
              backgroundColor: isVideoReady ? '#4caf50' : '#ccc',
              cursor: isVideoReady ? 'pointer' : 'not-allowed',
            }}
          >
            Submit Answer
          </button>
          <button
            onClick={finalSubmit}
            style={{ ...styles.button, backgroundColor: '#4caf50', marginLeft: '20px' }}
          >
            Final Submission
          </button>
        </div>
        {selectedVideo && <video src={selectedVideo} controls style={styles.video} />}
      </div>
      {submittedResponses.length > 0 && (
        <div style={styles.responsesSection}>
          <h2 style={styles.header}>Your Submitted Responses</h2>
          {submittedResponses.map((response, index) => (
            <div key={index} style={styles.responseItem}>
              <p style={styles.responseText}>
                <strong>Question {response.questionId}:</strong> 
                <button
                  onClick={() => playVideo(response.videoPath)}
                  style={styles.playButton}
                >
                  Play Answer
                </button>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      fontFamily: "'Arial', sans-serif",
      backgroundColor: '#f9f9f9',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
      },
    },
    questionsSection: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      backgroundColor: '#ffffff',
      borderRight: '1px solid #ddd',
      '@media (max-width: 768px)': {
        borderRight: 'none',
        borderBottom: '1px solid #ddd',
        padding: '10px',
      },
    },
    videoSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      '@media (max-width: 768px)': {
        padding: '10px',
      },
    },
    header: {
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
      fontSize: '20px',
      '@media (max-width: 768px)': {
        fontSize: '18px',
      },
    },
    questionText: {
      fontSize: '18px',
      marginBottom: '20px',
      color: '#555',
      '@media (max-width: 768px)': {
        fontSize: '16px',
      },
    },
    navigationButtons: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '10px',
    },
    video: {
      width: '80%',
      border: '2px solid #333',
      borderRadius: '10px',
      marginBottom: '20px',
      '@media (max-width: 768px)': {
        width: '90%',
      },
    },
    buttonGroup: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      '@media (max-width: 768px)': {
        fontSize: '14px',
        padding: '8px 16px',
      },
    },
  };  
export default InterviewLayout;