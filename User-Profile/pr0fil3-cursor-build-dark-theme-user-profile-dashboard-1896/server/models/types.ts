// Server-side types that match the client-side types
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  createdAt: Date;
  telegramId?: string;
  telegramUsername?: string;
  isOnline?: boolean;
  lastSeen?: Date;
  password?: string; // Only used server-side
}

export interface Skill {
  id: string;
  name: string;
  endorsementCount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  type: 'profile_view' | 'skill_endorsement' | 'profile_update' | 'document_upload' | 'telegram_sync';
  description: string;
  timestamp: Date;
  userId: string;
  metadata?: Record<string, any>;
}

export interface ProfileView {
  id: string;
  viewedAt: Date;
  viewerId?: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface TelegramUser {
  id: string;
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  userId: string;
  isActive: boolean;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'skill_endorsement' | 'profile_view' | 'system' | 'telegram';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  username: string;
}

export interface UpdateProfileRequest {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
}