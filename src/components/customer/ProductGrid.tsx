
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  ShoppingCart, 
  Star, 
  Zap,
  Heart,
  Recycle
} from 'lucide-react';
import { EcoAlternativesModal } from './EcoAlternativesModal';
import { useToast } from '@/hooks/use-toast';

// Sample product data
const products = [
  {
    id: 1,
    name: "Plastic Water Bottle",
    price: 2.99,
    originalPrice: 3.99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=300&h=300&fit=crop",
    ecoScore: 2.1,
    isEcoFriendly: false,
    co2Impact: 0.5,
    rating: 4.2,
    tags: ["plastic", "disposable"]
  },
  {
    id: 2,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    originalPrice: 29.99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
    ecoScore: 8.7,
    isEcoFriendly: true,
    co2Impact: -2.1,
    rating: 4.8,
    tags: ["stainless-steel", "reusable", "durable"]
  },
  {
    id: 3,
    name: "Disposable Plates (Pack of 50)",
    price: 8.99,
    originalPrice: 10.99,
    category: "Kitchenware",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    ecoScore: 1.8,
    isEcoFriendly: false,
    co2Impact: 1.2,
    rating: 3.9,
    tags: ["disposable", "plastic"]
  },
  {
    id: 4,
    name: "Bamboo Dinnerware Set",
    price: 39.99,
    originalPrice: 49.99,
    category: "Kitchenware",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    ecoScore: 9.2,
    isEcoFriendly: true,
    co2Impact: -1.8,
    rating: 4.9,
    tags: ["bamboo", "biodegradable", "sustainable"]
  },
  {
    id: 5,
    name: "Regular Cotton T-Shirt",
    price: 15.99,
    originalPrice: 19.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
    ecoScore: 3.5,
    isEcoFriendly: false,
    co2Impact: 0.8,
    rating: 4.1,
    tags: ["cotton", "regular"]
  },
  {
    id: 6,
    name: "Organic Cotton T-Shirt",
    price: 22.99,
    originalPrice: 27.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop",
    ecoScore: 8.4,
    isEcoFriendly: true,
    co2Impact: -0.6,
    rating: 4.7,
    tags: ["organic", "sustainable", "fair-trade"]
  }
];

export const ProductGrid = ({ cart, updateCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEcoModal, setShowEcoModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const { toast } = useToast();

  const getEcoScoreColor = (score) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getEcoScoreLabel = (score) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      updateCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      updateCart([...cart, { ...product, quantity: 1 }]);
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart`,
    });

    // Show eco-alternatives if product is not eco-friendly
    if (!product.isEcoFriendly) {
      setSelectedProduct(product);
      setShowEcoModal(true);
    }
  };

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'eco') return product.isEcoFriendly;
    if (activeFilter === 'regular') return !product.isEcoFriendly;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Smart Eco-Friendly Shopping
        </h1>
        <p className="text-gray-600">
          Every purchase can make a difference. Choose products with higher eco-scores to reduce your carbon footprint.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-8">
        {[
          { id: 'all', label: 'All Products', icon: ShoppingCart },
          { id: 'eco', label: 'Eco-Friendly', icon: Leaf },
          { id: 'regular', label: 'Regular', icon: Zap }
        ].map(filter => {
          const Icon = filter.icon;
          return (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 ${
                activeFilter === filter.id 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                  : 'border-green-200 text-green-700 hover:bg-green-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{filter.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border-0 shadow-lg">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Eco Score Badge */}
              <div className="absolute top-3 right-3">
                <Badge className={`${getEcoScoreColor(product.ecoScore)} text-white font-semibold px-2 py-1`}>
                  {product.ecoScore}/10 {getEcoScoreLabel(product.ecoScore)}
                </Badge>
              </div>

              {/* Eco-Friendly Badge */}
              {product.isEcoFriendly && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-green-100 text-green-800 flex items-center space-x-1">
                    <Leaf className="w-3 h-3" />
                    <span>Eco</span>
                  </Badge>
                </div>
              )}

              {/* Discount Badge */}
              {product.originalPrice > product.price && (
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-red-500 text-white">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                <Button variant="ghost" size="sm" className="p-1 hover:bg-red-50">
                  <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </Button>
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600">({product.rating})</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <Recycle className="w-3 h-3 text-gray-500" />
                  <span className={`${product.co2Impact < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.co2Impact > 0 ? '+' : ''}{product.co2Impact}kg CO₂
                  </span>
                </div>
              </div>

              <Button
                onClick={() => addToCart(product)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-200 transform hover:scale-105"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Eco Alternatives Modal */}
      {showEcoModal && selectedProduct && (
        <EcoAlternativesModal
          product={selectedProduct}
          alternatives={products.filter(p => 
            p.category === selectedProduct.category && 
            p.isEcoFriendly && 
            p.id !== selectedProduct.id
          )}
          onClose={() => setShowEcoModal(false)}
          onAddAlternative={(alternative) => {
            addToCart(alternative);
            setShowEcoModal(false);
          }}
        />
      )}
    </div>
  );
};
