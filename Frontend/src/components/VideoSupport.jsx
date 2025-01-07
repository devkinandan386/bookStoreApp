// import React, { useState } from "react";
// import "../index.css";

// // Sample video data (replace with valid YouTube embed links)
// const videoData = [
//   {
//     id: 1,
//     title: "Interview Question 1: Tell Me About Yourself",
//     videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&autoplay=1",
//     description: "Learn how to introduce yourself in an interview setting.",
//   },
//   {
//     id: 2,
//     title: "Interview Question 2: Why Do You Want to Work Here?",
//     videoUrl: "https://www.youtube.com/embed/oHg5SJYRHA0?rel=0&modestbranding=1&autoplay=1",
//     description: "Understand how to answer why you want to work for a company.",
//   },
//   {
//     id: 3,
//     title: "Interview Question 3: Tell Me About a Time You Faced a Challenge",
//     videoUrl: "https://www.youtube.com/embed/l2nVeK_MH6I?rel=0&modestbranding=1&autoplay=1",
//     description: "Master the STAR method for challenges effectively.",
//   },
//   {
//     id: 4,
//     title: "Interview Question 4: Where Do You See Yourself in 5 Years?",
//     videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ?rel=0&modestbranding=1&autoplay=1",
//     description: "Prepare for this future-oriented question.",
//   },
//   {
//     id: 5,
//     title: "Interview Question 5: Why Should We Hire You?",
//     videoUrl: "https://www.youtube.com/embed/vLkPzJajNqY?rel=0&modestbranding=1&autoplay=1",
//     description: "Create a compelling response for this question.",
//   },
// ];

// const VideoSupport = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   const openModal = (videoUrl) => {
//     setSelectedVideo(videoUrl);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setSelectedVideo(null);
//   };

//   return (
//     <div className="video-support-section">
//       <h2 className="video-support-title">Video Support for Interview Preparation</h2>
//       <p className="video-support-description">
//         Watch these videos for detailed explanations on common interview questions.
//       </p>

//       {/* Video Cards */}
//       <div className="video-card-container">
//         {videoData.map((video) => (
//           <div
//             key={video.id}
//             className="video-card"
//             onClick={() => openModal(video.videoUrl)}
//             style={{
//               backgroundColor: "#f3f4f6",
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//               margin: "10px",
//               padding: "15px",
//               cursor: "pointer",
//               transition: "transform 0.3s",
//             }}
//           >
//             <div className="video-card-content">
//               <h3
//                 className="video-card-title"
//                 style={{
//                   color: "#2c3e50",
//                   marginBottom: "10px",
//                 }}
//               >
//                 {video.title}
//               </h3>
//               <p
//                 className="video-card-description"
//                 style={{
//                   color: "#7f8c8d",
//                   marginBottom: "15px",
//                 }}
//               >
//                 {video.description}
//               </p>
//               <button
//                 className="watch-video-btn"
//                 style={{
//                   backgroundColor: "#2980b9",
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 20px",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Watch Video
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for Video Viewing */}
//       {modalOpen && (
//         <div
//           className="modal-overlay"
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.7)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             className="modal-content"
//             style={{
//               backgroundColor: "#fff",
//               padding: "20px",
//               borderRadius: "10px",
//               maxWidth: "800px",
//               width: "90%",
//               textAlign: "center",
//               position: "relative",
//             }}
//           >
//             <button
//               className="close-modal-btn"
//               onClick={closeModal}
//               style={{
//                 backgroundColor: "red",
//                 color: "#fff",
//                 border: "none",
//                 padding: "5px 10px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 position: "absolute",
//                 top: "10px",
//                 right: "10px",
//               }}
//             >
//               X
//             </button>
//             <iframe
//               src={selectedVideo}
//               width="100%"
//               height="450"
//               title="Interview Video"
//               className="modal-video"
//               style={{
//                 border: "none",
//                 borderRadius: "10px",
//               }}
//               allow="autoplay"
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoSupport;

import React, { useState, useEffect } from "react";
import "../index.css";

const VideoSupport = () => {
  const [videos, setVideos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch videos from the backend
    fetch("http://localhost:4000/video")
      .then((response) => response.json())
      .then((data) => setVideos(data))
      .catch((error) => console.error("Error fetching videos:", error));
  }, []);

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="video-support-section">
      <h2 className="video-support-title">Video Support for Interview Preparation</h2>
      <p className="video-support-description">
        Watch these videos for detailed explanations on common interview questions.
      </p>

      {/* Video Cards */}
      <div className="video-card-container">
        {videos.map(({ _id, title, videoUrl, description }) => (
          <div key={_id} className="video-card" onClick={() => openModal(videoUrl)}>
            <h3 className="video-card-title">{title}</h3>
            <p className="video-card-description">{description}</p>
            <button className="watch-video-btn">Watch Video</button>
          </div>
        ))}
      </div>

      {/* Modal for Video Viewing */}
      {modalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="close-modal-btn" onClick={closeModal}>
              X
            </button>
            <iframe
              src={selectedVideo}
              width="100%"
              height="450"
              title="Interview Video"
              className="modal-video"
              allow="autoplay"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSupport;
