import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; // Adjust the path based on Navbar location
import '../index.css'; // Importing the CSS file

function Other() {
  const navigate = useNavigate();  // Initialize useNavigate hook
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state for interview details
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);  // State for webcam checkbox
  const [webcamStream, setWebcamStream] = useState(null);  // State for webcam stream
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State for custom alert visibility

  // Action functions for button clicks
  const handleLearnMoreClick = () => {
    navigate('/interview-questions');  // Navigate to the InterviewQuestions page
  };

  const handleViewPapersClick = () => {
    navigate('/previous-year-papers');  // Navigate to Previous Year Papers
  };

  const handleWatchNowClick = () => {
    navigate('/video-support');  // Navigate to Video Support
  };

  const handleStartWritingClick = () => {
    navigate('/note-writing');  // Navigate to Note Writing
  };

  const handleStartInterviewClick = () => {
    setIsModalOpen(true);  // Open modal to input interview details
  };

  const handleStartMockInterview = () => {
    const jobRole = document.getElementById("job-role").value; // Get the job role input value
    const isJobRoleValid = jobRole.trim() !== ""; // Check if job role is not empty
    
    // Check if the webcam is enabled
    const isWebcamValid = isWebcamEnabled && webcamStream !== null;

    // Only proceed if the job role is valid and the webcam is enabled
    if (isJobRoleValid && isWebcamValid) {
      setIsModalOpen(false);
      navigate('/ai-interview'); // Navigate to Mock Interview page
    } else {
      setIsAlertOpen(true); // Show custom alert if validation fails
    }
  };

  // Webcam access logic
  const handleWebcamToggle = async () => {
    if (isWebcamEnabled) {
      // Stop the webcam stream if already enabled
      if (webcamStream) {
        const tracks = webcamStream.getTracks();
        tracks.forEach(track => track.stop());
      }
      setWebcamStream(null);  // Clear the webcam stream
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setWebcamStream(stream);  // Set the webcam stream to state
      } catch (err) {
        console.error("Error accessing webcam and microphone: ", err);
      }
    }
    setIsWebcamEnabled(!isWebcamEnabled);  // Toggle the webcam state
  };

  // Cleanup webcam stream when component unmounts
  useEffect(() => {
    return () => {
      if (webcamStream) {
        const tracks = webcamStream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [webcamStream]);

  return (
    <div className="min-h-screen">
      {/* Include Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 to-purple-300 text-white py-10 bg-animate">

        {/* Heading with hover animation */}
        <h1 className="text-4xl font-bold mb-6 mt-20 transform transition duration-500 hover:text-yellow-300 hover:scale-110">
          Explore Your Options
        </h1>
        <p className="text-lg mb-10">Choose a category to get started with:</p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full px-10">
          {/* Card 1: Interview Questions */}
          <div className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:translate-y-2">
            <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
            <p>Prepare yourself with the best interview questions.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleLearnMoreClick} // On click event for this button
            >
              Learn More
            </button>
          </div>

          {/* Card 2: Previous Year Papers */}
          <div className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:translate-y-2">
            <h2 className="text-2xl font-bold mb-4">Previous Year Questions Papers</h2>
            <p>Access previous year question papers to boost your preparation.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleViewPapersClick} // On click event for this button
            >
              View Papers
            </button>
          </div>

          {/* Card 3: Video Support */}
          <div className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:translate-y-2">
            <h2 className="text-2xl font-bold mb-4">Video Support</h2>
            <p>Learn with our extensive collection of video tutorials.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleWatchNowClick} // On click event for this button
            >
              Watch Now
            </button>
          </div>

          {/* Card 4: Note Writing */}
          <div className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:translate-y-2">
            <h2 className="text-2xl font-bold mb-4">Note Writing</h2>
            <p>Organize your thoughts with effective note-writing techniques.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleStartWritingClick} // On click event for this button
            >
              Start Writing
            </button>
          </div>

          {/* Card 5: AI Interview */}
          <div className="bg-indigo-500 hover:bg-indigo-600 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:translate-y-2">
            <h2 className="text-2xl font-bold mb-4">AI Interview</h2>
            <p>Experience AI-generated interview questions to sharpen your skills.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleStartInterviewClick}
            >
              Start Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Entering Job Role Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Tell us more about your job interviewing</h2>
            <div className="mb-4">
              <label htmlFor="job-role" className="block text-lg">Job Role/Position</label>
              <input type="text" id="job-role" className="w-full p-2 mt-2 border border-gray-300 rounded-lg" placeholder="Enter your job role" />
            </div>
            <div className="mb-4">
              <label htmlFor="enable-webcam" className="block text-lg">Enable Webcam and Microphone</label>
              <input
                type="checkbox"
                id="enable-webcam"
                className="mt-2"
                checked={isWebcamEnabled}
                onChange={handleWebcamToggle} // Toggle webcam access
              />
              {isWebcamEnabled && webcamStream && (
                <div className="mt-4">
                  <video
                    autoPlay
                    muted
                    className="w-full h-48 object-cover"
                    ref={(ref) => ref && (ref.srcObject = webcamStream)}
                  />
                </div>
              )}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full"
              onClick={handleStartMockInterview} // Start mock interview after setting up
            >
              Start Interview
            </button>
            <button
              className="mt-4 bg-gray-400 text-white py-2 px-4 rounded-lg w-full"
              onClick={() => setIsModalOpen(false)} // Close the modal
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Custom Alert */}
      {isAlertOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Oops!</h2>
            <p className="mb-4">Please enter your job role and enable the webcam to start the interview.</p>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={() => setIsAlertOpen(false)} // Close the alert
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Other;

