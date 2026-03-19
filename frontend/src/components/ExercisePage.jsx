import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";
import "../styles/ExercisePage.css";

function ExercisePage() {
  const navigate = useNavigate();

  // Shared State Variables
  const [workoutType, setWorkoutType] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  // Swimming Independent State Variables
  const [distanceMeters, setDistanceMeters] = useState("");
  const [swimTime, setSwimTime] = useState("");
  const [stroke, setStroke] = useState("");

  // Running Independent State Variables
  const [measurement, setMeasurement] = useState("");
  const [distanceRun, setDistanceRun] = useState("");
  const [runHours, setRunHours] = useState("");
  const [runMinutes, setRunMinutes] = useState("");
  const [runSeconds, setRunSeconds] = useState("");
  const [terrain, setTerrain] = useState("");
  const [calories, setCalories] = useState("");

  // Lifting Independent State Variables
  const [exerciseName, setExerciseName] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedUser = localStorage.getItem("hustleUser");

    if (!savedUser) {
      setMessage("No signed-in user found.");
      return;
    }

    const user = JSON.parse(savedUser);

    let endpoint = "";
    let payload = {};

    if (workoutType === "swimming") {
      endpoint = "http://127.0.0.1:8000/workouts/swimming/";
      payload = {
        athlete_id: user.athlete_id,
        date,
        distance_meters: Number(distanceMeters),
        time_minutes: Number(swimTime),
        stroke,
      };
    } else if (workoutType === "running") {
      if (runMinutes === "" || runSeconds === "") {
        setMessage("Minutes and seconds are required.");
        return;
      }

      endpoint = "http://127.0.0.1:8000/workouts/running/";
      payload = {
        athlete_id: user.athlete_id,
        date,
        measurement,
        distance_run: Number(distanceRun),
        duration_seconds:
          Number(runHours || 0) * 3600 +
          Number(runMinutes) * 60 +
          Number(runSeconds),
        terrain,
        calories: Number(calories),
      };
    } else if (workoutType === "lifting") {
      endpoint = "http://127.0.0.1:8000/workouts/lifting/";
      payload = {
        athlete_id: user.athlete_id,
        date,
        exercise: exerciseName,
        weight_kg: Number(weightKg),
        reps: Number(reps),
        sets: Number(sets),
      };
    } else {
      setMessage("Please select a workout type.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save workout.");
      }

      const data = await response.json();

      setWorkoutType("");
      setDate("");
      setDistanceMeters("");
      setSwimTime("");
      setStroke("");
      setMeasurement("");
      setDistanceRun("");
      setRunHours("");
      setRunMinutes("");
      setRunSeconds("");
      setTerrain("");
      setCalories("");
      setExerciseName("");
      setWeightKg("");
      setReps("");
      setSets("");

      if (payload.duration_seconds !== undefined) {
        navigate("/run");
      } else {
        setMessage("Workout added successfully.");
      }
    } catch (error) {
      setMessage("Error saving workout.");
      console.error(error);
    }
  };

  return (
    <div className="page-shell page-shell-top">
      <div className="page-card" style={{ maxWidth: "700px" }}>
        <h1 className="page-title">Exercise</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Workout Type</label>
            <select
              value={workoutType}
              onChange={(e) => setWorkoutType(e.target.value)}
            >
              <option value="">Select a workout</option>
              <option value="swimming">Swimming</option>
              <option value="running">Running</option>
              <option value="lifting">Lifting</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {workoutType === "swimming" && (
            <div style={{ marginTop: "24px" }}>
              <div className="form-group">
                <label>Distance (meters)</label>
                <input
                  type="number"
                  value={distanceMeters}
                  onChange={(e) => setDistanceMeters(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Time (minutes)</label>
                <input
                  type="number"
                  step="0.01"
                  value={swimTime}
                  onChange={(e) => setSwimTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Stroke</label>
                <input
                  value={stroke}
                  onChange={(e) => setStroke(e.target.value)}
                />
              </div>
            </div>
          )}

          {workoutType === "running" && (
            <div style={{ marginTop: "24px" }}>
              <div className="form-group">
                <label>Measurement</label>
                <select
                  value={measurement}
                  onChange={(e) => setMeasurement(e.target.value)}
                >
                  <option value="">Select unit</option>
                  <option value="miles">Miles</option>
                  <option value="kilometers">Kilometers</option>
                </select>
              </div>

              <div className="form-group">
                <label>Distance</label>
                <input
                  type="number"
                  value={distanceRun}
                  onChange={(e) => setDistanceRun(e.target.value)}
                />
              </div>

              {/* ✅ Time Section */}
              <div className="form-group">
                <label>Time</label>

                <div className="time-row">
                  <div className="time-box">
                    <label>Hours</label>
                    <input
                      type="number"
                      min="0"
                      value={runHours}
                      onChange={(e) => setRunHours(e.target.value)}
                    />
                  </div>

                  <div className="time-box">
                    <label>Minutes *</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={runMinutes}
                      onChange={(e) => setRunMinutes(e.target.value)}
                    />
                  </div>

                  <div className="time-box">
                    <label>Seconds *</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={runSeconds}
                      onChange={(e) => setRunSeconds(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Terrain</label>
                <select
                  value={terrain}
                  onChange={(e) => setTerrain(e.target.value)}
                >
                  <option value="">Select Terrain</option>
                  <option value="On-Road">On-Road</option>
                  <option value="Off-Road">Off-Road</option>
                  <option value="Mixed">Mixed</option>
                  <option value="Indoor Track">Indoor Track</option>
                  <option value="Outdoor Track">Outdoor Track</option>
                </select>
              </div>

              <div className="form-group">
                <label>Calories</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                />
              </div>
            </div>
          )}

          <button type="submit" className="exercise-submit">
            Save Workout
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
}

export default ExercisePage;