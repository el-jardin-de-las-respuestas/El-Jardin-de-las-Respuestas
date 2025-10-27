import { useState } from 'react';
import { ThemeProvider } from './components/shared/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/shared/Header';
import { TourGuide } from './components/shared/TourGuide';
import { HelpButton } from './components/shared/HelpButton';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import type { Page } from './types';
import './styles/driver-custom.css';
// 📄 Pages
import { HomePage } from './components/pages/HomePage';
import { AuthPage } from './components/pages/AuthPage';
import { ResourcesPage } from './components/pages/ResourcesPage';
import { AboutPage } from './components/pages/AboutPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { ProfessionalRegistrationPage } from './components/pages/ProfessionalRegistrationPage';

import { BlogPage } from './components/pages/BlogPage';
import { ComunicationPage } from './components/ComunicationPage';
import { FAQPage } from './components/pages/FAQPage';
import { ProfilePage } from './components/ProfilePage';
// 🆕 Nuevas páginas
import LibraryEsi from "./components/LibraryEsi"; 
import ArticleDetail from "./components/ArticleDetail";


function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null); // 👈 Nuevo estado
  const { isAuthenticated, userName, login, register, logout } = useAuth();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setCurrentPage('home');
  };

  const handleRegister = (email: string, password: string, name: string) => {
    register(email, password, name);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  // 👇 Modificamos para aceptar un id opcional
  const handleNavigate = (page: string, id?: number) => {
    const protectedPages = [
      'resources', 'community', 'blog', 'profile', 'cycle-tracker', 'communication'
    ];

    if (protectedPages.includes(page) && !isAuthenticated) {
      setCurrentPage('auth');
      toast.error('Debes iniciar sesión para acceder a este contenido');
      return;
    }

    // 👇 Guardamos el id si lo hay
    if (id) setSelectedArticleId(id);

    setCurrentPage(page as Page);
  };


  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
  
      case "auth":
        return <AuthPage onLogin={handleLogin} onRegister={handleRegister} />;
      case 'professional-registration':
        return <ProfessionalRegistrationPage />;
        case 'resources': 
        return <ResourcesPage />;
  
      case "about":
        return <AboutPage />;
  
      case "community":
        return <CommunityPage />;
  
      case "blog":
        return <BlogPage />;
      case 'faq':
        return <FAQPage />;
  
      case "profile":
        return <ProfilePage userName={userName} />;
  
      case "communication":
        return <ComunicationPage />;
  
      // 🆕 nuevas rutas
      case "library":
        return <LibraryEsi onNavigate={handleNavigate} />; // ✅ pasa la función onNavigate
  
      case "article":
        return <ArticleDetail id={selectedArticleId} onNavigate={handleNavigate} />; // ✅ pasa el id y onNavigate
  
      default:
        return <HomePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        userName={userName}
      />
      <TourGuide currentPage={currentPage} />
      <main>{renderPage()}</main>
      <HelpButton />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}