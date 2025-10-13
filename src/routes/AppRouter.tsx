// src/routes/AppRouter.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { ReactElement } from "react";
import { useAuth } from "@hooks/useAuth";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return !isAuthenticated ? children : <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Home Page</div>} />
      <Route path="/about" element={<div>About Page</div>} />
      
      <Route
        path="/login"
        element={
          <PublicRoute>
            <div>Login Page</div>
          </PublicRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <div>Profile Page</div>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<div>404 - Página no encontrada</div>} />
    </Routes>
  );
};

export default AppRouter;