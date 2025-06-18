
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Leaf, 
  LogOut,
  Calendar,
  Filter
} from 'lucide-react';

export const AdminDashboard = ({ user, onLogout }) => {
  const [timeFilter, setTimeFilter] = useState('week');

  // Mock data for analytics
  const analyticsData = {
    week: {
      productsReplaced: 142,
      totalUsers: 1250,
      co2Saved: 45.6,
      topCategories: [
        { name: 'Personal Care', count: 38, growth: '+12%' },
        { name: 'Food & Beverages', count: 32, growth: '+8%' },
        { name: 'Home & Garden', count: 28, growth: '+15%' },
        { name: 'Electronics', count: 24, growth: '+5%' },
      ]
    },
    month: {
      productsReplaced: 567,
      totalUsers: 1250,
      co2Saved: 182.4,
      topCategories: [
        { name: 'Personal Care', count: 152, growth: '+18%' },
        { name: 'Food & Beverages', count: 128, growth: '+12%' },
        { name: 'Home & Garden', count: 112, growth: '+22%' },
        { name: 'Electronics', count: 96, growth: '+8%' },
      ]
    },
    year: {
      productsReplaced: 6834,
      totalUsers: 1250,
      co2Saved: 2187.2,
      topCategories: [
        { name: 'Personal Care', count: 1826, growth: '+25%' },
        { name: 'Food & Beverages', count: 1534, growth: '+19%' },
        { name: 'Home & Garden', count: 1344, growth: '+31%' },
        { name: 'Electronics', count: 1152, growth: '+15%' },
      ]
    }
  };

  const currentData = analyticsData[timeFilter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Leaf className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                EcoMart Admin
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">
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
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Filter */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <div className="flex space-x-1">
              {['week', 'month', 'year'].map((period) => (
                <Button
                  key={period}
                  size="sm"
                  variant={timeFilter === period ? "default" : "outline"}
                  onClick={() => setTimeFilter(period)}
                  className={timeFilter === period ? 'bg-blue-600 text-white' : ''}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Products Replaced</p>
                <p className="text-3xl font-bold">{currentData.productsReplaced.toLocaleString()}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active Users</p>
                <p className="text-3xl font-bold">{currentData.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">CO₂ Saved (kg)</p>
                <p className="text-3xl font-bold">{currentData.co2Saved}</p>
              </div>
              <Leaf className="w-8 h-8 text-purple-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Growth Rate</p>
                <p className="text-3xl font-bold">+18%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </Card>
        </div>

        {/* Top Categories */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Top Eco-Friendly Categories</h2>
            <Badge className="bg-blue-100 text-blue-800">This {timeFilter}</Badge>
          </div>

          <div className="space-y-4">
            {currentData.topCategories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} products replaced</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {category.growth}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
            <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Schedule Reports</h3>
            <p className="text-sm text-gray-600 mb-4">Set up automated weekly/monthly reports</p>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Configure
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">User Insights</h3>
            <p className="text-sm text-gray-600 mb-4">Detailed user behavior analytics</p>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              View Details
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-200">
            <Leaf className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Impact Report</h3>
            <p className="text-sm text-gray-600 mb-4">Environmental impact summary</p>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Generate
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};
