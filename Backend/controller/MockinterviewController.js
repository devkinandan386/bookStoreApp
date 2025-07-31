// // controllers/MockInterviewController.js

// import MockInterviewModel from '../model/MockInterviewModel.js';
// import { v4 as uuidv4 } from 'uuid';
// import moment from 'moment';

// // Controller to save interview data
// export const saveMockInterview = async (req, res) => {
//   try {
//     const { jsonMockResp, jobPosition, jobDesc, jobExperience, createdBy } = req.body;

//     // Validate request body
//     if (!jsonMockResp || !jobPosition || !jobDesc || !jobExperience || !createdBy) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Create a new Mock Interview document
//     const newMockInterview = new MockInterviewModel({
//       mockId: uuidv4(),
//       jsonMockResp,
//       jobPosition,
//       jobDesc,
//       jobExperience,
//       createdBy,
//       createdAt: moment().format('YYYY-MM-DD'),
//     });

//     // Save the document to MongoDB
//     const savedMockInterview = await newMockInterview.save();
//     res.status(201).json(savedMockInterview); // Return the saved interview object
//   } catch (error) {
//     console.error('Error saving mock interview:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


import MockInterviewModel from '../model/MockInterviewModel.js';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// Controller to save interview data
export const saveMockInterview = async (req, res) => {
  try {
    const { jsonMockResp, jobPosition, jobDesc, jobExperience, createdBy } = req.body;

    // Validate request body
    if (!jsonMockResp || !jobPosition || !jobDesc || !jobExperience || !createdBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new Mock Interview document
    const newMockInterview = new MockInterviewModel({
      mockId: uuidv4(),
      jsonMockResp,
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy,
      createdAt: new Date().toISOString().split('T')[0],
    });

    // Save the document to MongoDB
    const savedMockInterview = await newMockInterview.save();
    res.status(201).json(savedMockInterview); // Return the saved interview object
  } catch (error) {
    console.error('Error saving mock interview:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to fetch mock interview questions by ID
export const getMockInterview = async (req, res) => {
  try {
    const interview = await MockInterviewModel.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    // Return the questions (from the `jsonMockResp` field)
    res.status(200).json({
      questions: interview.jsonMockResp || []
    });
  } catch (error) {
    console.error('Error fetching interview:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
