// import Answer from '../model/Answer.js'; // Ensure the correct path

// export const submitAnswer = async (req, res) => {
//     try {
//       const { answer, questionId, feedback, rating } = req.body;
  
//       if (!answer || !questionId) {
//         return res.status(400).json({ message: 'Answer and questionId are required!' });
//       }
  
//       let existingAnswer = await Answer.findOne({ questionId });
  
//       if (existingAnswer) {
//         // ✅ Fix: Clear the previous answer before updating
//         existingAnswer.answer = ""; 
//         existingAnswer.feedback = "";
//         existingAnswer.rating = null;
  
//         existingAnswer.answer = answer;
//         existingAnswer.feedback = feedback;
//         existingAnswer.rating = rating;
//         await existingAnswer.save();
//         return res.status(200).json({ message: 'Answer updated successfully!' });
//       }
  
//       const newAnswer = new Answer({ answer, questionId, feedback, rating });
//       await newAnswer.save();
  
//       return res.status(200).json({ message: 'Answer submitted successfully!' });
  
//     } catch (error) {
//       console.error('Error submitting answer:', error);
//       res.status(500).json({ message: 'Failed to submit answer' });
//     }
//   };
  
import Answer from '../model/Answer.js';

export const submitAnswer = async (req, res) => {
  try {
    const { answer, questionId, feedback, rating } = req.body;

    console.log("Received Data:", { answer, questionId, feedback, rating });

    if (!answer || !questionId) {
      return res.status(400).json({ message: 'Answer and questionId are required!' });
    }

    const newAnswer = new Answer({ answer, questionId, feedback, rating });
    await newAnswer.save();

    return res.status(200).json({ message: 'Answer submitted successfully!' });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Failed to submit answer' });
  }
};
