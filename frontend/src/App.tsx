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
import "./styles/globals.css";

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

  return (
    <>
      {isAuthenticated ? <NavbarAuth /> : <NavbarPublic />}
      <main className="min-h-screen bg-pink-50 pt-[64px]">
        <AppRouter />
      </main>
    </>
  );
}
