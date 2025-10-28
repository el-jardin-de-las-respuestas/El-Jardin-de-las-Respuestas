import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("AuthContext no está disponible");
  }
  return context;
}
