import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Pages
import { HomePage } from "../components/pages/HomePage";
import { AuthPage } from "../components/pages/AuthPage";
import { ResourcesPage } from "../components/pages/ResourcesPage";
import { AboutPage } from "../components/pages/AboutPage";
import { CommunityPage } from "../components/pages/CommunityPage";
import { FAQPage } from "../components/pages/FAQPage";
import { ProfessionalRegistrationPage } from "../components/pages/ProfessionalRegistrationPage";
import { ProfessionalLoginPage } from "../components/pages/ProfessionalLoginPage";

import ProfessionalLayout from "../components/ProfessionalLayout";
import LibraryEsi from "../components/LibraryEsi";
import ArticleDetail from "../components/ArticleDetail";
import { ComunicationPage } from "../components/ComunicationPage";

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Función para navegar
  const routesMap: Record<string, string> = {
    library: "/library",
    communication: "/communication",
    community: "/community",
    registro: "/professional-registration",
    home: "/",
  };

  const handleNavigate = (page: string) => {
    const route = routesMap[page] || "/";
    navigate(route);
  };

  // Wrapper para ArticleDetail
  const ArticleDetailWrapper = () => {
    const { id } = useParams<{ id: string }>(); // id es string | undefined
    const articleId = id ? parseInt(id, 10) : null; // convertimos a number | null

    return <ArticleDetail id={articleId} onNavigate={handleNavigate} />;
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/resources"
        element={isAuthenticated ? <ResourcesPage /> : <Navigate to="/auth" />}
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/communication" element={<ComunicationPage />} />

      {/* Biblioteca */}
      <Route path="/library" element={<LibraryEsi />} />

      {/* Detalle artículo */}
      <Route path="/article/:id" element={<ArticleDetailWrapper />} />

      {/* Profesional */}
      <Route path="/professional-registration" element={<ProfessionalRegistrationPage />} />
      <Route path="/professional-login" element={<ProfessionalLoginPage />} />
      <Route path="/professional-dashboard" element={<ProfessionalLayout />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
