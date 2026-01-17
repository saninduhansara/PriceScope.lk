import { TrendingDown, TrendingUp, Eye, Tag, ShoppingCart, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { StoreSelectionModal } from './StoreSelectionModal';
import { StarRating } from './StarRating';
import type { Product, Supermarket } from '../types';

interface ProductCardProps {
  product: Product;
  onCompare: () => void;
  onAddToCart: ((product: Product, supermarket: Supermarket) => void) | ((product: Product) => void);
  isLoggedIn: boolean;
  onLoginRequired: () => void;
  isSaved: boolean;
  onToggleSave: (productId: string) => void;
}

const supermarketColors = {
  cargills: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', badge: 'bg-red-600' },
  keells: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', badge: 'bg-green-600' },
  glomark: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', badge: 'bg-blue-600' },
};

const supermarketNames = {
  cargills: 'Cargills',
  keells: 'Keells',
  glomark: 'Glomark',
};

export function ProductCard({ product, onCompare, onAddToCart, isLoggedIn, onLoginRequired, isSaved, onToggleSave }: ProductCardProps) {
  const [showStoreSelection, setShowStoreSelection] = useState(false);
  
  const prices = product.prices.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const savings = maxPrice - minPrice;
  const savingsPercent = ((savings / maxPrice) * 100).toFixed(1);

  const bestDeal = product.prices.find(p => p.price === minPrice);

  // Check if this is pickup mode (function takes only one parameter)
  const isPickupMode = onAddToCart.length === 1;

  const handleAddToCart = (supermarket: Supermarket) => {
    (onAddToCart as (product: Product, supermarket: Supermarket) => void)(product, supermarket);
    setShowStoreSelection(false);
  };

  const handleAddToCartClick = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }

    if (isPickupMode) {
      // Pickup mode: add directly without showing modal
      (onAddToCart as (product: Product) => void)(product);
    } else {
      // Online mode: show store selection modal
      setShowStoreSelection(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Save Button */}
          <button
            onClick={() => onToggleSave(product.id)}
            className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 ${
              isSaved
                ? 'bg-yellow-500 text-white shadow-lg'
                : 'bg-white/90 text-gray-700 hover:bg-yellow-500 hover:text-white'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
          {savings > 0 && (
            <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
              <TrendingDown className="w-4 h-4" />
              Save Rs. {savings.toFixed(2)}
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
            {product.unit}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>

          <div className="space-y-2 mb-4">
            {product.prices.map((priceInfo) => (
              <div
                key={priceInfo.supermarket}
                className={`flex flex-col p-3 rounded-lg border-2 ${
                  priceInfo.price === minPrice
                    ? `${supermarketColors[priceInfo.supermarket].bg} ${supermarketColors[priceInfo.supermarket].border}`
                    : 'bg-gray-50 border-gray-200'
                } transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${supermarketColors[priceInfo.supermarket].badge}`} />
                    <span className="font-medium text-gray-700 text-sm">
                      {supermarketNames[priceInfo.supermarket]}
                    </span>
                    {priceInfo.discount && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        -{priceInfo.discount}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">
                      Rs. {priceInfo.price.toFixed(2)}
                    </span>
                    {priceInfo.price === minPrice && savings > 0 && (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    )}
                    {priceInfo.price === maxPrice && savings > 0 && (
                      <TrendingUp className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
                {priceInfo.rating && (
                  <div className="flex items-center justify-end">
                    <StarRating rating={priceInfo.rating} interactive={true} size="sm" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {savings > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm font-semibold text-green-800">
                Best Price at {supermarketNames[bestDeal!.supermarket]}
              </p>
              <p className="text-xs text-green-700 mt-1">
                Save {savingsPercent}% compared to highest price
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onCompare}
              className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Details
            </button>
            <button
              onClick={handleAddToCartClick}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Store Selection Modal */}
      {showStoreSelection && (
        <StoreSelectionModal
          product={product}
          onSelect={handleAddToCart}
          onClose={() => setShowStoreSelection(false)}
        />
      )}
    </>
  );
}