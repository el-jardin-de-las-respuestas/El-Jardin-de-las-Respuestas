/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

// ✅ Este es el contexto real que usará useAuth()
export const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Este es el proveedor que envolverá tu aplicación
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  // Simular sesión persistente (opcional)
  useEffect(() => {
    const saved = localStorage.getItem('auth');
    if (saved === 'true') setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
