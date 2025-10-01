
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, Role } from '../types';
import { useData } from './DataContext';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, role: Role.LEARNER | Role.CONTRIBUTOR) => Promise<{ success: boolean; message: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dataContext = useData();

  useEffect(() => {
    // Simulate checking for a logged-in user in session storage
    try {
      const storedUser = sessionStorage.getItem('lms-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
      sessionStorage.removeItem('lms-user');
    } finally {
        setLoading(false);
    }
  }, []);

  const login = async (email: string): Promise<boolean> => {
    setLoading(true);
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = dataContext.users.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          sessionStorage.setItem('lms-user', JSON.stringify(foundUser));
          resolve(true);
        } else {
          resolve(false);
        }
        setLoading(false);
      }, 500);
    });
  };
  
  const signup = async (name: string, email: string, role: Role.LEARNER | Role.CONTRIBUTOR): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    const result = dataContext.createUser(name, email, role);
    if (result.success && result.newUser) {
      // Automatically log in the new user
      setUser(result.newUser);
      sessionStorage.setItem('lms-user', JSON.stringify(result.newUser));
    }
    setLoading(false);
    return { success: result.success, message: result.message };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('lms-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};