import { Moon, Sun, Menu, X, Flower2, User } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  userName?: string;
};

export function Header({ currentPage, onNavigate, isAuthenticated, onLogout, userName }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const navigate = useNavigate();
  const navItems = isAuthenticated
    ? [
        { id: 'home', label: 'Inicio' },
        { id: 'resources', label: 'Recursos' },
        { id: 'community', label: 'Comunidad' },
        { id: 'blog', label: 'Biblioteca' },
        { id: 'faq', label: 'FAQ' },
      ]
    : [
        { id: 'home', label: 'Inicio' },
        { id: 'about', label: 'Acerca de' },
        { id: 'faq', label: 'FAQ' },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-[rgba(211,167,201,0.6)] dark:bg-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          data-tour="logo"
        >
          <Flower2 className="h-6 w-6 text-pink-500 dark:text-pink-400" />
          <span className="font-semibold text-lg text-black dark:text-white">El Jardín de las Respuestas</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`transition-colors hover:text-primary text-sm ${
                currentPage === item.id ? 'text-primary' : 'text-muted-foreground dark:text-gray-300'
              }`}
              data-tour={`nav-${item.id}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            data-tour="theme-toggle"
            className="text-black dark:text-white"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {isAuthenticated ? (
            <Button variant="outline" onClick={onLogout} className="hidden md:flex">
              Cerrar sesión
            </Button>
          ) : (
            <Button onClick={() => onNavigate('auth')} className="hidden md:flex">
              Ingresar
            </Button>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-black dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-background dark:bg-gray-900">
          <nav className="container mx-auto flex flex-col gap-3 p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {isAuthenticated && userName && (
              <div className="pb-3 border-b border-border">
                <p className="text-sm text-muted-foreground dark:text-gray-300">Hola, {userName}</p>
              </div>
            )}
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left transition-colors hover:text-primary px-2 py-1 ${
                  currentPage === item.id ? 'text-primary' : 'text-muted-foreground dark:text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated && (
              <>
                <button
                  onClick={() => {
                    onNavigate('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left transition-colors hover:text-primary px-2 py-1 text-muted-foreground dark:text-gray-300 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Mi Perfil
                </button>
                <div className="pt-2 border-t border-border">
                  <Button variant="outline" onClick={onLogout} className="w-full">
                    Cerrar sesión
                  </Button>
                </div>
              </>
            )}
            {!isAuthenticated && (
              <Button
                onClick={() => {
                  onNavigate('auth');
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2"
              >
                Ingresar
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
