
import { apiClient } from './apiClient';
import { Analytics, ApiResponse } from '@/types/api';

export const analyticsService = {
  // Get dashboard analytics (admin only)
  async getDashboardAnalytics(): Promise<ApiResponse<Analytics>> {
    return apiClient.get('/analytics/dashboard');
  },

  // Track user action
  async trackAction(action: string, data?: any): Promise<ApiResponse<void>> {
    return apiClient.post('/analytics/track', { action, data });
  },

  // Get user analytics
  async getUserAnalytics(): Promise<ApiResponse<{
    totalPurchases: number;
    totalSpent: number;
    co2Saved: number;
    ecoScore: number;
    monthlyData: any[];
  }>> {
    return apiClient.get('/analytics/user');
  },

  // Get product analytics (admin only)
  async getProductAnalytics(productId: string): Promise<ApiResponse<{
    views: number;
    purchases: number;
    revenue: number;
    conversionRate: number;
    monthlyData: any[];
  }>> {
    return apiClient.get(`/analytics/products/${productId}`);
  },
};
