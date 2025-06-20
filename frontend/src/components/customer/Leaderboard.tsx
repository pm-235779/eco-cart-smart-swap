
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award, Leaf, TrendingUp, Crown } from 'lucide-react';

export const Leaderboard = () => {
  // Mock leaderboard data
  const leaderboardData = [
    {
      id: 1,
      name: 'Sarah Green',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      co2Saved: 127.4,
      ecoScore: 9.2,
      productsSwapped: 34,
      badge: 'Eco Champion',
      rank: 1
    },
    {
      id: 2,
      name: 'Mike Eco-Warrior',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      co2Saved: 98.7,
      ecoScore: 8.8,
      productsSwapped: 28,
      badge: 'Green Guardian',
      rank: 2
    },
    {
      id: 3,
      name: 'Lisa Sustainable',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
      co2Saved: 89.3,
      ecoScore: 8.5,
      productsSwapped: 25,
      badge: 'Planet Protector',
      rank: 3
    },
    {
      id: 4,
      name: 'John Earth-Friend',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      co2Saved: 76.2,
      ecoScore: 8.1,
      productsSwapped: 22,
      badge: 'Eco Rookie',
      rank: 4
    },
    {
      id: 5,
      name: 'Emma Climate-Hero',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      co2Saved: 68.9,
      ecoScore: 7.9,
      productsSwapped: 19,
      badge: 'Green Starter',
      rank: 5
    }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-6 h-6 text-blue-500" />;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-orange-500';
      case 2:
        return 'from-gray-300 to-gray-500';
      case 3:
        return 'from-amber-400 to-amber-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Eco Champion':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
      case 'Green Guardian':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
      case 'Planet Protector':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Green Heroes Leaderboard
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Celebrating our top eco-warriors who are making a difference! 🌱
        </p>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 text-center bg-gradient-to-r from-green-50 to-emerald-50">
          <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-green-700">460.5kg</h3>
          <p className="text-sm text-green-600">Total CO₂ Saved This Month</p>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-blue-700">128</h3>
          <p className="text-sm text-blue-600">Products Swapped</p>
        </Card>
        
        <Card className="p-6 text-center bg-gradient-to-r from-purple-50 to-pink-50">
          <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-purple-700">5</h3>
          <p className="text-sm text-purple-600">Active Champions</p>
        </Card>
      </div>

      {/* Leaderboard */}
      <div className="space-y-4">
        {leaderboardData.map((user, index) => (
          <Card 
            key={user.id} 
            className={`p-6 transition-all duration-300 hover:shadow-lg ${
              user.rank <= 3 ? 'ring-2 ring-opacity-50 ' + (user.rank === 1 ? 'ring-yellow-400' : user.rank === 2 ? 'ring-gray-400' : 'ring-amber-400') : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Rank */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${getRankColor(user.rank)}`}>
                  {user.rank <= 3 ? (
                    getRankIcon(user.rank)
                  ) : (
                    <span className="text-white font-bold text-lg">#{user.rank}</span>
                  )}
                </div>

                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{user.name}</h3>
                    <Badge className={`text-xs ${getBadgeColor(user.badge)}`}>
                      {user.badge}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{user.co2Saved}kg</p>
                  <p className="text-xs text-gray-500">CO₂ Saved</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{user.ecoScore}</p>
                  <p className="text-xs text-gray-500">Eco Score</p>
                </div>
                
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{user.productsSwapped}</p>
                  <p className="text-xs text-gray-500">Swapped</p>
                </div>
              </div>
            </div>

            {/* Rank 1 Special Treatment */}
            {user.rank === 1 && (
              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <div className="flex items-center justify-center space-x-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800 font-semibold">👑 Current Champion - Amazing work!</span>
                  <Crown className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <h2 className="text-2xl font-bold mb-4">Want to climb the leaderboard? 🚀</h2>
        <p className="text-green-100 mb-6">
          Start making eco-friendly choices and watch your impact grow!
        </p>
        <Button className="bg-white text-green-600 hover:bg-gray-100 font-semibold">
          Shop Eco-Friendly Products
        </Button>
      </Card>
    </div>
  );
};
