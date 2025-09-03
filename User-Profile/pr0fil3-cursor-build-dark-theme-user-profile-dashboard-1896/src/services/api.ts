// API Service for ProfilePro
import type { User, Skill, Activity, ProfileView, AnalyticsData, DashboardWidget } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    // Load tokens from localStorage on initialization
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  // Set authentication tokens
  setTokens(tokens: AuthTokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  // Clear authentication tokens
  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Get authorization headers
  private getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    return headers;
  }

  // Make API request with error handling
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle token expiration
        if (response.status === 401 && this.refreshToken) {
          const refreshed = await this.refreshAccessToken();
          if (refreshed) {
            // Retry the original request
            return this.request(endpoint, options);
          }
        }

        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      throw error;
    }
  }

  // Refresh access token
  private async refreshAccessToken(): Promise<boolean> {
    try {
      if (!this.refreshToken) return false;

      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (!response.ok) {
        this.clearTokens();
        return false;
      }

      const data = await response.json();
      if (data.success && data.data.accessToken) {
        this.accessToken = data.data.accessToken;
        localStorage.setItem('accessToken', data.data.accessToken);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      return false;
    }
  }

  // Authentication endpoints
  async login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.request<{ user: User; tokens: AuthTokens }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      this.setTokens(response.data.tokens);
      return response.data;
    }

    throw new Error(response.error || 'Login failed');
  }

  async register(userData: {
    email: string;
    password: string;
    name: string;
    username: string;
  }): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.request<{ user: User; tokens: AuthTokens }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success && response.data) {
      this.setTokens(response.data.tokens);
      return response.data;
    }

    throw new Error(response.error || 'Registration failed');
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } finally {
      this.clearTokens();
    }
  }

  // User endpoints
  async getProfile(): Promise<User> {
    const response = await this.request<User>('/users/profile');
    
    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch profile');
  }

  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await this.request<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to update profile');
  }

  async getSkills(): Promise<Skill[]> {
    const response = await this.request<Skill[]>('/users/skills');
    
    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch skills');
  }

  async addSkill(name: string): Promise<Skill> {
    const response = await this.request<Skill>('/users/skills', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to add skill');
  }

  async endorseSkill(skillId: string): Promise<Skill> {
    const response = await this.request<Skill>(`/users/skills/${skillId}/endorse`, {
      method: 'POST',
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to endorse skill');
  }

  async deleteSkill(skillId: string): Promise<void> {
    const response = await this.request(`/users/skills/${skillId}`, {
      method: 'DELETE',
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to delete skill');
    }
  }

  async getActivities(): Promise<Activity[]> {
    const response = await this.request<Activity[]>('/users/activities');
    
    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch activities');
  }

  async recordProfileView(userId: string): Promise<void> {
    const response = await this.request(`/users/${userId}/view`, {
      method: 'POST',
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to record profile view');
    }
  }

  // ProfileView endpoints

  async createProfileView(userId: string): Promise<ProfileView> {
    const response = await this.request<ProfileView>('/profile-views', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to create profile view');
  }

  async getProfileViews(userId: string): Promise<ProfileView[]> {
    const response = await this.request<ProfileView[]>(`/profile-views/${userId}`);

    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch profile views');
  }

  async deleteProfileView(id: string): Promise<{ success: boolean }> {
    const response = await this.request<{ success: boolean }>(`/profile-views/${id}`, {
      method: 'DELETE',
    });

    if (response.success) {
      return { success: true };
    }

    throw new Error(response.error || 'Failed to delete profile view');
  }

  // Analytics endpoints
  async getDashboardSummary(): Promise<DashboardWidget[]> {
  const response = await this.request('/analytics/dashboard');
  
  if (response.success && response.data) {
    return response.data as DashboardWidget[];
  }

  throw new Error(response.error || 'Failed to fetch dashboard summary');
}

  async getProfileViewsAnalytics(days: number = 30): Promise<AnalyticsData['profileViews']> {
  const response = await this.request(`/analytics/profile-views?days=${days}`);
  
  if (response.success && response.data) {
    const data = response.data as AnalyticsData; // cast once
    return data.profileViews; // ✅ return the correct array
  }

  throw new Error(response.error || 'Failed to fetch profile views analytics');
}

  async getSkillsAnalytics(days: number = 30): Promise<AnalyticsData['skillEndorsements']> {
  const response = await this.request(`/analytics/skills?days=${days}`);
  
  if (response.success && response.data) {
    const data = response.data as AnalyticsData;
    return data.skillEndorsements;
  }

  throw new Error(response.error || 'Failed to fetch skills analytics');
}

  async getEngagementAnalytics(days: number = 7): Promise<any> {
    const response = await this.request(`/analytics/engagement?days=${days}`);
    
    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to fetch engagement analytics');
  }

  async exportData(format: 'json' | 'csv' = 'json'): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/analytics/export?format=${format}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to export data');
    }

    if (format === 'csv') {
      return response.text();
    }

    return response.json();
  }

  // Telegram endpoints
  async getTelegramStatus(): Promise<any> {
    const response = await this.request('/telegram/status');
    
    if (response.success && response.data) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to get Telegram status');
  }

  async sendTestNotification(userId: string, title: string, message: string): Promise<any> {
    const response = await this.request('/telegram/test-notification', {
      method: 'POST',
      body: JSON.stringify({ userId, title, message }),
    });

    if (response.success) {
      return response.data;
    }

    throw new Error(response.error || 'Failed to send test notification');
  }

  // Health check
  async healthCheck(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
      return response.json();
    } catch (error) {
      throw new Error('Server is not responding');
    }
  }
}

export const apiService = new ApiService();