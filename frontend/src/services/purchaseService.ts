
import { apiClient } from './apiClient';
import { Purchase, Address, ApiResponse } from '@/types/api';

export const purchaseService = {
  // Create purchase from cart
  async createPurchase(shippingAddress: Address): Promise<ApiResponse<Purchase>> {
    return apiClient.post('/purchases', { shippingAddress });
  },

  // Get user's purchase history
  async getPurchases(page: number = 1, limit: number = 10): Promise<ApiResponse<{
    purchases: Purchase[];
    total: number;
    page: number;
    totalPages: number;
  }>> {
    return apiClient.get('/purchases', { page, limit });
  },

  // Get single purchase
  async getPurchase(id: string): Promise<ApiResponse<Purchase>> {
    return apiClient.get(`/purchases/${id}`);
  },

  // Cancel purchase (if not shipped)
  async cancelPurchase(id: string): Promise<ApiResponse<Purchase>> {
    return apiClient.put(`/purchases/${id}/cancel`);
  },

  // Update shipping address (if not shipped)
  async updateShippingAddress(id: string, address: Address): Promise<ApiResponse<Purchase>> {
    return apiClient.put(`/purchases/${id}/shipping`, { address });
  },
};
