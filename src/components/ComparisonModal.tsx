import { X, TrendingDown, Award, MapPin, Tag, ThumbsUp, MessageCircle } from 'lucide-react';
import { StarRating } from './StarRating';
import type { Product } from '../types';

interface ComparisonModalProps {
  product: Product;
  onClose: () => void;
}

const supermarketColors = {
  cargills: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900', badge: 'bg-red-600', gradient: 'from-red-500 to-red-600' },
  keells: { bg: 'bg-green-50', border: 'border-green-300', text: 'text-green-900', badge: 'bg-green-600', gradient: 'from-green-500 to-green-600' },
  glomark: { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-900', badge: 'bg-blue-600', gradient: 'from-blue-500 to-blue-600' },
};

const supermarketNames = {
  cargills: 'Cargills Food City',
  keells: 'Keells Super',
  glomark: 'Glomark',
};

const supermarketLocations = {
  cargills: '300+ locations island-wide',
  keells: '200+ premium locations',
  glomark: '150+ value stores',
};

export function ComparisonModal({ product, onClose }: ComparisonModalProps) {
  const prices = product.prices.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{product.name}</h2>
              <p className="text-blue-100 capitalize text-sm">
                {product.category} • {product.unit}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* Product Image */}
          <div className="mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Price Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-2 text-center">
              <p className="text-xs text-green-700 font-medium mb-0.5">Lowest</p>
              <p className="text-base font-bold text-green-900">Rs. {minPrice.toFixed(2)}</p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-2 text-center">
              <p className="text-xs text-blue-700 font-medium mb-0.5">Average</p>
              <p className="text-base font-bold text-blue-900">Rs. {avgPrice.toFixed(2)}</p>
            </div>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-2 text-center">
              <p className="text-xs text-purple-700 font-medium mb-0.5">Save</p>
              <p className="text-base font-bold text-purple-900">Rs. {(maxPrice - minPrice).toFixed(2)}</p>
            </div>
          </div>

          {/* Price Comparison */}
          <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            Price Comparison
          </h3>

          <div className="space-y-2 mb-4">
            {product.prices
              .sort((a, b) => a.price - b.price)
              .map((priceInfo, index) => {
                const isLowest = priceInfo.price === minPrice;
                const priceDiff = priceInfo.price - minPrice;
                const colors = supermarketColors[priceInfo.supermarket];

                return (
                  <div
                    key={priceInfo.supermarket}
                    className={`relative overflow-hidden border-2 rounded-lg p-3 transition-all ${
                      isLowest
                        ? `${colors.bg} ${colors.border} shadow-lg`
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {isLowest && (
                      <div className="absolute top-0 right-0 bg-gradient-to-br from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-0.5 rounded-bl-lg font-bold text-xs flex items-center gap-1 shadow-md">
                        <Award className="w-3 h-3" />
                        Best
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 bg-gradient-to-br ${colors.gradient} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">
                            {supermarketNames[priceInfo.supermarket]}
                          </h4>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            {supermarketLocations[priceInfo.supermarket]}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end mb-0.5">
                          <p className="text-lg font-bold text-gray-900">
                            Rs. {priceInfo.price.toFixed(2)}
                          </p>
                          {priceInfo.discount && (
                            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-semibold">
                              <Tag className="w-2.5 h-2.5" />
                              -{priceInfo.discount}%
                            </span>
                          )}
                        </div>
                        {priceInfo.rating && (
                          <div className="flex items-center justify-end mb-0.5">
                            <StarRating rating={priceInfo.rating} interactive={true} size="sm" />
                          </div>
                        )}
                        {!isLowest && priceDiff > 0 && (
                          <p className="text-xs text-red-600 font-medium">
                            +Rs. {priceDiff.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price bar visualization */}
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-500`}
                        style={{
                          width: `${((maxPrice - priceInfo.price + minPrice) / maxPrice) * 100}%`,
                        }}
                      />
                    </div>

                    {isLowest && (
                      <div className="mt-2 flex items-center gap-1 text-green-700">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-xs font-semibold">
                          Save {(((maxPrice - minPrice) / maxPrice) * 100).toFixed(1)}% here
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Customer Reviews Section */}
          <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2 mt-6">
            <MessageCircle className="w-4 h-4 text-blue-600" />
            Customer Reviews
          </h3>

          <div className="space-y-3">
            {product.prices.map((priceInfo) => {
              const colors = supermarketColors[priceInfo.supermarket];
              const hasReviews = priceInfo.reviews && priceInfo.reviews.length > 0;

              return (
                <div key={priceInfo.supermarket} className="border-2 border-gray-200 rounded-lg p-3 bg-white">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
                    <div className={`w-6 h-6 bg-gradient-to-br ${colors.gradient} rounded flex items-center justify-center text-white font-bold text-xs`}>
                      {supermarketNames[priceInfo.supermarket].charAt(0)}
                    </div>
                    <h4 className="font-bold text-sm text-gray-900">{supermarketNames[priceInfo.supermarket]}</h4>
                    {priceInfo.rating && (
                      <div className="ml-auto">
                        <StarRating rating={priceInfo.rating} interactive={false} size="sm" />
                      </div>
                    )}
                  </div>

                  {hasReviews ? (
                    <div className="space-y-2">
                      {priceInfo.reviews!.slice(0, 2).map((review) => (
                        <div key={review.id} className="bg-gray-50 rounded-lg p-2">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs text-gray-900">{review.userName}</span>
                              <StarRating rating={review.rating} interactive={false} size="sm" />
                            </div>
                            <span className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed">{review.comment}</p>
                          {review.helpful && review.helpful > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              <ThumbsUp className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{review.helpful} found helpful</span>
                            </div>
                          )}
                        </div>
                      ))}
                      {priceInfo.reviews!.length > 2 && (
                        <button className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
                          View all {priceInfo.reviews!.length} reviews
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">No reviews yet for this store</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}