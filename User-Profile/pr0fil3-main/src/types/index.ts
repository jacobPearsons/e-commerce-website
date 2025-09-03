// Core Types for ProfilePro Dashboard
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  createdAt: Date;
  skills: Skill[];
  profileViews: ProfileView[];
  activities: Activity[];
}

export interface ProfileView {
  id: string;
  viewedAt: Date;
  viewerId?: string;
  userId: string;
}

export interface Skill {
  id: string;
  name: string;
  endorsementCount: number;
  userId: string;
}

export interface Activity {
  id: string;
  type: 'profile_view' | 'skill_endorsement' | 'profile_update' | 'document_upload';
  description: string;
  timestamp: Date;
  userId: string;
  metadata?: Record<string, any>;
}

export interface DashboardWidget {
  id: string;
  type: 'metric' | 'chart' | 'list' | 'profile_summary';
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  data?: any;
  config?: Record<string, any>;
}

export interface AnalyticsData {
  profileViews: {
    date: string;
    views: number;
  }[];
  skillEndorsements: {
    skill: string;
    count: number;
  }[];
  engagement: {
    date: string;
    interactions: number;
  }[];
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

export type NavigationItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
};