const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
      ...options.headers,
    };

    // Add token if available
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Add Content-Type for JSON if not FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Something went wrong'
        };
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error.message || 'Network error. Please check your connection.'
      };
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // User endpoints
  async getUserProfile(userId) {
    return this.request(`/users/${userId}`);
  }

  async updateUserProfile(userId, userData) {
    return this.request(`/users/${userId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Complaint endpoints
  async createComplaint(complaintData) {
    return this.request('/complaints', {
      method: 'POST',
      body: complaintData, // FormData
    });
  }

  async getUserComplaints(userId) {
    return this.request(`/complaints/user/${userId}`);
  }

  async getComplaint(complaintId) {
    return this.request(`/complaints/${complaintId}`);
  }

  async updateComplaintStatus(complaintId, status) {
    return this.request(`/complaints/${complaintId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async updateComplaint(complaintId, complaintData) {
    return this.request(`/complaints/${complaintId}`, {
      method: 'PUT',
      body: JSON.stringify(complaintData),
    });
  }

  async deleteComplaint(complaintId) {
    return this.request(`/complaints/${complaintId}`, {
      method: 'DELETE',
    });
  }

  async getAllComplaints() {
    return this.request('/complaints');
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async getUnreadCount() {
    return this.request('/notifications/unread-count');
  }

  async markNotificationAsRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/notifications/read-all', {
      method: 'PUT',
    });
  }

  async deleteNotification(notificationId) {
    return this.request(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  }

  // Analytics endpoints
  async getAnalytics() {
    return this.request('/analytics/stats');
  }

  async trackAnonymousComplaint(trackingCode) {
    return this.request(`/analytics/track/${trackingCode}`);
  }
}

export default new ApiService();
