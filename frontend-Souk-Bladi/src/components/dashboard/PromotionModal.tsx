import React from 'react';
import { X, Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '../common/Button';
import { type Product } from '../../types';

interface PromotionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (planId: string) => void;
    product: Product | null;
}

const plans = [
    {
        id: 'discovery',
        name: 'Découverte',
        duration: '24 Heures',
        price: '50 MAD',
        icon: Star,
        color: 'blue',
        features: [
            'En tête de liste (Catégorie)',
            'Badge "Sponsorisé"',
            'Visibilité accrue'
        ]
    },
    {
        id: 'business',
        name: 'Business',
        duration: '7 Jours',
        price: '300 MAD',
        icon: Zap,
        color: 'orange',
        popular: true,
        features: [
            'Tout du plan Découverte',
            'En tête de liste (Global)',
            'Section "Coups de Cœur" (Accueil)',
            'Priorité support'
        ]
    },
    {
        id: 'premium',
        name: 'Premium',
        duration: '30 Jours',
        price: '1000 MAD',
        icon: Crown,
        color: 'purple',
        features: [
            'Tout du plan Business',
            'Post sur nos réseaux sociaux',
            'Newsletter dédiée',
            'Badge "Vendeur Certifié"'
        ]
    }
];

export const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, onClose, onConfirm, product }) => {
    if (!isOpen || !product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 text-center border-b border-gray-100">
                    <h2 className="text-3xl font-bold font-display text-gray-900 mb-2">Booster votre visibilité</h2>
                    <p className="text-gray-500">Choisissez le plan adapté pour promouvoir <span className="font-semibold text-gray-900">"{product.name}"</span></p>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col ${plan.popular ? 'border-primary-500 bg-primary-50/10 ring-4 ring-primary-100' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                                    Recommandé
                                </div>
                            )}

                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${plan.color}-50 text-${plan.color}-600`}>
                                <plan.icon size={24} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                            <div className="text-sm font-medium text-gray-500 mb-4">{plan.duration}</div>

                            <div className="text-3xl font-bold text-gray-900 mb-6 font-display">
                                {plan.price}
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                        <Check size={16} className={`shrink-0 mt-0.5 text-${plan.color}-600`} />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={() => onConfirm(plan.id)}
                                variant={plan.popular ? 'primary' : 'outline'}
                                className={`w-full ${plan.popular ? 'shadow-lg shadow-primary-200' : ''}`}
                            >
                                Choisir ce plan
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-50 p-6 text-center text-sm text-gray-500 rounded-b-3xl">
                    Paiement sécurisé. La promotion commence immédiatement après confirmation.
                </div>
            </div>
        </div>
    );
};
