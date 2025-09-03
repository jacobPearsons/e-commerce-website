const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) throw new Error(`API request failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

  private async requestBlob(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Blob request failed: ${response.status}`);
      return await response.blob();
    } catch (error) {
      console.error('Blob API call error:', error);
      throw error;
    }
  }

  // =====================
  // Dashboard endpoints
  // =====================
  getMetrics = () => this.request('/analytics/metrics');
  getAnalytics = () => this.request('/analytics');
  getRecentActivities = () => this.request('/activities/recent');

  // =====================
  // Profile endpoints
  // =====================
  getProfile = () => this.request('/profile');
  updateProfile = (data: any) => 
    this.request('/profile', { method: 'PUT', body: JSON.stringify(data) });

  addSkills = (skills: string[]) =>
    this.request('/profile/skills', { 
      method: 'POST', 
      body: JSON.stringify({ skills }) 
    });

  // =====================
  // Notifications & Messages
  // =====================
  sendNotification = (message: string) =>
    this.request('/notifications/send', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });

  sendMessage = (toUserId: string, content: string) =>
    this.request('/messages', {
      method: 'POST',
      body: JSON.stringify({ toUserId, content }),
    });

  // =====================
  // Data export/import
  // =====================
  exportData = () => this.requestBlob('/export', { method: 'GET' });

  importData = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(`${API_BASE_URL}/import`, {
      method: 'POST',
      body: formData,
    }).then((res) => {
      if (!res.ok) throw new Error('Import failed');
      return res.json();
    });
  };
}

export const api = new ApiClient();
