
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';
import { userService } from '@/services/userService';
import { User } from '@/types/api';

export const useAuth0Integration = () => {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const queryClient = useQueryClient();

  // Set up API token when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      getAccessTokenSilently()
        .then(token => {
          apiClient.setAuthToken(token);
        })
        .catch(error => {
          console.error('Failed to get access token:', error);
        });
    } else {
      apiClient.setAuthToken(null);
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  // Sync user with backend
  const { data: backendUser, error: userError } = useQuery({
    queryKey: ['user', user?.sub],
    queryFn: async () => {
      if (!user) return null;
      const response = await userService.getOrCreateUser({
        sub: user.sub!,
        email: user.email!,
        name: user.name!,
        picture: user.picture,
      });
      return response.data;
    },
    enabled: isAuthenticated && !!user,
    retry: 3,
  });

  // Update user profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(['user', user?.sub], response.data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  // Update eco stats mutation
  const updateEcoStatsMutation = useMutation({
    mutationFn: userService.updateEcoStats,
    onSuccess: (response) => {
      queryClient.setQueryData(['user', user?.sub], response.data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    user: backendUser,
    auth0User: user,
    isAuthenticated,
    isLoading: isLoading || (!backendUser && isAuthenticated && !userError),
    userError,
    updateProfile: updateProfileMutation.mutateAsync,
    updateEcoStats: updateEcoStatsMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    isUpdatingEcoStats: updateEcoStatsMutation.isPending,
  };
};
