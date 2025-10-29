import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/shared/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import { Header } from "./components/shared/Header";
import { TourGuide } from "./components/shared/TourGuide";
import { HelpButton } from "./components/shared/HelpButton";
import { Toaster } from "./components/ui/sonner";
import { AppRouter } from "./routes/AppRouter";
import "./styles/globals.css";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Header
            currentPage="home"
            onNavigate={() => { }}
            isAuthenticated={false}
            onLogout={() => { }}
            userName="Invitado"
          />
          <TourGuide currentPage="home" />
          <main>
            <AppRouter />
          </main>
          <HelpButton />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
