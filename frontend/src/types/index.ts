// Type definitions for the application

export type Page = 
  | 'home' 
  | 'auth' 
  | 'catalogs' 
  | 'resources' 
  | 'about' 
  | 'community' 
  | 'blog' 
  | 'testimonials' 
  | 'faq' 
  | 'profile' 
  | 'cycle-tracker';

export interface User {
  name: string;
  email: string;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userName: string;
  login: (email: string, password: string) => void;
  register: (email: string, password: string, name: string) => void;
  logout: () => void;
}
