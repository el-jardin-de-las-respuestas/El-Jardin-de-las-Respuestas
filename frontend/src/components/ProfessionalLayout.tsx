import { ProfessionalNavbar } from "./Navbar/ProfessionalNavbar";
import ProfessionalDashboard from "../components/ProfessionalDashboard";
import ProfessionalLibrary from "../components/ProfessionalLibrary";
import ProfessionalChat from "../components/ProfessionalChat";
import { Routes, Route } from "react-router-dom";

export default function ProfessionalLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <ProfessionalNavbar />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<ProfessionalDashboard />} />
          <Route path="/library" element={<ProfessionalLibrary />} />
          <Route path="/chat" element={<ProfessionalChat />} />
        </Routes>
      </main>
    </div>
  );
}