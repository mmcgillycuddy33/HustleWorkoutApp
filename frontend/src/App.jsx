import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAthletePage from "./components/CreateAthletePage";
import AthletesPage from "./components/AthletesPage";
import Header from "./components/Header";
import AthleteDashboardPage from "./components/AthleteDashboardPage";
import ExercisePage from "./components/ExercisePage";
import RunPage from "./components/Sports/RunPage";
import SettingsPage from "./components/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CreateAthletePage />} />
        <Route path="/athletes" element={<AthletesPage />} />
        <Route path="/dashboard" element={<AthleteDashboardPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/run" element={<RunPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;