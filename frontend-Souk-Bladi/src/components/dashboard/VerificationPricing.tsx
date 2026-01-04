import React from 'react';
import { Check, ShieldCheck, Crown, Star } from 'lucide-react';
import { Button } from '../common/Button';

interface PricingTier {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    recommended?: boolean;
    icon: React.ReactNode;
    color: string;
}

interface VerificationPricingProps {
    onSelectPlan: (planId: string) => void;
}

export const VerificationPricing: React.FC<VerificationPricingProps> = ({ onSelectPlan }) => {
    const tiers: PricingTier[] = [
        {
            id: 'discovery',
            name: 'Découverte',
            price: 'Gratuit',
            description: 'Pour commencer votre aventure digital',
            features: [
                'Badge "Nouveau Vendeur"',
                'Jusqu\'à 5 produits',
                'Support par email',
                'Visibilité standard'
            ],
            icon: <Star className="w-6 h-6" />,
            color: 'bg-gray-100 text-gray-800'
        },
        {
            id: 'verified',
            name: 'Vérifié',
            price: '99 MAD / mois',
            description: 'Pour les coopératives sérieuses',
            features: [
                'Badge "Vendeur Vérifié"',
                'Produits illimités',
                'Support prioritaire',
                'Visibilité boostée (x2)',
                'Analyses de ventes',
                'Frais de commission réduits'
            ],
            recommended: true,
            icon: <ShieldCheck className="w-6 h-6" />,
            color: 'bg-primary-100 text-primary-800'
        },
        {
            id: 'premium',
            name: 'Premium',
            price: '249 MAD / mois',
            description: 'Pour une croissance maximale',
            features: [
                'Badge "Top Vendeur"',
                'Tout illimité',
                'Account Manager dédié',
                'Visibilité maximale (Une du site)',
                'Commission 0% sur 50 produits',
                'Formation marketing'
            ],
            icon: <Crown className="w-6 h-6" />,
            color: 'bg-yellow-100 text-yellow-800'
        }
    ];

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre badge de confiance</h2>
                <p className="text-gray-500">Boostez vos ventes avec un badge vérifié et des fonctionnalités exclusives.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 px-4">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={`relative rounded-3xl p-1 flex flex-col transition-all duration-300 transform hover:-translate-y-1 ${tier.recommended
                            ? 'shadow-2xl shadow-primary-500/10 ring-1 ring-primary-500/20'
                            : 'shadow-lg shadow-gray-200/50 hover:shadow-xl bg-white border border-gray-100'
                            }`}
                    >
                        {tier.recommended && (
                            <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-t-3xl" />
                        )}

                        <div className={`h-full bg-white rounded-[22px] p-6 lg:p-8 flex flex-col ${tier.recommended ? 'bg-gradient-to-b from-primary-50/30 to-white' : ''}`}>
                            {tier.recommended && (
                                <div className="absolute top-0 right-0 -mt-3 -mr-3">
                                    <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wide bg-primary-600 text-white shadow-md transform rotate-3">
                                        <Crown size={12} fill="currentColor" />
                                        Recommandé
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${tier.color} shadow-sm`}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                                <p className="text-sm text-gray-500 mt-2 min-h-[40px]">{tier.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">{tier.price.split(' ')[0]}</span>
                                    <span className="text-sm text-gray-500 font-semibold uppercase">{tier.price.split(' ').slice(1).join(' ')}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8 flex-grow">
                                {tier.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 group">
                                        <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${tier.recommended ? 'bg-primary-100 text-primary-600 group-hover:bg-primary-200' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className="text-sm text-gray-600 font-medium leading-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant={tier.recommended ? 'primary' : 'outline'}
                                className={`w-full justify-center py-4 rounded-xl font-bold transition-all ${tier.recommended
                                        ? 'shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5'
                                        : 'hover:bg-gray-50 border-gray-200 text-gray-700'
                                    }`}
                                onClick={() => onSelectPlan(tier.id)}
                            >
                                Choisir {tier.name}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comparison Table */}
            <div className="mt-20">
                <div className="text-center mb-10">
                    <h3 className="text-xl font-bold text-gray-900">Comparaison détaillée</h3>
                    <p className="text-gray-500 text-sm mt-2">Analysez les fonctionnalités en détail pour faire le meilleur choix.</p>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px] text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-widest w-1/4">Fonctionnalités</th>
                                    <th className="p-6 text-center text-sm font-bold text-gray-900 w-1/4">Découverte</th>
                                    <th className="p-6 text-center text-sm font-bold text-primary-700 bg-primary-50/30 w-1/4 relative">
                                        Vérifié
                                        <div className="absolute top-2 right-2">
                                            <Star size={10} className="text-primary-400 fill-primary-400" />
                                        </div>
                                    </th>
                                    <th className="p-6 text-center text-sm font-bold text-gray-900 w-1/4">Premium</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 text-sm">
                                {[
                                    { name: 'Badge Vendeur', discovery: 'Nouveau', verified: 'Vérifié', premium: 'Top Vendeur' },
                                    { name: 'Nombre de produits', discovery: '5', verified: 'Illimité', premium: 'Illimité' },
                                    { name: 'Commission', discovery: 'Standard', verified: 'Réduite', premium: '0% (sur 50 produits)' },
                                    { name: 'Support', discovery: 'Email', verified: 'Prioritaire', premium: 'Account Manager' },
                                    { name: 'Visibilité', discovery: 'Standard', verified: 'x2 Boost', premium: 'x10 (Une du site)' },
                                    { name: 'Analyses', discovery: <span className="text-gray-300">-</span>, verified: 'Basique', premium: 'Avancée' },
                                    { name: 'Formation', discovery: <span className="text-gray-300">-</span>, verified: <span className="text-gray-300">-</span>, premium: 'Incluse' },
                                ].map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-5 font-medium text-gray-700 pl-8">{row.name}</td>
                                        <td className="p-5 text-center text-gray-600">{row.discovery}</td>
                                        <td className="p-5 text-center font-semibold text-primary-700 bg-primary-50/20 group-hover:bg-primary-50/40 transition-colors">{row.verified}</td>
                                        <td className="p-5 text-center text-gray-900 font-medium">{row.premium}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-4">
                Paiement sécurisé et annulation possible à tout moment.
            </p>
        </div>
    );
};
