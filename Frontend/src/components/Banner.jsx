// import React from "react";
// import banner from "../../public/Banner.png";
// function Banner() {
//   return (
//     <>
//       <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-10">
//         <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
//           <div className="space-y-8">
//             <h1 className="text-2xl md:text-4xl font-bold">
//               Hello, welcomes here to learn something{" "}
//               <span className="text-pink-500">new everyday!!!</span>
//             </h1>
//             <p className="text-sm md:text-xl">
//             Discover a world of knowledge with our vast collection of books. 
//             Whether you're a fan of fiction, non-fiction, or academic titles, 
//             we have something for every reader. Start your literary journey today!
//             </p>
//           </div>
//           <button className="btn mt-6 btn-secondary">Get Started</button>
//         </div>
//         <div className=" order-1 w-full mt-20 md:w-1/2">
//           <img
//             src={banner}
//             className="md:w-[550px] md:h-[460px] md:ml-12"
//             alt=""
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Banner;

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import banner from "../../public/Banner.png";

function Banner() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to navigate to the courses page
  const handleGetStartedClick = () => {
    navigate("/Other"); // Replace with your desired route
  };

  return (
    <div>
      <div className="max-w-screen-2xl container mx-auto flex flex-col md:flex-row my-10">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <h1 className="text-2xl md:text-4xl font-bold">
            Hello, welcome here to learn something{" "}
            <span className="text-pink-500">new everyday!!!</span>
          </h1>
          <p className="text-sm md:text-xl">
  Explore our diverse collection of books and uncover stories that inspire, entertain, and educate. Begin your journey into the world of knowledge today!
</p>

          <button
            className="btn mt-6"
            style={{
              background: "linear-gradient(90deg, #ff7eb3, #ff758c, #ff7e5f)",
              color: "#fff",
              border: "none",
              borderRadius: "48px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.5s ease, background-color 0.5s ease",
            }}
            onClick={handleGetStartedClick}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.1)";
              e.target.style.backgroundColor = "#ff6a89"; // Optional hover color
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = ""; // Reset color
            }}
          >
            Get Started
          </button>

        </div>
        <div className="order-1 w-full mt-20 md:w-1/2">
          <img src={banner} alt="Banner" className="md:w-[550px] md:h-[460px]" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
