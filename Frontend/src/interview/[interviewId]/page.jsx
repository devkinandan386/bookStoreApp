import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { WebcamIcon, Lightbulb } from "lucide-react";
import Webcam from "react-webcam";

function InterviewPage() {
  const { interviewId } = useParams();
  const [interviewData, setInterviewData] = useState({
    jobPosition: "Software Engineer",
    jobDescription: "React, Node.js, MongoDB",
    jobExperience: "3+ years"
  });
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  useEffect(() => {
    console.log("Interview ID:", interviewId);

    // ✅ Check if data is in localStorage
    const storedInterview = localStorage.getItem("interviewData");
    if (storedInterview) {
      setInterviewData(JSON.parse(storedInterview));
    }

    // ✅ Fetch from backend API (hosted on Render)
    fetch(`https://bookstoreapp-backend-f2em.onrender.com/mockinterview/${interviewId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Interview not found");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched interview data:", data);
        setInterviewData(data);
      })
      .catch((err) => console.error("Error fetching interview data:", err));
  }, [interviewId]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header */}
      <div className="w-full py-6 bg-gray-100 flex justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
          Let's Start
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left - Job Info */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-white flex flex-col justify-center items-center md:items-start">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
              Job Role: <span className="text-blue-500">{interviewData.jobPosition}</span>
            </h2>
            <h2 className="text-md md:text-lg text-gray-700 mb-2">
              Tech Stack: <span className="font-semibold">{interviewData.jobDescription}</span>
            </h2>
            <h2 className="text-md md:text-lg text-gray-700">
              Experience Required: <span className="font-semibold">{interviewData.jobExperience}</span>
            </h2>
          </div>

          {/* Info Note */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 shadow-md rounded-lg p-6 w-full max-w-md mt-6 flex">
            <Lightbulb className="h-8 w-8 text-yellow-500 mr-4" />
            <div>
              <h2 className="text-md md:text-lg font-semibold text-gray-800 mb-2">
                Information:
              </h2>
              <p className="text-gray-700 text-sm md:text-md">
                Enable Video Web Cam and Microphone to start your AI Generated Mock Interview. It has <strong>5 questions</strong> which you can answer, and at the end, you will receive a report based on your responses.
                <br /><br />
                <strong>NOTE:</strong> We never record your video. Webcam access can be disabled at any time if you want.
              </p>
            </div>
          </div>
        </div>

        {/* Right - Webcam */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-6">
          <div className="w-full max-w-xs md:max-w-md bg-white rounded-lg shadow-md p-4 md:p-6">
            {webCamEnabled ? (
              <Webcam
                className="rounded-lg w-full"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div className="flex flex-col items-center">
                <WebcamIcon className="h-24 w-24 md:h-32 md:w-32 my-4 p-5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-lg border" />
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Web Cam and Microphone
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="flex justify-between w-full px-16 pb-6">
        <Link to={`/interview/${interviewId}/start`}>
          <button className="ml-auto mr-20 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all">
            Start Interview
          </button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewPage;
