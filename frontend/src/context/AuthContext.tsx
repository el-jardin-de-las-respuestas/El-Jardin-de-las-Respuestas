import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import type { ReactNode } from "react";
import type { DecodedToken } from "@/types/decodedtoken";


type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (jwt: string) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
    const decoded = jwtDecode<DecodedToken>(jwt);
    setUser(decoded);
    setLoading(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(savedToken);
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setToken(savedToken);
          setUser(decoded);
        }
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
