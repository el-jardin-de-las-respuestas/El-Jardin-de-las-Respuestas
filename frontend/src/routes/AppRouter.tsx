// src/routes/AppRouter.tsx
import { Routes, Route, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// 📄 Pages
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
import ProfessionalChat from "@components/ProfessionalChat";
import ProfessionalLibrary from "@components/ProfessionalLibrary";


export const AppRouter = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();


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


  const ArticleDetailWrapper = () => {
    const { id } = useParams();

    return (
      <ArticleDetail 
        id={id ? parseInt(id, 10) : null} 
        onNavigate={handleNavigate}
      />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/resources"
        element={isAuthenticated ? <ResourcesPage/> : <Navigate to="/auth" />}
      />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/communication" element={<ComunicationPage />} />
      <Route path="/library" element={<LibraryEsi />} />
      <Route path="/article/:id" element={<ArticleDetailWrapper />} />
      <Route
        path="/professional-registration"
        element={<ProfessionalRegistrationPage />}
      />
      <Route path="/professional-login" element={<ProfessionalLoginPage />} />
      <Route path="/professional-dashboard" element={<ProfessionalLayout />} />
      <Route path="/professional/chat" element = {<ProfessionalChat/>} />
      <Route path="/professional/library" element = {<ProfessionalLibrary/>} />
    </Routes>
  );
};