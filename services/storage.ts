
import { User } from '../types';

export const storageService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await fetch('/api/users');
      const text = await response.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Invalid Server Response: ${text.substring(0, 50)}...`);
      }

      if (!response.ok) {
        throw new Error(data.details || data.message || `HTTP Error ${response.status}`);
      }

      // VITAL FIX: Ensure we always return an array
      if (!Array.isArray(data)) {
        console.error('API returned non-array data:', data);
        // If the API returned an error object as data, throw it
        if (data.message) throw new Error(data.message);
        return [];
      }

      return data;
    } catch (error: any) {
      console.error('Storage Service Error:', error);
      throw error;
    }
  },

  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('find_my_buddy_auth_user');
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser: (user: User | null) => {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem('find_my_buddy_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('find_my_buddy_auth_user');
    }
  },

  registerUser: async (newUser: Omit<User, 'id' | 'status' | 'role' | 'createdAt'>): Promise<User> => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    const data = await response.json().catch(() => ({ message: 'Invalid response from server' }));

    if (!response.ok) {
      throw new Error(data.details || data.message || 'Registration failed');
    }
    return data;
  },

  updateUserStatus: async (userId: string, status: 'approved' | 'rejected') => {
    const response = await fetch(`/api/users?id=${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Status update failed');
    return await response.json();
  }
};
