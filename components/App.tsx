"use client";

import { ShoppingCart, BarChart2, Star, Heart, Info, Plus } from 'lucide-react';
import { Product, Supermarket } from '../types';

interface ProductCardProps {
  product: Product;
  onCompare: () => void;
  onAddToCart: (product: Product, supermarket: Supermarket) => void;
  isLoggedIn: boolean;
  onLoginRequired: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

const supermarketColors = {
  cargills: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-600' },
  keells: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-600' },
  glomark: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-600' },
};

export function ProductCard({
  product,
  onCompare,
  onAddToCart,
  isLoggedIn,
  onLoginRequired,
  isSaved,
  onToggleSave,
}: ProductCardProps) {
  // Find best price logic
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
  const bestPrice = sortedPrices[0];
  const maxPrice = Math.max(...product.prices.map((p) => p.price));
  const savings = maxPrice - bestPrice.price;
  const savingsPercentage = Math.round((savings / maxPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      onLoginRequired();
    } else {
      onAddToCart(product, bestPrice.supermarket);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      onLoginRequired();
    } else {
      onToggleSave(product.id);
    }
  };

  return (
    <div 
      onClick={onCompare}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-32 sm:h-48 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {savings > 0 && (
            <span className="bg-green-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              {savingsPercentage}% OFF
            </span>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`absolute top-2 left-2 p-1.5 rounded-full backdrop-blur-sm transition-all ${
            isSaved ? 'bg-red-50 text-red-500' : 'bg-white/70 text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="mb-2">
          <p className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wider">{product.category}</p>
          <h3 className="font-bold text-gray-900 text-sm sm:text-lg leading-tight line-clamp-2 min-h-[2.5em]">
            {product.name}
          </h3>
        </div>

        {/* MOBILE VIEW: Compact Price Summary */}
        <div className="block md:hidden mt-auto">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-2 border border-green-100 mb-3">
            <p className="text-[10px] text-gray-500 mb-0.5">Best Price</p>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-lg font-bold text-green-700">Rs. {bestPrice.price}</span>
              </div>
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${supermarketColors[bestPrice.supermarket].bg}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${supermarketColors[bestPrice.supermarket].dot}`} />
                <span className={`text-[10px] font-bold capitalize ${supermarketColors[bestPrice.supermarket].text}`}>
                  {bestPrice.supermarket}
                </span>
              </div>
            </div>
            {product.prices.length > 1 && (
               <p className="text-[10px] text-gray-400 mt-1.5 text-center border-t border-green-200/50 pt-1">
                 Compare {product.prices.length} stores &rarr;
               </p>
            )}
          </div>
        </div>

        {/* DESKTOP VIEW: Detailed Price List */}
        <div className="hidden md:flex flex-col gap-2 mb-4 flex-grow">
          {product.prices.map((price, idx) => (
            <div 
              key={idx}
              className={`flex items-center justify-between p-2 rounded-lg border ${
                price.price === bestPrice.price 
                  ? 'bg-green-50/50 border-green-200' 
                  : 'bg-gray-50 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${supermarketColors[price.supermarket].dot}`} />
                <span className="text-xs font-medium capitalize text-gray-700">{price.supermarket}</span>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold ${price.price === bestPrice.price ? 'text-green-700' : 'text-gray-900'}`}>
                  Rs. {price.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-5 gap-2 mt-auto">
           {/* Details Button (2 cols on mobile, 3 on desktop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompare();
            }}
            className="col-span-2 md:col-span-3 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-blue-600 text-xs sm:text-sm font-semibold py-2 sm:py-2.5 rounded-xl transition-colors"
          >
            <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Compare</span>
            <span className="sm:hidden">View</span>
          </button>

          {/* Add to Cart Button (3 cols on mobile, 2 on desktop) */}
          <button
            onClick={handleAddToCart}
            className="col-span-3 md:col-span-2 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-green-600 text-white text-xs sm:text-sm font-bold py-2 sm:py-2.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}