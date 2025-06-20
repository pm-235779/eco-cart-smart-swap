
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Leaf, 
  Zap,
  TreePine,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock eco-friendly alternatives data
const ecoAlternatives = {
  1: { id: 2, name: "Stainless Steel Water Bottle", price: 24.99, ecoScore: 8.7, co2Impact: -2.1 },
  3: { id: 4, name: "Bamboo Dinnerware Set", price: 39.99, ecoScore: 9.2, co2Impact: -1.8 },
  5: { id: 6, name: "Organic Cotton T-Shirt", price: 22.99, ecoScore: 8.4, co2Impact: -0.6 }
};

export const Cart = ({ cart, updateCart }) => {
  const [isGreenMode, setIsGreenMode] = useState(false);
  const { toast } = useToast();

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    updateCart(updatedCart);
    
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const convertToGreenCart = () => {
    const greenCart = cart.map(item => {
      const alternative = ecoAlternatives[item.id];
      if (alternative && !item.isEcoFriendly) {
        return {
          ...alternative,
          quantity: item.quantity,
          isEcoFriendly: true,
          image: item.image,
          originalPrice: alternative.price + 5,
          rating: 4.8,
          tags: ["eco-friendly", "sustainable"]
        };
      }
      return item;
    });

    updateCart(greenCart);
    setIsGreenMode(true);
    
    toast({
      title: "🌱 Green Cart Activated!",
      description: "All items have been replaced with eco-friendly alternatives",
    });
  };

  const revertToOriginal = () => {
    // This would restore original items (simplified for demo)
    setIsGreenMode(false);
    toast({
      title: "Cart Reverted",
      description: "Returned to original items",
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCO2Impact = cart.reduce((sum, item) => sum + (item.co2Impact * item.quantity), 0);
  const ecoItemsCount = cart.filter(item => item.isEcoFriendly).length;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Start shopping and make every purchase count for the planet!</p>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
            <Leaf className="w-4 h-4 mr-2" />
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cart.length} items in your cart</p>
        </div>

        {/* Green Cart Toggle */}
        <div className="flex space-x-3">
          {!isGreenMode ? (
            <Button
              onClick={convertToGreenCart}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center space-x-2 px-6 py-3"
            >
              <Sparkles className="w-5 h-5" />
              <span>Convert to Green Cart</span>
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500 text-white px-3 py-1 text-sm">
                <Leaf className="w-4 h-4 mr-1" />
                Green Cart Active
              </Badge>
              <Button
                variant="outline"
                onClick={revertToOriginal}
                className="border-green-500 text-green-600 hover:bg-green-50"
              >
                Revert
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {item.isEcoFriendly && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <Leaf className="w-3 h-3 mr-1" />
                            Eco-Friendly
                          </Badge>
                        )}
                        <Badge className={`text-xs ${
                          item.ecoScore >= 8 ? 'bg-green-500' :
                          item.ecoScore >= 6 ? 'bg-yellow-500' :
                          item.ecoScore >= 4 ? 'bg-orange-500' : 'bg-red-500'
                        } text-white`}>
                          {item.ecoScore}/10
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-600">${item.price}</span>
                      <span className={`text-sm ${item.co2Impact < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.co2Impact > 0 ? '+' : ''}{item.co2Impact}kg CO₂
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-semibold text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-green-600">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3">
              Proceed to Checkout
            </Button>
          </Card>

          {/* Environmental Impact */}
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
              <TreePine className="w-5 h-5 mr-2" />
              Environmental Impact
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-green-700">CO₂ Impact</span>
                <span className={`font-bold ${totalCO2Impact < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {totalCO2Impact > 0 ? '+' : ''}{totalCO2Impact.toFixed(1)}kg
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-700">Eco-Friendly Items</span>
                <span className="font-bold text-green-600">
                  {ecoItemsCount}/{cart.length}
                </span>
              </div>
              <div className="text-center pt-2">
                {totalCO2Impact < 0 ? (
                  <Badge className="bg-green-500 text-white">
                    🌱 Great job! You're helping the planet
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500 text-white">
                    Consider green alternatives above
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
