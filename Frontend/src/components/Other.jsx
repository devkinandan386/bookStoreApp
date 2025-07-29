import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the path based on Navbar location
import "../index.css"; // Importing the CSS file

function Other() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const [webcamStream, setWebcamStream] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLearnMoreClick = () => navigate("/interview-questions");
  const handleLetStartInterviewClick = () => navigate("/Other/AddNewInterview");

  const handleWatchNowClick = () => navigate("/video-support");
  const handleStartWritingClick = () => navigate("/note-writing");
  const handleStartInterviewClick = () => setIsModalOpen(true);
  const handleStartMCQTestClick = () => navigate("/mcq-test");
  const handleSwarRoundClick = () => navigate("/swarround");

  const handleStartMockInterview = () => {
    const jobRole = document.getElementById("job-role").value.trim();
    if (jobRole && isWebcamEnabled && webcamStream) {
      setIsModalOpen(false);
      navigate("/ai-interview");
    } else {
      setIsAlertOpen(true);
    }
  };

  const handleWebcamToggle = async () => {
    if (isWebcamEnabled) {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
      }
      setWebcamStream(null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setWebcamStream(stream);
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    }
    setIsWebcamEnabled(!isWebcamEnabled);
  };

  useEffect(() => {
    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [webcamStream]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 to-purple-300 text-white py-10 bg-animate">
        <h1 className="text-4xl font-bold mb-6 mt-20 hover:text-yellow-300 hover:scale-110 transition duration-500">
          Explore Your Options
        </h1>
        <p className="text-lg mb-10">Choose a category to get started with:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full px-10">
          {/* Cards Section */}
          {/* Interview Questions */}
          <div className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Interview Questions</h2>
            <p>Prepare with the best interview questions.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleLearnMoreClick}
            >
              Learn More
            </button>
          </div>
          {/* Video Support */}
          <div className="bg-purple-500 hover:bg-purple-600 text-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Video Support</h2>
            <p>Learn with extensive video tutorials.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleWatchNowClick}
            >
              Watch Now
            </button>
          </div>
          {/* Note Writing */}
          <div className="bg-red-500 hover:bg-red-600 text-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Note Writing</h2>
            <p>Organize your thoughts effectively.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleStartWritingClick}
            >
              Start Writing
            </button>
          </div>
          {/* AI Interview mock actual */}
          <div className="bg-lime-500 hover:bg-lime-600 text-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">AI Interview</h2>
            <p>Sharpen skills with AI interviews.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleLetStartInterviewClick}
            >
              Start Now
            </button>
          </div>
          {/* AI Interview mock actual */}
<div className="bg-pink-500 hover:bg-pink-600 text-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
  <h2 className="text-2xl font-bold mb-4">AI SWAR Interview</h2>
  <p>Hone your Skills in the SWAR Round </p>
  <button
    className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
    onClick={handleSwarRoundClick}
  >
    Start Now
  </button>
</div>


          {/* MCQ Test */}
          <div className="bg-teal-500 hover:bg-teal-600 text-white p-6 rounded-lg shadow-lg transform transition hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">MCQ Test</h2>
            <p>Test your knowledge with MCQs.</p>
            <button
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg"
              onClick={handleStartMCQTestClick}
            >
              Start Test
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Enter Interview Details</h2>
            <p>Job Role and Position</p>
            <input type="text" id="job-role" placeholder="Enter job role" className="w-full mb-4 p-2 border rounded-lg" />
            <div className="mb-4">
              <label htmlFor="enable-webcam">Enable Webcam</label>
              <input
                type="checkbox"
                id="enable-webcam"
                checked={isWebcamEnabled}
                onChange={handleWebcamToggle}
                className="ml-2"
              />
              {isWebcamEnabled && webcamStream && (
                <video autoPlay muted ref={(ref) => ref && (ref.srcObject = webcamStream)} className="w-full mt-4" />
              )}
            </div>
            <button onClick={handleStartMockInterview} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full">
              Start Interview
            </button>
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white py-2 px-4 rounded-lg w-full mt-4">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Alert */}
      {isAlertOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Oops!</h2>
            <p>Please enter your job role and enable the webcam.</p>
            <button onClick={() => setIsAlertOpen(false)} className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded-lg">
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Other;
