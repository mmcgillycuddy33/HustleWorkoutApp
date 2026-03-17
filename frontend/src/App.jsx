import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAthletePage from "./components/pages/CreateAthletePage";
import AthleteDashboardPage from "./components/pages/AthleteDashboardPage";
import AthletesPage from "./components/pages/AthletesPage";
import Header from "./components/pages/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<CreateAthletePage />} />
        <Route path="/dashboard" element={<AthleteDashboardPage />} />
        <Route path="/athletes" element={<AthletesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;