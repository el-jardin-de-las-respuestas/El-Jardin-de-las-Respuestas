import { useState, useEffect } from "react";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import { useAuth } from "./context/AuthContext";
import { Header } from "./components/shared/Header";
import { TourGuide } from "./components/shared/TourGuide";
import { HelpButton } from "./components/shared/HelpButton";
import { Toaster, toast } from "sonner";
import type { Page } from "./types";

// 📄 Páginas
import { HomePage } from "./components/pages/HomePage";
import { AuthPage } from "./components/pages/AuthPage";
import { ResourcesPage } from "./components/pages/ResourcesPage";
import { AboutPage } from "./components/pages/AboutPage";
import { CommunityPage } from "./components/pages/CommunityPage";
import { ProfessionalRegistrationPage } from "./components/pages/ProfessionalRegistrationPage";
import { ProfessionalLoginPage } from "./components/pages/ProfessionalLoginPage";
import { ComunicationPage } from "./components/ComunicationPage";
import { FAQPage } from "./components/pages/FAQPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import ProfessionalLayout from "./components/ProfessionalLayout";
import LibraryEsi from "./components/LibraryEsi";
import ArticleDetail from "./components/ArticleDetail";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [isProfessional, setIsProfessional] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType === "professional") {
      setIsProfessional(true);
      setCurrentPage("professional-dashboard");
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    login(email);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    logout();
    setIsProfessional(false);
    localStorage.removeItem("userType");
    setCurrentPage("home");
  };

  const handleNavigate = (page: string, id?: number) => {
    const protectedPages = ["resources", "community", "blog", "profile", "cycle-tracker", "communication"];

    if (protectedPages.includes(page) && !isAuthenticated) {
      setCurrentPage("auth");
      toast.error("Debes iniciar sesión para acceder a este contenido");
      return;
    }

    if (id) setSelectedArticleId(id);
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
      case "auth":
        return <AuthPage onLogin={handleLogin} />;
      case "professional-registration":
        return <ProfessionalRegistrationPage onNavigate={handleNavigate} />;
      case "professional-login":
        return <ProfessionalLoginPage onNavigate={handleNavigate} />;
      case "professional-dashboard":
        return <ProfessionalLayout onLogout={handleLogout} />;
      case "resources":
        return <ResourcesPage />;
      case "about":
        return <AboutPage />;
      case "community":
        return <CommunityPage />;
      case "blog":
        return <LibraryEsi onNavigate={handleNavigate} />;
      case "faq":
        return <FAQPage />;
      case "communication":
        return <ComunicationPage />;
      case "profile":
        return <ProfilePage />;
      case "article":
        return <ArticleDetail id={selectedArticleId} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors">
        {!isProfessional && (
          <Header
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        )}
        <TourGuide currentPage={currentPage} />
        <main>{renderPage()}</main>
        <HelpButton />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default AppContent;
