
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  Leaf, 
  BarChart3, 
  Trophy, 
  Settings as SettingsIcon,
  LogOut,
  User
} from 'lucide-react';

export const CustomerNavbar = ({ user, onLogout, activeTab, setActiveTab, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'products', label: 'Products', icon: Leaf },
    { id: 'dashboard', label: 'Eco Dashboard', icon: BarChart3 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EcoMart
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search eco-friendly products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-green-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1 transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                      : 'hover:bg-green-50 text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Button>
              );
            })}

            {/* Cart */}
            <Button
              variant={activeTab === 'cart' ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab('cart')}
              className={`relative transition-all duration-200 ${
                activeTab === 'cart' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                  : 'hover:bg-green-50 text-gray-700'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-green-200">
              <div className="flex items-center space-x-2">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:inline text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
