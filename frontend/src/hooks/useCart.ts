
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartService } from '@/services/cartService';
import { useToast } from '@/hooks/use-toast';

export const useCart = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cart, isLoading, error } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await cartService.getCart();
      return response.data;
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartService.addToCart(productId, quantity),
    onSuccess: (response) => {
      queryClient.setQueryData(['cart'], response.data);
      toast({
        title: "Added to Cart",
        description: "Item has been added to your cart",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add item to cart",
        variant: "destructive",
      });
    },
  });

  const updateCartItemMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      cartService.updateCartItem(productId, quantity),
    onSuccess: (response) => {
      queryClient.setQueryData(['cart'], response.data);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update cart item",
        variant: "destructive",
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (productId: string) => cartService.removeFromCart(productId),
    onSuccess: (response) => {
      queryClient.setQueryData(['cart'], response.data);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to remove item from cart",
        variant: "destructive",
      });
    },
  });

  const convertToGreenCartMutation = useMutation({
    mutationFn: () => cartService.convertToGreenCart(),
    onSuccess: (response) => {
      queryClient.setQueryData(['cart'], response.data);
      toast({
        title: "🌱 Green Cart Activated!",
        description: "All items have been replaced with eco-friendly alternatives",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to convert to green cart",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () => cartService.clearCart(),
    onSuccess: () => {
      queryClient.setQueryData(['cart'], null);
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to clear cart",
        variant: "destructive",
      });
    },
  });

  return {
    cart,
    cartItems: cart?.items || [],
    totalPrice: cart?.totalPrice || 0,
    totalCO2Impact: cart?.totalCO2Impact || 0,
    itemCount: cart?.items?.length || 0,
    isLoading,
    error,
    addToCart: addToCartMutation.mutateAsync,
    updateCartItem: updateCartItemMutation.mutateAsync,
    removeFromCart: removeFromCartMutation.mutateAsync,
    convertToGreenCart: convertToGreenCartMutation.mutateAsync,
    clearCart: clearCartMutation.mutateAsync,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingCart: updateCartItemMutation.isPending,
    isRemovingFromCart: removeFromCartMutation.isPending,
    isConvertingToGreen: convertToGreenCartMutation.isPending,
    isClearingCart: clearCartMutation.isPending,
  };
};
