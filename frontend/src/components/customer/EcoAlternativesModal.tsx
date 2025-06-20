
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Leaf, X, ShoppingCart, Star, Recycle } from 'lucide-react';

export const EcoAlternativesModal = ({ product, alternatives, onClose, onAddAlternative }) => {
  const getEcoScoreColor = (score) => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              🌱 Consider These Eco-Friendlier Options!
            </DialogTitle>
          </div>
          <DialogDescription className="text-lg">
            We found some amazing eco-friendly alternatives to <strong>{product.name}</strong> that can help reduce your carbon footprint!
          </DialogDescription>
        </DialogHeader>

        {alternatives.length === 0 ? (
          <div className="text-center py-8">
            <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No eco-friendly alternatives found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {alternatives.map((alternative) => (
              <Card key={alternative.id} className="p-4 hover:shadow-lg transition-shadow duration-200 border-green-100">
                <div className="flex space-x-4">
                  <img
                    src={alternative.image}
                    alt={alternative.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{alternative.name}</h3>
                      <Badge className={`${getEcoScoreColor(alternative.ecoScore)} text-white text-xs`}>
                        {alternative.ecoScore}/10
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(alternative.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({alternative.rating})</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-green-600">${alternative.price}</span>
                        {alternative.originalPrice > alternative.price && (
                          <span className="text-xs text-gray-500 line-through">${alternative.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-xs">
                        <Recycle className="w-3 h-3 text-green-500" />
                        <span className="text-green-600">
                          {alternative.co2Impact}kg CO₂
                        </span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {alternative.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-green-100 text-green-800">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => onAddAlternative(alternative)}
                      size="sm"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add This Instead
                    </Button>
                  </div>
                </div>

                {/* Environmental Impact Comparison */}
                <div className="mt-3 p-2 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-700 font-medium">Environmental Impact:</span>
                    <span className="text-green-600 font-semibold">
                      {Math.abs(alternative.co2Impact - product.co2Impact).toFixed(1)}kg CO₂ saved! 🌱
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">
            💡 <strong>Tip:</strong> Eco-friendly products often last longer and save money in the long run!
          </div>
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Maybe Later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
