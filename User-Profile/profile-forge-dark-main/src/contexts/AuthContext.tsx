import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock user data type
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatarUrl?: string;
  coverUrl?: string;
  bio?: string;
  createdAt: Date;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUser: User = {
  id: '1',
  email: 'demo@profilepro.dev',
  name: 'Alex Johnson',
  username: 'alexj',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  coverUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=200&fit=crop',
  bio: 'Product Designer & Analytics Enthusiast. Building better user experiences through data-driven design.',
  createdAt: new Date('2023-01-15'),
  role: 'user'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check localStorage for demo purposes
      const storedUser = localStorage.getItem('profilepro_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock authentication - accept any email/password for demo
    if (email && password) {
      const authenticatedUser = { ...mockUser, email };
      setUser(authenticatedUser);
      localStorage.setItem('profilepro_user', JSON.stringify(authenticatedUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('profilepro_user');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('profilepro_user', JSON.stringify(updatedUser));
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
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