
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Leaf, Users, ShoppingCart } from 'lucide-react';

export const LoginScreen = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (role) => {
    setIsLoading(true);
    
    // Simulate Google OAuth login
    setTimeout(() => {
      const mockUser = {
        id: Date.now(),
        name: role === 'admin' ? 'Admin User' : 'John Eco-Warrior',
        email: role === 'admin' ? 'admin@walmart.com' : 'john@example.com',
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`,
      };
      
      onLogin(mockUser, role);
      setIsLoading(false);
    }, 1500);
  };

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
          <p className="text-sm text-gray-500 mt-2">Choose your role to continue</p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => handleGoogleLogin('customer')}
            disabled={isLoading}
            className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            {isLoading ? 'Signing in...' : 'Continue as Customer'}
          </Button>

          <Button
            onClick={() => handleGoogleLogin('admin')}
            disabled={isLoading}
            variant="outline"
            className="w-full h-14 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold text-lg transition-all duration-300 transform hover:scale-105"
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
