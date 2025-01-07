import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const SubjectCards = () => {
  const [cardsData, setCardsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from list2.json
    fetch("/list2.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => setCardsData(data))
      .catch((error) => console.error("Error fetching card data:", error));
  }, []);

  const handleLearnMoreClick = (pdfLink) => {
    // Open the PDF link in a new tab
    window.open(pdfLink, "_blank");
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          padding: "10px 20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.5rem",
              letterSpacing: "1px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Subject📘Notes
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  style={{
                    color: "#fff",
                    fontSize: "1rem",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    transition: "background 0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#5477f5")}
                  onMouseLeave={(e) => (e.target.style.background = "transparent")}
                >
                  Home
                </a>
              </li>
            </ul>
            <button
              className="btn btn-primary ms-3"
              style={{
                background: "linear-gradient(135deg, #f12711, #f5af19)",
                border: "none",
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "30px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
              }}
              onClick={() => navigate("/")}
            >
              Go Back
            </button>
          </div>
        </div>
      </nav>

      {/* Cards Section */}
      <div className="d-flex flex-wrap justify-content-center gap-4 p-4">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            style={{
              width: "18rem",
              borderRadius: "15px",
              border: "1px solid transparent",
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(135deg, #73a5ff, #5477f5) border-box",
              boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            className="hover-card"
          >
            <Card.Img
              variant="top"
              src={card.image}
              alt={`${card.title} image`}
              style={{
                height: "150px",
                objectFit: "cover",
              }}
            />
            <Card.Body style={{ backgroundColor: "#f8f9fa" }}>
              <Card.Title
                style={{
                  color: "#343a40",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              >
                {card.title}
              </Card.Title>
              <Card.Text
                style={{
                  color: "#6c757d",
                  fontSize: "0.9rem",
                  textAlign: "center",
                }}
              >
                {card.description}
              </Card.Text>
              <Button
                variant="primary"
                style={{
                  background: "linear-gradient(135deg, #f12711, #f5af19)",
                  border: "none",
                  padding: "8px 16px",
                  fontSize: "0.9rem",
                  borderRadius: "5px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
                }}
                onClick={() => handleLearnMoreClick(card.pdfLink)}
              >
                Learn More
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectCards;
