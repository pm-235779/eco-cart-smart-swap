
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '@/services/productService';
import { CreateProductRequest } from '@/types/api';
import { useToast } from '@/hooks/use-toast';

export const useProducts = (params?: {
  category?: string;
  isEcoFriendly?: boolean;
  minEcoScore?: number;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await productService.getProducts(params);
      return response.data;
    },
  });

  const createProductMutation = useMutation({
    mutationFn: (productData: CreateProductRequest) => productService.createProduct(productData),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product Created",
        description: `${response.data.name} has been created successfully`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create product",
        variant: "destructive",
      });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProductRequest> }) => 
      productService.updateProduct(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', response.data._id] });
      toast({
        title: "Product Updated",
        description: `${response.data.name} has been updated successfully`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update product",
        variant: "destructive",
      });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => productService.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete product",
        variant: "destructive",
      });
    },
  });

  return {
    products: data?.products || [],
    total: data?.total || 0,
    page: data?.page || 1,
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
    createProduct: createProductMutation.mutateAsync,
    updateProduct: updateProductMutation.mutateAsync,
    deleteProduct: deleteProductMutation.mutateAsync,
    isCreating: createProductMutation.isPending,
    isUpdating: updateProductMutation.isPending,
    isDeleting: deleteProductMutation.isPending,
  };
};

export const useProduct = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await productService.getProduct(id);
      return response.data;
    },
    enabled: !!id,
  });

  return { product: data, isLoading, error };
};

export const useEcoAlternatives = (productId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['eco-alternatives', productId],
    queryFn: async () => {
      const response = await productService.getEcoAlternatives(productId);
      return response.data;
    },
    enabled: !!productId,
  });

  return { alternatives: data || [], isLoading, error };
};
