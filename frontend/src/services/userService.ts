
import { apiClient } from './apiClient';
import { User, ApiResponse, EcoStats, UserPreferences } from '@/types/api';

export const userService = {
  // Get or create user profile (called after Auth0 authentication)
  async getOrCreateUser(auth0User: {
    sub: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<ApiResponse<User>> {
    return apiClient.post('/users/auth0-sync', {
      auth0Id: auth0User.sub,
      email: auth0User.email,
      name: auth0User.name,
      picture: auth0User.picture,
    });
  },

  // Get user profile
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get('/users/profile');
  },

  // Update user profile
  async updateProfile(updates: {
    name?: string;
    preferences?: Partial<UserPreferences>;
  }): Promise<ApiResponse<User>> {
    return apiClient.put('/users/profile', updates);
  },

  // Update eco stats
  async updateEcoStats(stats: Partial<EcoStats>): Promise<ApiResponse<User>> {
    return apiClient.put('/users/eco-stats', stats);
  },

  // Get leaderboard
  async getLeaderboard(timeframe: 'week' | 'month' | 'all' = 'month'): Promise<ApiResponse<User[]>> {
    return apiClient.get(`/users/leaderboard?timeframe=${timeframe}`);
  },

  // Delete user account
  async deleteAccount(): Promise<ApiResponse<void>> {
    return apiClient.delete('/users/profile');
  },
};
