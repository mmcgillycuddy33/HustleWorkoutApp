import { useNavigate } from "react-router-dom";
import "../../styles/theme.css";
import "../../styles/AthleteDashboardPage.css";

function AthleteDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="page-shell page-shell-center">
      <div className="page-card dashboard-card">
        <h1 className="page-title dashboard-title">Athlete Dashboard</h1>

        <p className="dashboard-message">
          Athlete created successfully.
        </p>

        <button
          onClick={() => navigate("/")}
          className="primary-button"
        >
          Create Another Athlete
        </button>
      </div>
    </div>
  );
}

export default AthleteDashboardPage;