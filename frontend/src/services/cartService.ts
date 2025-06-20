
import { apiClient } from './apiClient';
import { Cart, CartItem, ApiResponse } from '@/types/api';

export const cartService = {
  // Get user's cart
  async getCart(): Promise<ApiResponse<Cart>> {
    return apiClient.get('/cart');
  },

  // Add item to cart
  async addToCart(productId: string, quantity: number = 1): Promise<ApiResponse<Cart>> {
    return apiClient.post('/cart/items', { productId, quantity });
  },

  // Update cart item quantity
  async updateCartItem(productId: string, quantity: number): Promise<ApiResponse<Cart>> {
    return apiClient.put(`/cart/items/${productId}`, { quantity });
  },

  // Remove item from cart
  async removeFromCart(productId: string): Promise<ApiResponse<Cart>> {
    return apiClient.delete(`/cart/items/${productId}`);
  },

  // Clear entire cart
  async clearCart(): Promise<ApiResponse<void>> {
    return apiClient.delete('/cart');
  },

  // Convert cart to eco-friendly alternatives
  async convertToGreenCart(): Promise<ApiResponse<Cart>> {
    return apiClient.post('/cart/convert-to-green');
  },

  // Apply coupon/discount
  async applyCoupon(code: string): Promise<ApiResponse<Cart>> {
    return apiClient.post('/cart/coupon', { code });
  },
};
