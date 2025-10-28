import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (jwt: string) => {
        setToken(jwt);
        setIsAuthenticated(true);
        localStorage.setItem("token", jwt);
    };
    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    };
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
            setIsAuthenticated(true);
        }
        setLoading(false); 
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, token, loading}}>
            {children}
        </AuthContext.Provider>
    );
}
