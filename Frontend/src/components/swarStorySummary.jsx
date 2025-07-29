import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SwarStorySummary() {
  const [story, setStory] = useState('');
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4001/api/generateQuestion?section=4')
      .then(res => {
        setStory(res.data.story);
        setQuestion(res.data.question);
      })
      .catch(err => console.error('Error fetching story:', err));
  }, []);

  const handleSubmit = async () => {
    await axios.post('http://localhost:4001/api/submitAnswer', {
      section: 4, question, userAnswer, correctAnswer: 'expected_answer'
    });
    setIsCompleted(true);
    calculateAccuracy();
  };

  const calculateAccuracy = async () => {
    const response = await axios.get('http://localhost:4001/api/calculateAccuracy');
    setAccuracy(response.data.accuracy);
  };

  return (
    <div>
      <h2>Short Story Summary</h2>
      {isCompleted ? (
        <div>
          <h3>Your Accuracy: {accuracy}%</h3>
          <a href='/swarfeedback'>Provide Feedback & Rating</a>
        </div>
      ) : (
        <div>
          <p><strong>Story:</strong> {story}</p>
          <p><strong>Question:</strong> {question}</p>
          <input type='text' value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default SwarStorySummary;
