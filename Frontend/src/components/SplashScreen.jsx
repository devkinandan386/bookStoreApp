import React, { useEffect } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onComplete = () => {} }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Hide splash screen after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Cleanup to prevent memory leaks
  }, [onComplete]);

  // Split "Insta-prep" into an array of characters for individual animation
  const projectName = "Insta-prep".split("");

  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to top, #2e3b4e, #1a1a1a)", // Deep gradient water-like background
        color: "white",
        fontSize: "24px",
        fontWeight: "bold",
        position: "relative",
        overflow: "hidden", // Prevents overflow of bubbles
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      {/* Bright Water Bubbles in the Background */}
      <div className="bubbles">
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className="bubble"
            style={{
              animationDelay: `${Math.random() * 4}s`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 4 + 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Animated Text - "Insta-prep" written one character at a time */}
      <motion.div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        {projectName.map((char, index) => (
          <motion.span
            key={index}
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
              color: "white",
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.1, // Stagger the animation for each character
              duration: 0.5,
              repeat: Infinity,
              repeatType: "mirror", // Repeats the animation in a mirrored fashion
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      <style>
        {`
          .bubbles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
          }
          .bubble {
            position: absolute;
            bottom: -50px;
            width: 50px;
            height: 50px;
            background: rgba(0, 255, 255, 0.8); /* Brighter cyan color for bubbles */
            border-radius: 50%;
            animation: rise 4s infinite;
            opacity: 0.8;
          }
          @keyframes rise {
            0% {
              bottom: -50px;
              transform: scale(0.5);
            }
            100% {
              bottom: 100%;
              transform: scale(1);
              opacity: 0;
            }
          }
        `}
      </style>
    </motion.div>
  );
};

export default SplashScreen;
