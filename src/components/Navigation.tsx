import { Button } from "./ui/button";
import { Flower2, Home, BookOpen, MessageCircle, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function Navigation({
  currentPage,
  onNavigate,
  isAuthenticated,
  onLogout,
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "biblioteca", label: "Biblioteca", icon: BookOpen },
    { id: "comunicacion", label: "Comunicación", icon: MessageCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-secondary/40 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="flex size-12 items-center justify-center rounded-[1.5rem] bg-secondary/30">
              <Flower2 className="size-6 text-primary" />
            </div>
            <span className="hidden sm:block">El Jardín de las Respuestas</span>
          </button>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => onNavigate(item.id)}
                    className={`rounded-[1.5rem] ${
                      isActive ? "shadow-[0_4px_20px_var(--color-shadow-soft)]" : ""
                    }`}
                  >
                    <Icon className="mr-2 size-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          )}

          {/* Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={onLogout}
                className="rounded-[1.5rem] border-2 border-secondary/40"
              >
                Cerrar Sesión
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate("login")}
                  className="rounded-[1.5rem]"
                >
                  Ingresar
                </Button>
                <Button
                  onClick={() => onNavigate("registro")}
                  className="rounded-[1.5rem] shadow-[0_4px_20px_var(--color-shadow-soft)]"
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t-2 border-secondary/40 py-4 md:hidden">
            <div className="space-y-2">
              {isAuthenticated && (
                <>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <Button
                        key={item.id}
                        variant={isActive ? "default" : "ghost"}
                        onClick={() => {
                          onNavigate(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full justify-start rounded-[1.5rem] ${
                          isActive ? "shadow-[0_4px_20px_var(--color-shadow-soft)]" : ""
                        }`}
                      >
                        <Icon className="mr-2 size-4" />
                        {item.label}
                      </Button>
                    );
                  })}
                  <div className="border-t-2 border-secondary/40 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full rounded-[1.5rem] border-2 border-secondary/40"
                    >
                      Cerrar Sesión
                    </Button>
                  </div>
                </>
              )}
              {!isAuthenticated && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      onNavigate("login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded-[1.5rem]"
                  >
                    Ingresar
                  </Button>
                  <Button
                    onClick={() => {
                      onNavigate("registro");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded-[1.5rem] shadow-[0_4px_20px_var(--color-shadow-soft)]"
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}