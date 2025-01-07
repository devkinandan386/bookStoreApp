import React, { useState } from "react";
import "../index.css";

const PreviousYearPapers = () => {
  // Define paper links based on year, semester, and term
  const papersLinks = {
    "2019-20": {
      "1st": {
        "Semester 1": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem1-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem1-end",
        },
        "Semester 2": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem2-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem2-end",
        },
      },
      "2nd": {
        "Semester 3": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-end",
        },
        "Semester 4": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-end",
        },
      },
      "3rd": {
        "Semester 5": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-end",
        },
        "Semester 6": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-end",
        },
      },
    },
    "2020-21": {
      "1st": {
        "Semester 1": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem1-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem1-end",
        },
        "Semester 2": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem2-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem2-end",
        },
      },
      "2nd": {
        "Semester 3": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-end",
        },
        "Semester 4": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-end",
        },
      },
      "3rd": {
        "Semester 5": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-end",
        },
        "Semester 6": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-end",
        },
      },
    },
    "2021-22": {
      "1st": {
        "Semester 1": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem1-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem1-end",
        },
        "Semester 2": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem2-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem2-end",
        },
      },
      "2nd": {
        "Semester 3": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-end",
        },
        "Semester 4": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-end",
        },
      },
      "3rd": {
        "Semester 5": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-end",
        },
        "Semester 6": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-end",
        },
      },
    },
    "2022-23": {
      "1st": {
        "Semester 1": {
          "Mid Term": "https://drive.google.com/drive/u/0/folders/1LE4z3VFpRrmrXVEg_JAqjTkh7Dfif2H9?direction=a",
          "End Term": "https://drive.google.com/drive/u/0/folders/1LE4z3VFpRrmrXVEg_JAqjTkh7Dfif2H9?direction=a",
        },
        "Semester 2": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem2-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem2-end",
        },
      },
      "2nd": {
        "Semester 3": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-end",
        },
        "Semester 4": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-end",
        },
      },
      "3rd": {
        "Semester 5": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-end",
        },
        "Semester 6": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-end",
        },
      },
    },
    "2023-24": {
      "1st": {
        "Semester 1": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem1-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem1-end",
        },
        "Semester 2": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-1st-sem2-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-1st-sem2-end",
        },
      },
      "2nd": {
        "Semester 3": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem3-end",
        },
        "Semester 4": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-2nd-sem4-end",
        },
      },
      "3rd": {
        "Semester 5": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem5-end",
        },
        "Semester 6": {
          "Mid Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-mid",
          "End Term": "https://drive.google.com/your-link-2012-13-3rd-sem6-end",
        },
      },
    },
    // Similar structure for other years (2013-14, 2014-15, etc.)...
  };

  const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [paperAvailable, setPaperAvailable] = useState(true);

  const handleAcademicYearSelection = (year) => {
    setSelectedAcademicYear(year);
    setSelectedYear(null); // Reset year when academic year changes
    setSelectedSemester(null); // Reset semester when academic year changes
    setSelectedTerm(null); // Reset term when academic year changes
    setPaperAvailable(true); // Reset paper availability
  };

  const handleYearSelection = (year) => {
    setSelectedYear(year);
    setSelectedSemester(null); // Reset semester when year changes
    setSelectedTerm(null); // Reset term when year changes
    setPaperAvailable(true); // Reset paper availability
  };

  const handleSemesterSelection = (semester) => {
    setSelectedSemester(semester);
    setSelectedTerm(null); // Reset term when semester changes
    setPaperAvailable(true); // Reset paper availability
  };

  const handleTermSelection = (term) => {
    setSelectedTerm(term);
  };

  const handleDownload = () => {
    const url = papersLinks[selectedAcademicYear]?.[selectedYear]?.[selectedSemester]?.[selectedTerm];
    if (url) {
      window.open(url, "_blank");
      setPaperAvailable(true); // Reset paper availability if link is available
    } else {
      setPaperAvailable(false); // If no link found, set paper not available
    }
  };

  return (
    <section className="previous-year-papers-section">
      <div className="content-container">
        <h2 className="section-title">Previous Year Question Papers</h2>
        <p className="section-description">
          Enhance your preparation by practicing with previous years’ question papers.
        </p>

        {/* Academic Year Selection */}
        {!selectedAcademicYear && (
          <div className="selection-container">
            <h3>Select Academic Year</h3>
            <div className="year-buttons">
              {Object.keys(papersLinks).map((academicYear) => (
                <button
                  key={academicYear}
                  className="year-button"
                  onClick={() => handleAcademicYearSelection(academicYear)}
                >
                  {academicYear}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Year (1st, 2nd, 3rd) Selection */}
        {selectedAcademicYear && !selectedYear && (
          <div className="selection-container">
            <h3>Select Your Year</h3>
            <div className="year-buttons">
              {Object.keys(papersLinks[selectedAcademicYear]).map((year) => (
                <button
                  key={year}
                  className="year-button"
                  onClick={() => handleYearSelection(year)}
                >
                  {year} Year
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Semester Selection */}
        {selectedYear && !selectedSemester && (
          <div className="selection-container">
            <h3>Select Your Semester</h3>
            <div className="semester-buttons">
              {Object.keys(papersLinks[selectedAcademicYear][selectedYear]).map((semester) => (
                <button
                  key={semester}
                  className="semester-button"
                  onClick={() => handleSemesterSelection(semester)}
                >
                  {semester}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Term Selection */}
        {selectedSemester && !selectedTerm && (
          <div className="selection-container">
            <h3>Select Your Term</h3>
            <div className="term-buttons">
              {Object.keys(papersLinks[selectedAcademicYear][selectedYear][selectedSemester]).map((term) => (
                <button
                  key={term}
                  className="term-button"
                  onClick={() => handleTermSelection(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Show Download Button */}
        {selectedAcademicYear && selectedYear && selectedSemester && selectedTerm && (
          <div className="download-container">
            <h3>
              You have selected {selectedAcademicYear} - {selectedYear} - {selectedSemester} - {selectedTerm}
            </h3>
            <button className="download-button" onClick={handleDownload}>
              Download {selectedTerm} Paper
            </button>
          </div>
        )}

        {/* Show message if paper is not available */}
        {!paperAvailable && (
          <div className="not-available-message">
            <p>Papers are not available at this moment. Please check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PreviousYearPapers;
