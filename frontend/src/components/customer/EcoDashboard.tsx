
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Leaf, 
  TrendingUp, 
  Award, 
  Recycle, 
  TreePine, 
  Droplets,
  Zap,
  Target
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const weeklyData = [
  { day: 'Mon', co2Saved: 1.2, purchases: 3 },
  { day: 'Tue', co2Saved: 0.8, purchases: 2 },
  { day: 'Wed', co2Saved: 2.1, purchases: 4 },
  { day: 'Thu', co2Saved: 1.5, purchases: 3 },
  { day: 'Fri', co2Saved: 2.8, purchases: 5 },
  { day: 'Sat', co2Saved: 3.2, purchases: 6 },
  { day: 'Sun', co2Saved: 1.9, purchases: 4 }
];

const categoryData = [
  { name: 'Kitchenware', value: 35, color: '#10b981' },
  { name: 'Beverages', value: 25, color: '#3b82f6' },
  { name: 'Clothing', value: 20, color: '#8b5cf6' },
  { name: 'Electronics', value: 15, color: '#f59e0b' },
  { name: 'Personal Care', value: 5, color: '#ef4444' }
];

export const EcoDashboard = ({ cart }) => {
  const [ecoStats, setEcoStats] = useState(() => {
    const saved = localStorage.getItem('ecoStats');
    return saved ? JSON.parse(saved) : {
      totalCO2Saved: 12.4,
      ecoProductsPurchased: 23,
      totalPurchases: 45,
      weeklyGoal: 15,
      badges: ['Eco Rookie', 'Water Saver'],
      streak: 7
    };
  });

  const ecoPercentage = (ecoStats.ecoProductsPurchased / ecoStats.totalPurchases) * 100;
  const goalProgress = (ecoStats.totalCO2Saved / ecoStats.weeklyGoal) * 100;

  const badges = [
    { name: 'Eco Rookie', icon: Leaf, color: 'bg-green-500', description: 'First eco purchase' },
    { name: 'Water Saver', icon: Droplets, color: 'bg-blue-500', description: 'Saved 10L of water' },
    { name: 'Carbon Warrior', icon: TreePine, color: 'bg-emerald-600', description: 'Saved 10kg CO₂' },
    { name: 'Energy Star', icon: Zap, color: 'bg-yellow-500', description: 'Chose energy efficient products' },
    { name: 'Waste Reducer', icon: Recycle, color: 'bg-purple-500', description: 'Reduced packaging waste' },
    { name: 'Streak Master', icon: Target, color: 'bg-orange-500', description: '7-day eco streak' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Your Eco Impact Dashboard
        </h1>
        <p className="text-gray-600">
          Track your environmental impact and celebrate your green choices!
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total CO₂ Saved</p>
              <p className="text-3xl font-bold text-green-700">{ecoStats.totalCO2Saved}kg</p>
              <p className="text-xs text-green-600 mt-1">This month</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <TreePine className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Eco Products</p>
              <p className="text-3xl font-bold text-blue-700">{ecoStats.ecoProductsPurchased}</p>
              <p className="text-xs text-blue-600 mt-1">Out of {ecoStats.totalPurchases} total</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <Leaf className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Eco Score</p>
              <p className="text-3xl font-bold text-purple-700">{ecoPercentage.toFixed(0)}%</p>
              <p className="text-xs text-purple-600 mt-1">Green purchases</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Streak</p>
              <p className="text-3xl font-bold text-orange-700">{ecoStats.streak}</p>
              <p className="text-xs text-orange-600 mt-1">Days of eco choices</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-full">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Goal Progress */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Weekly CO₂ Reduction Goal</h3>
          <Badge className="bg-green-100 text-green-800">
            {ecoStats.totalCO2Saved}/{ecoStats.weeklyGoal}kg
          </Badge>
        </div>
        <Progress value={goalProgress} className="h-3 mb-2" />
        <p className="text-sm text-gray-600">
          {goalProgress >= 100 ? '🎉 Goal achieved! Great job!' : `${(ecoStats.weeklyGoal - ecoStats.totalCO2Saved).toFixed(1)}kg more to reach your goal`}
        </p>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly CO₂ Savings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}kg`, 'CO₂ Saved']} />
              <Line 
                type="monotone" 
                dataKey="co2Saved" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Eco-Friendly Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Badges */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Eco Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge) => {
            const Icon = badge.icon;
            const isEarned = ecoStats.badges.includes(badge.name);
            
            return (
              <div 
                key={badge.name} 
                className={`text-center p-4 rounded-lg transition-all duration-200 ${
                  isEarned 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 transform hover:scale-105' 
                    : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                }`}
              >
                <div className={`${badge.color} ${isEarned ? '' : 'bg-gray-400'} p-3 rounded-full mx-auto mb-2 w-fit`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className={`font-semibold text-sm ${isEarned ? 'text-gray-900' : 'text-gray-500'}`}>
                  {badge.name}
                </h4>
                <p className={`text-xs mt-1 ${isEarned ? 'text-gray-600' : 'text-gray-400'}`}>
                  {badge.description}
                </p>
                {isEarned && (
                  <Badge className="mt-2 bg-green-500 text-white text-xs">Earned!</Badge>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
