import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import About from "./components/about";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import Other from "./components/Other";
import InterviewQuestions from "./components/InterviewQuestions";
import PreviousYearPapers from "./components/PreviousYearPapers";
import AddNewInterview from "./components/AddNewInterview"; // Import it
import RecordAnswerSection from "./components/RecordAnswerSection";
import VideoSupport from "./components/VideoSupport";
import Notewriting from "./components/Notewriting";
import AiMockInterview from "./components/AiMockInterview";
import InterviewPage from "./interview/[interviewId]/page";
import InterviewPage1 from "./interview/[interviewId]/start/page";
import Swarround from "./components/swarRound";
import MCQTest from "./components/mcqtest";
import Feedback from "./components/Feedback";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import AssistantIcon from './components/AssistantIcon';

function App() {
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(true); // State to manage splash screen

  useEffect(() => {
    // Check if splash screen has already been shown
    const isSplashSeen = localStorage.getItem("splashSeen");

    if (isSplashSeen) {
      setLoading(false); // Skip splash screen if already shown
    } else {
      // Set splashSeen to true after 3 seconds and proceed
      setTimeout(() => {
        localStorage.setItem("splashSeen", "true"); // Mark splash screen as seen
        setLoading(false); // Hide splash screen
      }, 3000);
    }
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen /> // Show splash screen first
      ) : (
        <div className="dark:bg-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/course" element={authUser ? <Courses /> : <Navigate to="/signup" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/About" element={<About />} />
            <Route path="/Notes" element={<Notes />} />
            <Route path="/Other" element={<Other />} />
            <Route path="/ai-interview" element={<AiMockInterview />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/mcq-test" element={<MCQTest />} />
            <Route path="/interview-questions" element={<InterviewQuestions />} />
            <Route path="/Other/AddNewInterview" element={<AddNewInterview />} />
            <Route path="/record-answer" element={<RecordAnswerSection />} />
            <Route path="/interview/:interviewId" element={<InterviewPage />} />
            <Route path="/interview/:interviewId/start" element={<InterviewPage1 />} />
            <Route path="/swarround" element={<Swarround />} />
            <Route path="/previous-year-papers" element={<PreviousYearPapers />} />
            <Route path="/video-support" element={<VideoSupport />} />
            <Route path="/note-writing" element={<Notewriting />} />
          </Routes>
          <Toaster />
          <AssistantIcon />
        </div>
      )}
    </>
  );
}

export default App;
