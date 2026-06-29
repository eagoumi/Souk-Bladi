import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Award } from 'lucide-react';
import { useCooperatives } from '../../context/CooperativeContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const BuyerCooperatives: React.FC = () => {
    const { cooperatives, isFollowed, unfollowCooperative } = useCooperatives();

    // Filter cooperatives based on followed status
    const subscribedCooperatives = cooperatives.filter(coop => isFollowed(coop.id));

    const handleUnfollow = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        if (confirm('Voulez-vous vraiment ne plus suivre cette coopérative ?')) {
            unfollowCooperative(id);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Vos Coopératives</h2>
                    <p className="text-gray-500">Gérez les coopératives que vous suivez.</p>
                </div>
                <Link to="/cooperatives">
                    <Button variant="outline">
                        Découvrir d'autres coopératives
                    </Button>
                </Link>
            </div>

            {subscribedCooperatives.length > 0 ? (
                <div className="space-y-4">
                    {subscribedCooperatives.map((coop) => (
                        <div key={coop.id} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link to={`/cooperatives/${coop.id}`} className="block relative">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-gray-100 overflow-hidden bg-gray-50">
                                        {coop.logoUrl ? (
                                            <img src={coop.logoUrl} alt={coop.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold text-2xl">
                                                {coop.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    {coop.status === 'verified' && (
                                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white">
                                            <Award size={12} fill="currentColor" />
                                        </div>
                                    )}
                                </Link>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <Link to={`/cooperatives/${coop.id}`} className="hover:underline">
                                        <h3 className="font-bold text-lg text-gray-900 truncate">{coop.name}</h3>
                                    </Link>
                                    <Badge variant="success" className="text-xs">Suivi</Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {coop.region || 'Maroc'}</span>
                                    <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {coop.rating || '4.8'}</span>
                                    <span>• {coop.productCount || 0} Produits</span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 max-w-2xl">
                                    {coop.bio || 'Producteur local engagé dans la qualité et le développement durable.'}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto mt-2 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                                <Link to={`/cooperatives/${coop.id}`} className="flex-1 sm:w-40">
                                    <Button className="w-full justify-center">
                                        Voir la boutique
                                    </Button>
                                </Link>
                                <button
                                    onClick={(e) => handleUnfollow(e, coop.id)}
                                    className="flex-1 sm:w-40 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    Ne plus suivre
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Heart size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Vous ne suivez aucune coopérative</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        Suivez vos producteurs préférés pour rester informé de leurs nouveautés et promotions.
                    </p>
                    <Link to="/cooperatives">
                        <Button variant="primary">
                            Explorer l'annuaire
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
