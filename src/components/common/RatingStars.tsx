import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface RatingStarsProps {
    rating: number;
    size?: number;
    showCount?: boolean;
    count?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, size = 16, showCount = false, count }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push(<Star key={i} size={size} className="fill-yellow-400 text-yellow-400" />);
        } else if (i === fullStars && hasHalfStar) {
            stars.push(<StarHalf key={i} size={size} className="fill-yellow-400 text-yellow-400" />);
        } else {
            stars.push(<Star key={i} size={size} className="text-gray-300" />);
        }
    }

    return (
        <div className="flex items-center gap-1">
            <div className="flex text-yellow-500">
                {stars}
            </div>
            {showCount && count !== undefined && (
                <span className="text-sm text-gray-500 text-xs">({count})</span>
            )}
        </div>
    );
};
