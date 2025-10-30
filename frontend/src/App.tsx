import { ThemeProvider } from "./components/shared/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { TourGuide } from "./components/shared/TourGuide";
import { HelpButton } from "./components/shared/HelpButton";
import { Toaster } from "./components/ui/sonner";
import { AppRouter } from "./routes/AppRouter";
import NavbarPublic from "./components/Navbar/NavbarPublic";
import NavbarAuth from "./components/Navbar/NavbarAuth";
import { useAuth } from "./hooks/useAuth";
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

  return (
    <>
      {/* Navbar según el estado de autenticación */}
      {isAuthenticated ? <NavbarAuth /> : <NavbarPublic />}

      <main className="min-h-screen bg-pink-50">
        <AppRouter />
      </main>
    </>
  );
}
