"use client";

import { ShoppingCart, BarChart2, Heart, Plus, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { StoreSelectionModal } from './StoreSelectionModal';
import { Product, Supermarket } from '../types';

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
  cargills: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', dot: 'bg-red-600' },
  keells: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', dot: 'bg-green-600' },
  glomark: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-600' },
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
  const [showStoreSelection, setShowStoreSelection] = useState(false);

  // Logic to find the best deal
  const sortedPrices = [...product.prices].sort((a, b) => a.price - b.price);
  const bestDeal = sortedPrices[0];
  const maxPrice = Math.max(...product.prices.map((p) => p.price));
  const savings = maxPrice - bestDeal.price;
  const savingsPercentage = Math.round((savings / maxPrice) * 100);

  // Check pickup mode
  const isPickupMode = onAddToCart.length === 1;

  const handleAddToCart = (supermarket: Supermarket) => {
    (onAddToCart as (product: Product, supermarket: Supermarket) => void)(product, supermarket);
    setShowStoreSelection(false);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      onLoginRequired();
      return;
    }
    if (isPickupMode) {
      (onAddToCart as (product: Product) => void)(product);
    } else {
      setShowStoreSelection(true);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) onLoginRequired();
    else onToggleSave(product.id);
  };

  return (
    <>
      <div 
        onClick={onCompare}
        className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer overflow-hidden"
      >
        {/* --- IMAGE SECTION --- */}
        <div className="relative h-40 sm:h-52 bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {savings > 0 && (
              <span className="bg-emerald-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                {savingsPercentage}% OFF
              </span>
            )}
          </div>

          {/* Save Button (Floating) */}
          <button
            onClick={handleSave}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isSaved 
                ? 'bg-red-500 text-white shadow-lg rotate-0' 
                : 'bg-white/80 text-gray-500 hover:bg-red-500 hover:text-white hover:rotate-12'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="p-4 flex flex-col flex-grow">
          
          {/* Title & Category */}
          <div className="mb-3">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">{product.category}</span>
            <h3 className="text-sm sm:text-lg font-bold text-gray-800 leading-tight line-clamp-2 h-10 sm:h-14">
              {product.name}
            </h3>
            <div className="text-xs text-gray-400 font-medium mt-1">{product.unit}</div>
          </div>

          {/* === MOBILE VIEW: THE "WINNER CARD" (Fixes Congestion) === */}
          <div className="block md:hidden mt-auto mb-4">
            <div className={`rounded-xl p-3 border ${supermarketColors[bestDeal.supermarket].bg} ${supermarketColors[bestDeal.supermarket].border}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold text-gray-500 uppercase">Best Price</span>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/60`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${supermarketColors[bestDeal.supermarket].dot}`} />
                  <span className={`text-[10px] font-bold capitalize ${supermarketColors[bestDeal.supermarket].text}`}>
                    {bestDeal.supermarket}
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className={`text-xl font-bold ${supermarketColors[bestDeal.supermarket].text}`}>
                  Rs. {bestDeal.price}
                </span>
                {savings > 0 && (
                  <span className="text-xs text-gray-400 line-through mb-1">
                    Rs. {maxPrice}
                  </span>
                )}
              </div>
            </div>
            {/* Tiny indicator that there are more options */}
            {product.prices.length > 1 && (
               <p className="text-[10px] text-center text-gray-400 mt-2">
                 + {product.prices.length - 1} other stores
               </p>
            )}
          </div>

          {/* === DESKTOP VIEW: THE "LEADERBOARD" === */}
          <div className="hidden md:flex flex-col gap-2 mt-auto mb-4">
            {sortedPrices.map((price, idx) => (
              <div 
                key={idx}
                className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                  idx === 0 
                    ? `${supermarketColors[price.supermarket].bg} ${supermarketColors[price.supermarket].border}` 
                    : 'bg-white border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${supermarketColors[price.supermarket].dot}`} />
                  <span className={`text-xs font-semibold capitalize ${idx === 0 ? supermarketColors[price.supermarket].text : 'text-gray-600'}`}>
                    {price.supermarket}
                  </span>
                  {idx === 0 && (
                     <span className="bg-white px-1.5 py-0.5 rounded text-[9px] font-bold border border-gray-100 shadow-sm">
                       WINNER
                     </span>
                  )}
                </div>
                <div className={`text-sm font-bold ${idx === 0 ? supermarketColors[price.supermarket].text : 'text-gray-700'}`}>
                  Rs. {price.price}
                </div>
              </div>
            ))}
          </div>

          {/* --- BUTTONS --- */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onCompare(); }}
              className="col-span-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl transition-colors h-10 sm:h-11"
              title="Compare Details"
            >
              <BarChart2 className="w-5 h-5" />
            </button>

            <button
              onClick={handleAddToCartClick}
              className="col-span-3 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 text-white font-bold rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all h-10 sm:h-11 text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal logic remains the same */}
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