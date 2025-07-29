import React from 'react';
import { Star } from 'lucide-react';

interface RatingWidgetProps {
  rating: number;
  maxRating?: number;
}

export default function RatingWidget({ rating, maxRating = 5 }: RatingWidgetProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  const getRatingLabel = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Rating</h3>
      
      <div className="flex items-center space-x-2 mb-2">
        <div className="flex space-x-1">
          {[...Array(maxRating)].map((_, index) => (
            <Star
              key={index}
              size={20}
              className={`${
                index < fullStars
                  ? 'text-yellow-400 fill-current'
                  : index === fullStars && hasHalfStar
                  ? 'text-yellow-400 fill-current opacity-50'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xl font-bold text-gray-900">{rating}</span>
      </div>
      
      <p className="text-sm font-medium text-gray-600">{getRatingLabel(rating)}</p>
    </div>
  );
}