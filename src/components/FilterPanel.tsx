import { X, DollarSign, CheckCircle, RotateCcw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { Supermarket } from '../types';

interface FilterPanelProps {
  selectedMarkets: Supermarket[];
  onMarketsChange: (markets: Supermarket[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxPrice: number;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}

const markets: { id: Supermarket; name: string; color: string }[] = [
  { id: 'cargills', name: 'Cargills Food City', color: 'red' },
  { id: 'keells', name: 'Keells Super', color: 'orange' },
  { id: 'glomark', name: 'Glomark', color: 'green' },
];

export function FilterPanel({ selectedMarkets, onMarketsChange, priceRange, onPriceRangeChange, maxPrice, onClose, onApply, onReset }: FilterPanelProps) {
  const [localMarkets, setLocalMarkets] = useState<Supermarket[]>(selectedMarkets);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalMarkets(selectedMarkets);
  }, [selectedMarkets]);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const toggleMarket = (market: Supermarket) => {
    if (localMarkets.includes(market)) {
      setLocalMarkets(localMarkets.filter(m => m !== market));
    } else {
      setLocalMarkets([...localMarkets, market]);
    }
  };

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, localPriceRange[1] - 100);
    setLocalPriceRange([newMin, localPriceRange[1]]);
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, localPriceRange[0] + 100);
    setLocalPriceRange([localPriceRange[0], newMax]);
  };

  const handleMinInputChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.max(0, Math.min(numValue, localPriceRange[1] - 100));
    setLocalPriceRange([clampedValue, localPriceRange[1]]);
  };

  const handleMaxInputChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(maxPrice, Math.max(numValue, localPriceRange[0] + 100));
    setLocalPriceRange([localPriceRange[0], clampedValue]);
  };

  const handleApplyFilters = () => {
    onMarketsChange(localMarkets);
    onPriceRangeChange(localPriceRange);
    onApply();
  };

  const handleResetFilters = () => {
    setLocalMarkets(['cargills', 'keells', 'glomark']);
    setLocalPriceRange([0, maxPrice]);
    onReset();
  };

  const progressPercentageMin = (localPriceRange[0] / maxPrice) * 100;
  const progressPercentageMax = (localPriceRange[1] / maxPrice) * 100;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
      />

      {/* Filter Dropdown Panel */}
      <div className="fixed top-20 right-4 w-[420px] max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-50 animate-slideDown">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-t-2xl flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filters
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="p-5">
          {/* Supermarket Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Supermarkets</h4>
            <div className="space-y-2">
              {markets.map(market => (
                <label
                  key={market.id}
                  className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md"
                  style={{
                    borderColor: localMarkets.includes(market.id) ? `var(--${market.color}-500)` : '#e5e7eb',
                    backgroundColor: localMarkets.includes(market.id) ? `var(--${market.color}-50)` : 'white',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={localMarkets.includes(market.id)}
                    onChange={() => toggleMarket(market.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="font-medium text-gray-800 text-sm">{market.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Price Range
            </h4>
            
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 border-2 border-blue-200">
              {/* Price Display */}
              <div className="flex items-center justify-between mb-5">
                <div className="bg-white px-3 py-2 rounded-lg border-2 border-blue-300 shadow-sm flex-1 mr-2">
                  <label className="text-xs text-gray-500 mb-1 block">Min</label>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-blue-700">Rs.</span>
                    <input
                      type="number"
                      value={localPriceRange[0]}
                      onChange={(e) => handleMinInputChange(e.target.value)}
                      className="w-full text-lg font-bold text-blue-700 bg-transparent border-none outline-none focus:ring-0 p-0"
                      min="0"
                      max={localPriceRange[1] - 100}
                    />
                  </div>
                </div>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                <div className="bg-white px-3 py-2 rounded-lg border-2 border-green-300 shadow-sm flex-1 ml-2">
                  <label className="text-xs text-gray-500 mb-1 block">Max</label>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-green-700">Rs.</span>
                    <input
                      type="number"
                      value={localPriceRange[1]}
                      onChange={(e) => handleMaxInputChange(e.target.value)}
                      className="w-full text-lg font-bold text-green-700 bg-transparent border-none outline-none focus:ring-0 p-0"
                      min={localPriceRange[0] + 100}
                      max={maxPrice}
                    />
                  </div>
                </div>
              </div>

              {/* Dual Range Slider */}
              <div className="relative pt-2 pb-4">
                {/* Track Background */}
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 rounded-full -translate-y-1/2"></div>
                
                {/* Active Track (filled portion) */}
                <div 
                  className="absolute top-1/2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full -translate-y-1/2 transition-all"
                  style={{
                    left: `${progressPercentageMin}%`,
                    right: `${100 - progressPercentageMax}%`,
                  }}
                ></div>

                {/* Min Range Input */}
                <input
                  ref={minRef}
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="50"
                  value={localPriceRange[0]}
                  onChange={(e) => handleMinChange(parseInt(e.target.value))}
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-125"
                  style={{ zIndex: localPriceRange[0] > maxPrice - 100 ? 5 : 3 }}
                />

                {/* Max Range Input */}
                <input
                  ref={maxRef}
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="50"
                  value={localPriceRange[1]}
                  onChange={(e) => handleMaxChange(parseInt(e.target.value))}
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-webkit-slider-thumb]:border-3 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-3 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-125"
                  style={{ zIndex: 4 }}
                />
              </div>

              {/* Price Range Labels */}
              <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                <span>Rs. 0</span>
                <span>Rs. {maxPrice.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Apply and Reset Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              onClick={handleResetFilters}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all hover:scale-105 shadow-sm hover:shadow-md text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg text-sm"
            >
              <CheckCircle className="w-4 h-4" />
              Apply
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

// Import SlidersHorizontal icon
import { SlidersHorizontal } from 'lucide-react';