import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import "../styles/AthleteDashboardPage.css";
import { useEffect, useState } from "react";

function AthleteDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("hustleUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("hustleUser");
    navigate("/");
  };

  return (
    <div className="page-shell page-shell-center">
      <div className="page-card dashboard-card">
        <h1 className="page-title dashboard-title">Athlete Dashboard</h1>

        <p className="dashboard-message">
          Welcome back, {user?.name || "Athlete"}!
        </p>

        <div className="button-row">
          <button onClick={() => navigate("/")} className="primary-button">
            Create Another Athlete
          </button>

          <button onClick={handleSignOut} className="secondary-button">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default AthleteDashboardPage;