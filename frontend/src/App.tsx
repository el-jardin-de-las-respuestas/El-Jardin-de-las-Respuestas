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
//pages
import { HomePage } from './components/pages/HomePage';
import { AuthPage } from './components/pages/AuthPage';
import { CatalogsPage } from './components/pages/CatalogsPage';
import { ResourcesPage } from './components/ResourcesPage';
import { AboutPage } from './components/pages/AboutPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { BlogPage } from './components/pages/BlogPage';
import { TestimonialsPage } from './components/pages/TestimonialsPage';
import { ComunicationPage } from './components/ComunicationPage';
import { FAQPage } from './components/pages/FAQPage';
import { ProfilePage } from './components/ProfilePage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isAuthenticated, userName, login, register, logout } = useAuth();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    setCurrentPage('catalogs');
  };

  const handleRegister = (email: string, password: string, name: string) => {
    register(email, password, name);
    setCurrentPage('catalogs');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const handleNavigate = (page: string) => {
    const protectedPages = ['catalogs', 'resources', 'community', 'blog', 'profile', 'cycle-tracker', 'communication'];
    if (protectedPages.includes(page)) {
      if (!isAuthenticated) {
        setCurrentPage('auth');
        toast.error('Debes iniciar sesión para acceder a este contenido');
        return;
      }
    }
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onRegister={handleRegister} />;
      case 'catalogs':
        return <CatalogsPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'about':
        return <AboutPage />;
      case 'community':
        return <CommunityPage />;
      case 'blog':
        return <BlogPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'faq':
        return <FAQPage />;
      case 'profile':
        return <ProfilePage userName={userName} />;
      case 'cycle-tracker':
        return <CycleTrackerPage />;
      case 'comunication':           
      return <ComunicationPage />; 
      default:
        return <HomePage onNavigate={handleNavigate} isAuthenticated={isAuthenticated} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
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