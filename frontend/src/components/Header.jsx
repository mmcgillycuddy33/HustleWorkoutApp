import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showExerciseMenu, setShowExerciseMenu] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("hustleUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  return (
    <div className="header">
      <h1 className="header-logo" onClick={() => navigate("/")}>
        HUSTLE
      </h1>

      {user && (
        <div className="header-nav">
          <button
            className="header-tab"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <div
            className="header-dropdown"
            onMouseEnter={() => setShowExerciseMenu(true)}
            onMouseLeave={() => setShowExerciseMenu(false)}
          >
            <button
              className="header-tab"
              onClick={() => navigate("/exercise")}
            >
              Exercise
            </button>

            {showExerciseMenu && (
              <div className="header-dropdown-menu">
                <button
                  className="header-dropdown-item"
                  onClick={() => navigate("/run")}
                >
                  Run
                </button>
              </div>
            )}
          </div>

          <button
            className="header-tab"
            onClick={() => navigate("/settings")}
          >
            Settings
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;