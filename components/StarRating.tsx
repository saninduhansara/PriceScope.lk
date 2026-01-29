"use client"; // <--- 1. ADD THIS

import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function StarRating({ rating, onRate, interactive = false, size = 'sm' }: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  
  const displayRating = hoveredRating ?? rating;
  
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const handleClick = (starRating: number) => {
    if (interactive && onRate) {
      onRate(starRating);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(displayRating);
        const halfFilled = star === Math.ceil(displayRating) && displayRating % 1 !== 0;
        
        return (
          <button
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(null)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
            type="button"
            suppressHydrationWarning={true} // <--- 2. ADD THIS (Fixes the error)
          >
            {halfFilled ? (
              <div className="relative">
                <Star className={`${sizeClasses[size]} text-gray-300`} fill="currentColor" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star className={`${sizeClasses[size]} text-yellow-400`} fill="currentColor" />
                </div>
              </div>
            ) : (
              <Star
                className={`${sizeClasses[size]} ${
                  filled ? 'text-yellow-400' : 'text-gray-300'
                } transition-colors`}
                fill="currentColor"
              />
            )}
          </button>
        );
      })}
      <span className={`ml-1 ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'} font-semibold text-gray-700`}>
        {displayRating.toFixed(1)}
      </span>
    </div>
  );
}