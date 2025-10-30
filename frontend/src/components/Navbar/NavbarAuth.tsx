import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { AuthContext } from "../../context/AuthContext";

const NavbarAuth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (auth) auth.logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-pink-200 dark:bg-gray-900 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white"
            data-tour="logo"
          >
            🌸 El Jardín de las Respuestas
          </Link>

          {/* Menú escritorio */}
          <div className="hidden md:flex items-center gap-6 mx-auto">
            <Link to="/" className="hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-inicio">
              Inicio
            </Link>
            <Link to="/resources" className="hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-resources">
              Recursos
            </Link>
            <Link to="/community" className="hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-community">
              Comunidad
            </Link>
            <Link to="/library" className="hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-library">
              Biblioteca
            </Link>
            <Link to="/faq" className="hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-faq">
              FAQ
            </Link>
          </div>

          {/* Botón cerrar sesión + toggle theme */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1 rounded hover:bg-pink-100 dark:hover:bg-gray-800"
              aria-label="Toggle Theme"
              data-tour="toggle-theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-pink-400 text-white rounded hover:bg-pink-300 transition-colors"
              data-tour="btn-logout"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Botón hamburguesa móvil */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1 rounded hover:bg-pink-100 dark:hover:bg-gray-800"
              aria-label="Toggle Theme"
              data-tour="toggle-theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-pink-100 dark:bg-gray-800 px-4 pt-2 pb-4 space-y-2">
          <Link to="/" className="block hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-inicio">
            Inicio
          </Link>
          <Link to="/resources" className="block hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-resources">
            Recursos
          </Link>
          <Link to="/community" className="block hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-community">
            Comunidad
          </Link>
          <Link to="/library" className="block hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-library">
            Biblioteca
          </Link>
          <Link to="/faq" className="block hover:text-pink-400 dark:hover:text-pink-300" data-tour="nav-faq">
            FAQ
          </Link>

          <div className="flex gap-2 items-center">
            <button
              onClick={toggleTheme}
              className="p-1 rounded hover:bg-pink-100 dark:hover:bg-gray-800"
              aria-label="Toggle Theme"
              data-tour="toggle-theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-pink-400 text-white rounded hover:bg-pink-300 transition-colors"
              data-tour="btn-logout"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarAuth;
