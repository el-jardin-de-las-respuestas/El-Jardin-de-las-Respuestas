import { useState, useEffect } from 'react'; // Importa useEffect
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
// 🆕 Nuevas páginas
import { ProfessionalRegistrationPage } from './components/pages/ProfessionalRegistrationPage';
import { ProfessionalLoginPage } from './components/pages/ProfessionalLoginPage';
// Se elimina la importación de ProfessionalNavbar porque App.tsx ya no la usa directamente
// import { ProfessionalNavbar } from './components/Navbar/ProfessionalNavbar';

import { BlogPage } from './components/pages/BlogPage';
import { ComunicationPage } from './components/ComunicationPage';
import { FAQPage } from './components/pages/FAQPage';
import { ProfilePage } from './components/ProfilePage';
import ProfessionalLayout from './components/ProfessionalLayout';

// 🆕 Nuevas páginas
import LibraryEsi from "./components/LibraryEsi";
import ArticleDetail from "./components/ArticleDetail";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [isProfessional, setIsProfessional] = useState(false);
  
  // Se usa useEffect para leer de localStorage solo una vez al cargar
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType === 'professional') {
      setIsProfessional(true);
      // Si ya está logueado como profesional, lo mandamos a su panel
      setCurrentPage('professional-dashboard');
    }
  }, []);
  
  const { isAuthenticated, userName, login, register, logout } = useAuth();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setCurrentPage('home');
  };

  const handleRegister = (email: string, password: string, name: string) => {
    register(email, password, name);
    setCurrentPage('home');
  };

  // ✅ CAMBIO 1: Se añade la navegación al dashboard al iniciar sesión como profesional
  const handleProfessionalLogin = () => {
    setIsProfessional(true);
    localStorage.setItem('userType', 'professional');
    // Esto es clave: te lleva a la página correcta después del login
    setCurrentPage('professional-dashboard'); 
  };

  const handleLogout = () => {
    logout();
    setIsProfessional(false);
    localStorage.removeItem('userType');
    setCurrentPage('home');
  };

  const handleNavigate = (page: string, id?: number) => {
    const protectedPages = [
      'resources', 'community', 'blog', 'profile', 'cycle-tracker', 'communication'
    ];

    if (protectedPages.includes(page) && !isAuthenticated) {
      setCurrentPage('auth');
      toast.error('Debes iniciar sesión para acceder a este contenido');
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
        return <AuthPage onLogin={handleLogin} onRegister={handleRegister} />;

      case 'professional-registration':
        return <ProfessionalRegistrationPage onNavigate={handleNavigate} />;
      
      case 'professional-login':
        return <ProfessionalLoginPage
          onNavigate={handleNavigate}
          onProfessionalLogin={handleProfessionalLogin}
        />;

      case 'professional-dashboard':
        return <ProfessionalLayout onLogout={handleLogout} />;

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

      case "library":
        return <LibraryEsi onNavigate={handleNavigate} />;

      case "article":
        return <ArticleDetail id={selectedArticleId} onNavigate={handleNavigate} />;

      default:
        return <HomePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors">
      
      {!isProfessional && (
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          userName={userName}
        />
      )}

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