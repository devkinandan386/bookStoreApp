import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="about-section bg-gradient-to-r from-teal-400 to-blue-600 text-white py-12 px-6">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h1 className="text-4xl font-bold mb-6">About the Developer</h1>

        {/* Introduction */}
        <p className="text-lg leading-relaxed mb-6">
          Hello! I am <span className="font-bold">Devkinandan Pandey</span>, the sole developer behind this project.
          My passion for coding and innovation has driven me to create this platform, aiming to deliver a seamless
          and efficient user experience.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Specializing in modern web technologies, I focus on crafting user-friendly and visually appealing applications.
          Thank you for taking the time to explore my work. I hope it proves valuable to you!
        </p>

        {/* Developer Card */}
        <div className="developer-card bg-white text-gray-800 rounded-lg shadow-xl p-6 mx-auto max-w-sm">
          <img
            src="/professionalphoto3.png"
            alt="Devkinandan Pandey"
            className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-teal-400 shadow-sm"
          />
          <h2 className="text-2xl font-bold mb-2">Devkinandan Pandey</h2>
          <p className="text-sm text-gray-600 mb-4">Full-Stack Developer</p>
          <p className="leading-relaxed">
            Proficient in <span className="font-bold">React</span>, <span className="font-bold">JavaScript</span>, 
            <span className="font-bold">CSS</span>, and backend frameworks. I enjoy tackling complex problems 
            and bringing innovative ideas to life with functional and elegant solutions.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full text-lg font-semibold focus:ring focus:ring-green-300 transition ease-in-out"
            onClick={() => navigate("/")}
            aria-label="Navigate to Home"
          >
            Home
          </button>
          <button
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full text-lg font-semibold focus:ring focus:ring-red-300 transition ease-in-out"
            onClick={() => navigate(-1)}
            aria-label="Go Back"
          >
            Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
