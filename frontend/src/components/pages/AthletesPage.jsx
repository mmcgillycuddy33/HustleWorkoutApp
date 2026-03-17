import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/theme.css";
import "../../styles/AthletesPage.css";

function AthletesPage() {
  const [athletes, setAthletes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/athletes/")
      .then((response) => response.json())
      .then((data) => {
        setAthletes(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  return (
    <div className="page-shell page-shell-top">
      <div className="page-card athletes-card">
        <h1 className="page-title athletes-title">All Athletes</h1>

        <button
          onClick={() => navigate("/")}
          className="secondary-button athletes-back-button"
        >
          Back to Create Athlete
        </button>

        {athletes.length === 0 ? (
          <p className="athletes-empty">No athletes found.</p>
        ) : (
          <div className="athletes-list">
            {athletes.map((athlete) => (
              <div key={athlete.id} className="athlete-row">
                <div className="athlete-name">{athlete.name}</div>
                <div className="athlete-age">
                  Age: {athlete.age ?? "Not provided"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AthletesPage;