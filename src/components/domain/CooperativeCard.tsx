import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';
import { type Cooperative } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../context/LanguageContext';
import { useCooperatives } from '../../context/CooperativeContext';

interface CooperativeCardProps {
    cooperative: Cooperative;
}

export const CooperativeCard: React.FC<CooperativeCardProps> = ({ cooperative }) => {
    const { t } = useLanguage();
    const { isFollowed, followCooperative, unfollowCooperative } = useCooperatives();
    const isFollowing = isFollowed(cooperative.id);

    const handleFollowToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation
        e.stopPropagation();
        if (isFollowing) {
            unfollowCooperative(cooperative.id);
        } else {
            followCooperative(cooperative.id);
        }
    };
    return (
        <Link to={`/cooperatives/${cooperative.id}`} className="group block bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative h-32 bg-gray-100">
                <img
                    src={cooperative.bannerUrl}
                    alt={cooperative.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 z-10">
                    <button
                        onClick={handleFollowToggle}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-gray-500 hover:text-red-500 hover:bg-white transition-all"
                    >
                        <Heart size={18} fill={isFollowing ? "currentColor" : "none"} className={isFollowing ? "text-red-500" : ""} />
                    </button>
                </div>
                <div className="absolute -bottom-8 left-4">
                    <img
                        src={cooperative.logoUrl}
                        alt={`${cooperative.name} logo`}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover bg-white"
                    />
                </div>
            </div>

            <div className="pt-10 px-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {cooperative.name}
                        </h3>
                        <div className="flex items-center text-gray-500 text-xs mt-1">
                            <MapPin size={12} className="mr-1" />
                            {cooperative.region}
                        </div>
                    </div>

                    <div className="text-right">
                        <RatingStars rating={cooperative.rating} size={14} />
                        <span className="text-xs text-gray-400 mt-1 block">{cooperative.productCount} {t('coops.products')}</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {cooperative.story}
                </p>

                <div className="flex flex-wrap gap-2">
                    {cooperative.womenLed && (
                        <Badge variant="info">{t('coops.womenLed')}</Badge>
                    )}
                    {cooperative.categoryTags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx}>{tag}</Badge>
                    ))}
                </div>
            </div>
        </Link >
    );
};
