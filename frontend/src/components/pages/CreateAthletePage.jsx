import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/theme.css";
import "../../styles/CreateAthletePage.css";

function CreateAthletePage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("create");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const athleteData = {
      name,
      age: age ? Number(age) : null,
      email,
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/athletes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(athleteData),
      });

      if (!response.ok) {
        throw new Error("Failed to create athlete");
      }

      const data = await response.json();

      setMessage(`Athlete created: ${data.name} (ID: ${data.id})`);
      setName("");
      setAge("");
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (error) {
      setMessage("Error creating athlete");
      console.error(error);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setMessage("Sign in flow coming next.");
  };

  return (
    <div className="page-shell page-shell-center">
      <div className="page-card create-athlete-card">
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${activeTab === "create" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("create");
              setMessage("");
            }}
          >
            Sign Up
          </button>

          <button
            type="button"
            className={`auth-tab ${activeTab === "signin" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("signin");
              setMessage("");
            }}
          >
            Sign In
          </button>
        </div>

        {activeTab === "create" && (
          <div className="create-athlete-banner">
            New Hustler? Fill out the form below to create your athlete account.
          </div>
        )}

        <h2 className="page-title create-athlete-title">
          {activeTab === "create" ? "Create Athlete Account" : "Sign In"}
        </h2>

        {activeTab === "create" ? (
          <form onSubmit={handleSubmit} className="create-athlete-form">
            <div className="form-group">
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="button-row">
              <button type="submit" className="primary-button">
                Create Athlete
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/athletes")}
              >
                View All Athletes
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignIn} className="create-athlete-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="button-row">
              <button type="submit" className="primary-button">
                Sign In
              </button>
            </div>
          </form>
        )}

        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
}

export default CreateAthletePage;