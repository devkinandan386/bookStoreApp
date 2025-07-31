import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Snackbar, Alert } from "@mui/material";
import React, { useState } from "react";
import { chatSession } from "../utils/GeminiAIModal"; // Ensure this is properly set up
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Use useNavigate for navigation

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState("success");
  const navigate = useNavigate(); // ✅ Initialize useNavigate for navigation

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!jobRole || !jobDescription || !yearsExperience) {
    setSnackMessage("Please fill in all fields before submitting.");
    setSnackSeverity("error");
    setSnackOpen(true);
    return;
  }

  setLoading(true);
  console.log("Form submitted:", jobRole, jobDescription, yearsExperience);

  // Save interview data locally
  localStorage.setItem(
    "interviewData",
    JSON.stringify({
      jobPosition: jobRole,
      jobDescription,
      jobExperience: yearsExperience,
    })
  );

  const InputPrompt = `
    Job Position: ${jobRole}  
    Job Description: ${jobDescription}  
    Years of Experience: ${yearsExperience}  
    Based on this, generate 5 interview questions with answers in JSON format. 
    Output format: [{"question": "...", "answer": "..."}]
  `;

  try {
    const result = await chatSession.sendMessage(InputPrompt);
    const rawResponse = await result.response.text();
    const cleanedResponse = rawResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedResponse = JSON.parse(cleanedResponse);

    console.log("Response from API:", parsedResponse);

    // 🔁 Convert parsedResponse to JSON blob and prepare FormData
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(parsedResponse)], { type: "application/json" });

    formData.append("jsonMockResp", blob);
    formData.append("jobPosition", jobRole);
    formData.append("jobDesc", jobDescription);
    formData.append("jobExperience", yearsExperience);
    formData.append("createdBy", "testuser@example.com");

    const saveInterview = await fetch(`${import.meta.env.VITE_BACKEND_URL}/interview/save`, {
      method: "POST",
      body: formData,
    });

    if (!saveInterview.ok) {
      throw new Error("Failed to save interview questions.");
    }

    const responseData = await saveInterview.json();
    const interviewId = responseData._id;

    setSnackMessage("Interview questions saved successfully!");
    setSnackSeverity("success");

    navigate(`/interview/${interviewId}`);
  } catch (error) {
    console.error("Error:", error);
    setSnackMessage("Failed to generate interview questions. Please try again.");
    setSnackSeverity("error");
  }

  setLoading(false);
  setOpenDialog(false);
  setSnackOpen(true);
};

  return (
    <div className="p-10">
      <div
        className="max-w-xs w-full bg-blue-500 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg cursor-pointer p-4 rounded-lg"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg">+ Add New Interview</h2>
        <h6 className="text-sm mt-1 opacity-90">Click here to start a new interview</h6>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Tell Us About Your Job Interview</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <h2 className="text-lg font-semibold">Add details about your job position, description, and experience.</h2>

            <div className="mt-4">
              <label htmlFor="job-role" className="block text-gray-700 font-medium">Job Role/Job Position</label>
              <input
                type="text"
                id="job-role"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Enter your job role"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="job-description" className="block text-gray-700 font-medium">Job Description / Tech Stack</label>
              <textarea
                id="job-description"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg h-24 focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Ex. React, Node.js, MongoDB, Express.js, etc."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mt-4">
              <label htmlFor="years-experience" className="block text-gray-700 font-medium">Years of Experience</label>
              <input
                type="number"
                id="years-experience"
                max="100"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Exp. 5 years"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                required
              />
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary" variant="outlined">Cancel</Button>
            <Button type="submit" disabled={loading} color="secondary" variant="contained">
              {loading ? (
                <span className="flex items-center">
                  <LoaderCircle className="animate-spin mr-2" /> Generating...
                </span>
              ) : (
                "Start Interview"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;


// import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Snackbar, Alert } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { LoaderCircle } from "lucide-react";
// import { useNavigate } from "react-router-dom"; // ✅ Use useNavigate for navigation

// function AddNewInterview() {
//   const location = useLocation(); // Get the passed state
//   const { feedback, rating } = location.state || {}; // Destructure feedback and rating from state

//   const [userRating, setUserRating] = useState(rating || 0); // Default to the passed rating or 0
//   const [snackMessage, setSnackMessage] = useState("");
//   const [snackOpen, setSnackOpen] = useState(false);
//   const [snackSeverity, setSnackSeverity] = useState("success");
//   const navigate = useNavigate();

//   // Handle the user's rating update
//   const handleRatingChange = (newRating) => {
//     setUserRating(newRating);
//   };

//   // Snackbar management
//   const handleSnackClose = () => {
//     setSnackOpen(false);
//   };

//   return (
//     <div className="p-10">
//       {/* Feedback Card */}
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mt-4">
//         <h2 className="text-2xl font-semibold mb-3">Interview Feedback</h2>
//         <p className="text-gray-600 mb-4">{feedback || "No feedback provided."}</p>

//         <div className="mb-4">
//           <h3 className="font-semibold">Your Rating:</h3>
//           <div className="flex space-x-2 mt-2">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <button
//                 key={star}
//                 onClick={() => handleRatingChange(star)}
//                 className={`text-xl ${userRating >= star ? "text-yellow-500" : "text-gray-400"}`}
//               >
//                 ★
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4">
//           <button
//             onClick={() => {
//               setSnackMessage("Rating submitted successfully!");
//               setSnackSeverity("success");
//               setSnackOpen(true);
//             }}
//             className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
//           >
//             Submit Rating
//           </button>
//         </div>
//       </div>

//       {/* Snackbar for confirmation message */}
//       <Snackbar
//         open={snackOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={handleSnackClose} severity={snackSeverity} sx={{ width: "100%" }}>
//           {snackMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }

// export default AddNewInterview;

