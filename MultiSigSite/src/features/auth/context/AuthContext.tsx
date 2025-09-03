import React, { createContext, useContext, useState, useEffect } from 'react';
import { DecodedToken, getStoredToken, setStoredToken, removeStoredToken, verifyToken } from '../../../utils/jwt';

interface AuthContextType {
  isAuthenticated: boolean;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      try {
        const decoded = verifyToken(token);
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (error) {
        removeStoredToken();
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const login = (token: string) => {
    try {
      const decoded = verifyToken(token);
      setStoredToken(token);
      setUser(decoded);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  };

  const logout = () => {
    removeStoredToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 