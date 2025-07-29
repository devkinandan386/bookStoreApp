import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SwarFillMCQ({ next }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4001/api/generateQuestion?section=2')
      .then(res => {
        setQuestion(res.data.question);
        setOptions(res.data.options || []);
      })
      .catch(err => console.error('Error fetching question:', err));
  }, []);

  const handleSubmit = async () => {
    await axios.post('http://localhost:4001/api/submitAnswer', {
      section: 2, question, userAnswer: selectedOption, correctAnswer: 'expected_answer'
    });
    next();
  };

  return (
    <div>
      <h2>Fill in the Blanks & MCQs</h2>
      <p>{question}</p>
      {options.map((option, index) => (
        <label key={index}>
          <input type='radio' value={option} onChange={() => setSelectedOption(option)} />
          {option}
        </label>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SwarFillMCQ;
