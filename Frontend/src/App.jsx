import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import About from "./components/about";
import Signup from "./components/Signup";
import Notes from "./components/Notes";
import Other from "./components/Other";
import InterviewQuestions from "./components/InterviewQuestions"; // Import your component
import PreviousYearPapers from "./components/PreviousYearPapers"; // Import your component
import VideoSupport from "./components/VideoSupport"; // Import your component
import Notewriting from "./components/Notewriting";
import AiMockInterview from "./components/AiMockInterview";
import Feedback from "./components/Feedback";  // new component
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import AssistantIcon from './components/AssistantIcon';

function App() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/About" element={<About />} />
          <Route path="/Notes" element={<Notes />} />
          <Route path="/Other" element={<Other />} />
          <Route path="/ai-interview" element={<AiMockInterview />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* New Routes for Category Pages */}
          <Route path="/interview-questions" element={<InterviewQuestions />} />
          <Route path="/previous-year-papers" element={<PreviousYearPapers />} />
          <Route path="/video-support" element={<VideoSupport />} />
          <Route path="/note-writing" element={<Notewriting />} />
        </Routes>
        <Toaster />

        {/* Floating Assistant Icon */}
        <AssistantIcon />
      </div>
    </>
  );
}

export default App;
