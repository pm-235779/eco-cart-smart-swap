
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Leaf, Users, ShoppingCart } from 'lucide-react';

export const Auth0LoginScreen = () => {
  const { loginWithRedirect, isLoading, error } = useAuth0();

  // Add debugging for Auth0 state
  console.log('Auth0 Login Screen - isLoading:', isLoading, 'error:', error);

  const handleGoogleLogin = () => {
    console.log('Attempting Google login...');
    loginWithRedirect({
      authorizationParams: {
        connection: 'google-oauth2',
        login_hint: 'customer'
      }
    }).catch(err => {
      console.error('Google login error:', err);
    });
  };

  const handleFacebookLogin = () => {
    console.log('Attempting Facebook login...');
    loginWithRedirect({
      authorizationParams: {
        connection: 'facebook',
        login_hint: 'customer'
      }
    }).catch(err => {
      console.error('Facebook login error:', err);
    });
  };

  const handleTwitterLogin = () => {
    console.log('Attempting Twitter login...');
    loginWithRedirect({
      authorizationParams: {
        connection: 'twitter',
        login_hint: 'customer'
      }
    }).catch(err => {
      console.error('Twitter login error:', err);
    });
  };

  const handleLinkedInLogin = () => {
    console.log('Attempting LinkedIn login...');
    loginWithRedirect({
      authorizationParams: {
        connection: 'linkedin',
        login_hint: 'customer'
      }
    }).catch(err => {
      console.error('LinkedIn login error:', err);
    });
  };

  const handleAdminLogin = () => {
    console.log('Attempting admin login...');
    loginWithRedirect({
      authorizationParams: {
        login_hint: 'admin'
      }
    }).catch(err => {
      console.error('Admin login error:', err);
    });
  };

  const handleEmailLogin = () => {
    console.log('Attempting email login...');
    loginWithRedirect().catch(err => {
      console.error('Email login error:', err);
    });
  };

  // Show error if there's an Auth0 error
  if (error) {
    console.error('Auth0 Error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 via-red-500 to-red-600 p-4">
        <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-500 to-emerald-600 p-4">
      <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="w-12 h-12 text-green-600 mr-2" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EcoMart
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Smart Eco-Friendly Shopping</p>
          <p className="text-sm text-gray-500 mt-2">Sign in to continue</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleEmailLogin}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            {isLoading ? 'Signing in...' : 'Sign In with Email'}
          </Button>

          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>

          <Button
            onClick={handleFacebookLogin}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            {isLoading ? 'Signing in...' : 'Continue with Facebook'}
          </Button>

          <Button
            onClick={handleTwitterLogin}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            {isLoading ? 'Signing in...' : 'Continue with Twitter'}
          </Button>

          <Button
            onClick={handleLinkedInLogin}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-950 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            {isLoading ? 'Signing in...' : 'Continue with LinkedIn'}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button
            onClick={handleAdminLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full h-14 border-2 border-gray-500 text-gray-600 hover:bg-gray-50 font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <Users className="w-5 h-5 mr-3" />
            {isLoading ? 'Signing in...' : 'Continue as Admin'}
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🌱 Make every purchase count for the planet</p>
        </div>
      </Card>
    </div>
  );
};
