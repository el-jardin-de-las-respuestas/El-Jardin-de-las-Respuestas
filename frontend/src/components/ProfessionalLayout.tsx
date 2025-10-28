import { useState } from "react";
import { ProfessionalNavbar } from "./Navbar/ProfessionalNavbar";
import ProfessionalDashboard from "../components/ProfessionalDashboard";
import ProfessionalLibrary from "../components/ProfessionalLibrary";
import ProfessionalChat from "../components/ProfessionalChat";

interface ProfessionalLayoutProps {
  onLogout: () => void;
}
export default function ProfessionalLayout({ onLogout }: ProfessionalLayoutProps) {

  const [currentPage, setCurrentPage] = useState("professional-dashboard");

  const handleNavigate = (page: string) => setCurrentPage(page);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    onLogout(); 
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <ProfessionalNavbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <main className="p-6">
        {currentPage === "professional-dashboard" && (
          <ProfessionalDashboard onNavigate={handleNavigate} />
        )}
        {currentPage === "professional-library" && (
          <ProfessionalLibrary onBack={() => handleNavigate("professional-dashboard")} />
        )}
        {currentPage === "professional-chat" && (
          <ProfessionalChat onBack={() => handleNavigate("professional-dashboard")} />
        )}
      </main>
    </div>
  );
}