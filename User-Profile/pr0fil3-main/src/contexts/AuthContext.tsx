import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import { mockUser } from '../data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Mock authentication check - simulate checking for existing session
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setUser(mockUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // Mock login - in real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === mockUser.email && password === 'password') {
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
          resolve();
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    // Mock profile update
    return new Promise((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedUser = { ...user, ...updates };
          setUser(updatedUser);
        }
        resolve();
      }, 500);
    });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};