import { X, ShoppingCart, TrendingDown } from 'lucide-react';
import type { Product, Supermarket } from '../types';

interface StoreSelectionModalProps {
  product: Product;
  onSelect: (supermarket: Supermarket) => void;
  onClose: () => void;
}

const supermarketInfo = {
  cargills: {
    name: 'Cargills Food City',
    color: 'bg-red-600',
    hoverColor: 'hover:bg-red-700',
    borderColor: 'border-red-600',
    bgLight: 'bg-red-50',
    textColor: 'text-red-900',
    description: 'Island-wide supermarket chain',
  },
  keells: {
    name: 'Keells Super',
    color: 'bg-green-600',
    hoverColor: 'hover:bg-green-700',
    borderColor: 'border-green-600',
    bgLight: 'bg-green-50',
    textColor: 'text-green-900',
    description: 'Premium supermarket chain',
  },
  glomark: {
    name: 'Glomark',
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    borderColor: 'border-blue-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-900',
    description: 'Value supermarket chain',
  },
};

export function StoreSelectionModal({ product, onSelect, onClose }: StoreSelectionModalProps) {
  const prices = product.prices.map(p => p.price);
  const minPrice = Math.min(...prices);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Select Your Store</h2>
            </div>
            <p className="text-blue-100 mt-2">Choose where you'd like to buy this product</p>
          </div>

          {/* Product Info */}
          <div className="p-6 bg-gray-50 border-b-2 border-gray-200">
            <div className="flex gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.unit}</p>
              </div>
            </div>
          </div>

          {/* Store Options */}
          <div className="p-6 space-y-3">
            {product.prices.map((priceInfo) => {
              const info = supermarketInfo[priceInfo.supermarket];
              const isBestPrice = priceInfo.price === minPrice;
              const isAvailable = priceInfo.available;

              return (
                <button
                  key={priceInfo.supermarket}
                  onClick={() => isAvailable && onSelect(priceInfo.supermarket)}
                  disabled={!isAvailable}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    isAvailable
                      ? `${info.bgLight} ${info.borderColor} hover:shadow-lg hover:scale-105 cursor-pointer`
                      : 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 ${info.color} rounded-lg flex items-center justify-center text-white font-bold text-2xl`}>
                        {priceInfo.supermarket.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <h4 className={`font-bold ${info.textColor} text-lg`}>
                          {info.name}
                        </h4>
                        <p className="text-sm text-gray-600">{info.description}</p>
                        {!isAvailable && (
                          <p className="text-xs text-red-600 font-semibold mt-1">Out of Stock</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${isAvailable ? info.textColor : 'text-gray-500'}`}>
                          Rs. {priceInfo.price.toFixed(2)}
                        </span>
                        {isBestPrice && isAvailable && (
                          <TrendingDown className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      {isBestPrice && isAvailable && (
                        <span className="inline-block mt-1 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          BEST PRICE
                        </span>
                      )}
                      {priceInfo.discount && (
                        <span className="inline-block mt-1 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                          -{priceInfo.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t-2 border-gray-200">
            <button
              onClick={onClose}
              className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}