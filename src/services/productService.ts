
import { apiClient } from './apiClient';
import { Product, CreateProductRequest, ApiResponse } from '@/types/api';

export const productService = {
  // Get all products with optional filters
  async getProducts(params?: {
    category?: string;
    isEcoFriendly?: boolean;
    minEcoScore?: number;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ products: Product[]; total: number; page: number; totalPages: number }>> {
    return apiClient.get('/products', params);
  },

  // Get single product by ID
  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return apiClient.get(`/products/${id}`);
  },

  // Create new product (admin only)
  async createProduct(productData: CreateProductRequest): Promise<ApiResponse<Product>> {
    return apiClient.post('/products', productData);
  },

  // Update product (admin only)
  async updateProduct(id: string, productData: Partial<CreateProductRequest>): Promise<ApiResponse<Product>> {
    return apiClient.put(`/products/${id}`, productData);
  },

  // Delete product (admin only)
  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`/products/${id}`);
  },

  // Get eco-friendly alternatives for a product
  async getEcoAlternatives(productId: string): Promise<ApiResponse<Product[]>> {
    return apiClient.get(`/products/${productId}/eco-alternatives`);
  },

  // Get trending/popular products
  async getTrendingProducts(): Promise<ApiResponse<Product[]>> {
    return apiClient.get('/products/trending');
  },
};
