
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Leaf, 
  Globe, 
  Smartphone,
  Mail,
  Lock,
  Trash2,
  Save
} from 'lucide-react';

export const Settings = () => {
  const [autoSwapEnabled, setAutoSwapEnabled] = useState(
    localStorage.getItem('autoSwapEnabled') === 'true'
  );
  const [notifications, setNotifications] = useState({
    ecoTips: true,
    productUpdates: true,
    weeklyReport: true,
    discountAlerts: true
  });
  const [profile, setProfile] = useState({
    name: 'John Eco-Warrior',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567'
  });

  const handleAutoSwapToggle = (enabled) => {
    setAutoSwapEnabled(enabled);
    localStorage.setItem('autoSwapEnabled', enabled.toString());
  };

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleProfileUpdate = () => {
    // Mock save functionality
    console.log('Profile updated:', profile);
  };

  const handleDataExport = () => {
    // Mock data export
    console.log('Exporting user data...');
  };

  const handleAccountDelete = () => {
    // Mock account deletion
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deleted');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Settings
        </h1>
      </div>

      {/* Profile Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <User className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <Input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full"
            />
          </div>
        </div>
        
        <Button onClick={handleProfileUpdate} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Profile
        </Button>
      </Card>

      {/* Eco Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Leaf className="w-5 h-5 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Eco-Friendly Preferences</h2>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Auto Swap to Green</h3>
              <p className="text-sm text-gray-600 mt-1">
                Automatically replace items in your cart with eco-friendly alternatives
              </p>
            </div>
            <Switch
              checked={autoSwapEnabled}
              onCheckedChange={handleAutoSwapToggle}
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Environmental Impact Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">50kg</p>
                <p className="text-xs text-gray-600">Monthly CO₂ Target</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">20</p>
                <p className="text-xs text-gray-600">Products to Swap</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">8.5</p>
                <p className="text-xs text-gray-600">Target Eco Score</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-5 h-5 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Eco Tips & Insights</h3>
              <p className="text-sm text-gray-600">Weekly tips for sustainable living</p>
            </div>
            <Switch
              checked={notifications.ecoTips}
              onCheckedChange={() => handleNotificationToggle('ecoTips')}
            />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Product Updates</h3>
              <p className="text-sm text-gray-600">New eco-friendly products and features</p>
            </div>
            <Switch
              checked={notifications.productUpdates}
              onCheckedChange={() => handleNotificationToggle('productUpdates')}
            />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Weekly Impact Report</h3>
              <p className="text-sm text-gray-600">Your environmental impact summary</p>
            </div>
            <Switch
              checked={notifications.weeklyReport}
              onCheckedChange={() => handleNotificationToggle('weeklyReport')}
            />
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <h3 className="font-medium text-gray-900">Discount Alerts</h3>
              <p className="text-sm text-gray-600">Special offers on eco-friendly products</p>
            </div>
            <Switch
              checked={notifications.discountAlerts}
              onCheckedChange={() => handleNotificationToggle('discountAlerts')}
            />
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-5 h-5 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
        </div>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Lock className="w-4 h-4 mr-3" />
            Change Password
          </Button>
          
          <Button variant="outline" className="w-full justify-start" onClick={handleDataExport}>
            <Globe className="w-4 h-4 mr-3" />
            Export My Data
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleAccountDelete}
          >
            <Trash2 className="w-4 h-4 mr-3" />
            Delete Account
          </Button>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">EcoMart v2.1.0</h3>
          <p className="text-sm text-gray-600 mb-4">
            Making sustainable shopping accessible for everyone
          </p>
          <div className="flex justify-center space-x-4">
            <Badge className="bg-green-100 text-green-800">
              🌱 Carbon Neutral
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              ♻️ Eco Certified
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};
