import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AuthContextType } from '../types';
import type { User } from '../types';
import { apiService } from '../services/api';
import { webSocketService } from '../services/websocket';
import { useToast } from '../hooks/useToast';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  // Check for existing authentication on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Setup WebSocket connection when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      webSocketService.joinUserRoom(user.id);
      
      // Setup real-time event handlers
      const handleSkillEndorsement = (data: any) => {
        toast.success(`🎉 Someone endorsed your ${data.skillName} skill!`);
        // Refresh user data to get updated endorsement counts
        refreshUserData();
      };

      const handleProfileView = (data: any) => {
        const message = data.viewerName 
          ? `👀 ${data.viewerName} viewed your profile`
          : '👀 Someone viewed your profile';
        toast.info(message);
      };

      const handleNotification = (data: any) => {
        toast.info(`🔔 ${data.title}: ${data.message}`);
      };

      webSocketService.on('skill-endorsement-received', handleSkillEndorsement);
      webSocketService.on('profile-view-received', handleProfileView);
      webSocketService.on('notification', handleNotification);

      return () => {
        webSocketService.off('skill-endorsement-received', handleSkillEndorsement);
        webSocketService.off('profile-view-received', handleProfileView);
        webSocketService.off('notification', handleNotification);
      };
    }
  }, [isAuthenticated, user, toast]);

  const checkAuthStatus = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const userData = await apiService.getProfile();
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid tokens
      apiService.clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      const userData = await apiService.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  }, [isAuthenticated]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { user: userData } = await apiService.login(email, password);
      setUser(userData);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${userData.name}!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    name: string;
    username: string;
  }): Promise<void> => {
    try {
      const { user: newUser } = await apiService.register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
      toast.success(`Welcome to ProfilePro, ${newUser.name}!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      webSocketService.disconnect();
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      const updatedUser = await apiService.updateProfile(updates);
      setUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(message);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    refreshUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};