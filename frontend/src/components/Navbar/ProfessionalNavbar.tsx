import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { AuthContext } from '../../context/AuthContext';

export function ProfessionalNavbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  // Determinar la página actual basándose en la ruta
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path.includes('/library')) return 'professional-library';
    if (path.includes('/chat')) return 'professional-chat';
    return 'professional-dashboard';
  };

  const currentPage = getCurrentPage();

  const navItems = [
    { id: 'professional-dashboard', label: 'Dashboard', icon: '📊', path: '/professional' },
    { id: 'professional-library', label: 'Biblioteca', icon: '📚', path: '/professional/library' },
    { id: 'professional-chat', label: 'Chat', icon: '💬', path: '/professional/chat' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    if (auth) {
      auth.logout();
    }
    navigate('/auth');
  };

  return (
    <>
      {/* Navbar principal */}
      <nav className="sticky top-0 z-50 bg-pink-50 dark:bg-gray-900 border-b border-pink-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              to="/professional-dashboard"
              className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-white"
            >
               <img
              src="/img/flower-2.svg"
              alt="El Jardín de las Respuestas"
              className="h-21 w-auto md:h-7"
            />
            </Link>

            {/* Navegación central */}
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className={`flex items-center gap-2 text-sm font-medium transition-all ${currentPage === item.id
                    ? 'text-pink-600 dark:text-pink-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400'
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Acciones a la derecha */}
            <div className="flex items-center gap-4">
              {/* Cambio de tema */}
              <button
                onClick={toggleTheme}
                className="rounded-lg p-2 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Cambiar tema"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Cerrar sesión */}
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Barra inferior del panel */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 border-b border-pink-200 dark:border-pink-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center gap-2 py-2 text-xs">
            <span className="font-medium text-pink-700 dark:text-pink-400">
              Panel Profesional
            </span>
            <span className="text-gray-500 dark:text-gray-500">|</span>
            <span className="text-gray-600 dark:text-gray-400">
              Voluntario Certificado
            </span>
          </div>
        </div>
      </div>
    </>
  );
}