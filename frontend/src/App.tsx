import { useEffect } from "react";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { HelpButton } from "./components/shared/HelpButton";
import { Toaster } from "./components/ui/sonner";
import { AppRouter } from "./routes/AppRouter";
import NavbarPublic from "./components/Navbar/NavbarPublic";
import NavbarAuth from "./components/Navbar/NavbarAuth";
import { useAuth } from "./hooks/useAuth";
import { useTourPublic } from "./hooks/useTourPublic";
import { useTourAuth } from "./hooks/useTourAuth";
import 'driver.js/dist/driver.css';
import "../src/styles/globals.css";
//nuevo
import { useLocation } from "react-router-dom";


export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Content />
        <HelpButton />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

function Content() {
  const { isAuthenticated } = useAuth();
  //nuevo
  const location = useLocation();

  const publicTour = useTourPublic();
  const authTour = useTourAuth();


  useEffect(() => {
    if (isAuthenticated) {
      if (authTour.shouldShowTour()) authTour.startWelcomeTour();
    } else {
      if (publicTour.shouldShowTour()) publicTour.startWelcomeTour();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  //nuevo
   const isDashboard = location.pathname.startsWith('/professional') || location.pathname.startsWith('/user');

  return (
    <>
      {!isDashboard && (isAuthenticated ? <NavbarAuth /> : <NavbarPublic />)}
      <main className={`min-h-screen bg-pink-50 ${!isDashboard ? 'pt-[64px]' : ''}`}>
        <AppRouter />
      </main>
    </>
  );
}
