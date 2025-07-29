import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SwarTechnicalQuestions({ next }) {
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4001/api/generateQuestion?section=3')
      .then(res => setQuestion(res.data.question))
      .catch(err => console.error('Error fetching question:', err));
  }, []);

  const handleSubmit = async () => {
    await axios.post('http://localhost:4001/api/submitAnswer', {
      section: 3, question, userAnswer, correctAnswer: 'expected_answer'
    });
    next();
  };

  return (
    <div>
      <h2>Basic Technical Questions</h2>
      <p>{question}</p>
      <input type='text' value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SwarTechnicalQuestions;
