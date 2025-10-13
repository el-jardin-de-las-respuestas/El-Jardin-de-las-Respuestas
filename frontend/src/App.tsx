import { useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import "./styles/driver.css";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { AuthPage } from "./components/AuthPage";
import { BibliotecaPage } from "./components/LibraryPage";
import { ComunicacionPage } from "./components/ComunicationPage";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage("home");
    toast.success("¡Bienvenidx a El Jardín de las Respuestas!", {
      description: "Tu espacio seguro de aprendizaje",
    });
    
    // Start tour after a short delay
    setTimeout(() => {
      if (!hasSeenTour) {
        startTour();
      }
    }, 1000);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage("home");
    toast.info("Has cerrado sesión correctamente");
  };

  const handleNavigate = (page: string) => {
    // Redirect to auth if trying to access protected pages
    if (!isAuthenticated && (page === "biblioteca" || page === "comunicacion")) {
      setCurrentPage("login");
      toast.info("Por favor inicia sesión para acceder a esta sección");
      return;
    }
    setCurrentPage(page);
  };

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      showButtons: ["next", "previous", "close"],
      nextBtnText: "Siguiente →",
      prevBtnText: "← Anterior",
      doneBtnText: "¡Entendido!",
      progressText: "{{current}} de {{total}}",
      steps: [
        {
          element: "#cta-register",
          popover: {
            title: "🌸 Bienvenidx al Jardín",
            description:
              "Este es un espacio seguro donde puedes aprender sobre Educación Sexual Integral sin juicios ni tabúes.",
            side: "bottom",
            align: "center",
          },
        },
        {
          element: "#biblioteca-preview",
          popover: {
            title: "📚 Biblioteca ESI",
            description:
              "Accede a contenido educativo validado por profesionales. Artículos, guías y recursos sobre todos los temas de ESI.",
            side: "top",
            align: "center",
          },
        },
        {
          element: "#chat-preview",
          popover: {
            title: "💬 Chat con Ginecólogas",
            description:
              "Conecta en privado con profesionales de la salud. Tus conversaciones son confidenciales y moderadas para tu seguridad.",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#forum-preview",
          popover: {
            title: "👥 Foro Comunitario",
            description:
              "Comparte experiencias y aprende de otrxs en un ambiente respetuoso. Todos los mensajes pasan por un filtro de moderación por IA.",
            side: "right",
            align: "center",
          },
        },
      ],
      onDestroyStarted: () => {
        setHasSeenTour(true);
        driverObj.destroy();
      },
    });

    driverObj.drive();
  };

  const renderPage = () => {
    if (!isAuthenticated && (currentPage === "login" || currentPage === "registro")) {
      return <AuthPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case "biblioteca":
        return <BibliotecaPage />;
      case "comunicacion":
        return <ComunicacionPage />;
      default:
        return <HomePage onNavigate={handleNavigate} onStartTour={startTour} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      {renderPage()}
      <Toaster position="top-center" />
    </div>
  );
}