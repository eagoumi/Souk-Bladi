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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 pt-8 px-2 lg:px-6">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={`relative rounded-3xl p-1 flex flex-col transition-all duration-300 transform hover:-translate-y-2 ${tier.recommended
                            ? 'shadow-2xl shadow-primary-500/10 ring-1 ring-primary-500/20 scale-105 z-10'
                            : 'shadow-lg shadow-gray-200/50 hover:shadow-xl bg-white border border-gray-100 hover:z-10'
                            }`}
                    >
                        {tier.recommended && (
                            <div className="absolute inset-x-0 -top-px h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 rounded-t-3xl" />
                        )}

                        <div className={`h-full bg-white rounded-[22px] p-6 flex flex-col ${tier.recommended ? 'bg-gradient-to-b from-primary-50/30 to-white' : ''}`}>
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
                                <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold border ${tier.id === 'premium' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                                    tier.id === 'verified' ? 'bg-primary-100 text-primary-700 border-primary-200' :
                                        'bg-gray-100 text-gray-700 border-gray-200'
                                    }`}>
                                    {tier.id === 'premium' && <Crown size={14} fill="currentColor" />}
                                    {tier.id === 'verified' && <ShieldCheck size={14} />}
                                    {tier.id === 'discovery' && <Star size={14} />}
                                    {tier.name}
                                </div>
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

            {/* Senior Comparison Table */}
            <div className="mt-24">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold font-display text-gray-900">Comparaison détaillée</h3>
                    <p className="text-gray-500 mt-3 text-lg">Tout ce dont vous avez besoin pour réussir.</p>
                </div>

                <div className="bg-white rounded-[32px] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden ring-1 ring-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-6 w-1/4 bg-white sticky left-0 z-10"></th>
                                    <th className="p-6 w-1/4 text-center pb-8">
                                        <div className="text-gray-900 font-bold text-lg mb-1">Découverte</div>
                                        <div className="text-sm text-gray-400 font-medium">Gratuit</div>
                                    </th>
                                    <th className="p-6 w-1/4 text-center pb-8 relative bg-primary-50/10">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-primary-500 rounded-b-full opacity-20 mx-12"></div>
                                        <div className="text-primary-700 font-bold text-lg mb-1 flex items-center justify-center gap-2">
                                            Vérifié <ShieldCheck size={16} />
                                        </div>
                                        <div className="text-sm text-primary-600/70 font-medium">99 MAD/mois</div>
                                    </th>
                                    <th className="p-6 w-1/4 text-center pb-8">
                                        <div className="text-amber-700 font-bold text-lg mb-1 flex items-center justify-center gap-2">
                                            Premium <Crown size={16} />
                                        </div>
                                        <div className="text-sm text-amber-600/70 font-medium">249 MAD/mois</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Section: Visibilité & Identité */}
                                <tr className="bg-gray-50/50">
                                    <td colSpan={4} className="py-3 px-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                                        Visibilité & Identité
                                    </td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 text-gray-700 font-medium border-r border-gray-50 bg-white group-hover:bg-gray-50 transition-colors sticky left-0 z-10">Badge de confiance</td>
                                    <td className="p-6 text-center text-gray-400 text-sm">Nouveau</td>
                                    <td className="p-6 text-center bg-primary-50/5 border-x border-primary-50 text-gray-900 font-medium">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary-100 text-primary-700">Vérifié</span>
                                    </td>
                                    <td className="p-6 text-center text-gray-900 font-medium">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Top Vendeur</span>
                                    </td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 text-gray-700 font-medium border-r border-gray-50 bg-white group-hover:bg-gray-50 transition-colors sticky left-0 z-10">Exposition sur le site</td>
                                    <td className="p-6 text-center text-gray-500">Standard</td>
                                    <td className="p-6 text-center bg-primary-50/5 border-x border-primary-50 text-gray-900 font-bold">Boost x2</td>
                                    <td className="p-6 text-center text-gray-900 font-bold">Boost x10 (Une)</td>
                                </tr>

                                {/* Section: Vente & Produits */}
                                <tr className="bg-gray-50/50">
                                    <td colSpan={4} className="py-3 px-6 text-xs font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100">
                                        Vente & Produits
                                    </td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 text-gray-700 font-medium border-r border-gray-50 bg-white group-hover:bg-gray-50 transition-colors sticky left-0 z-10">Catalogue produits</td>
                                    <td className="p-6 text-center text-gray-500">5 produits</td>
                                    <td className="p-6 text-center bg-primary-50/5 border-x border-primary-50 text-gray-900 font-bold flex items-center justify-center gap-2">
                                        <Check className="text-green-500" size={18} /> Illimité
                                    </td>
                                    <td className="p-6 text-center text-gray-900 font-bold">Illimité</td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 text-gray-700 font-medium border-r border-gray-50 bg-white group-hover:bg-gray-50 transition-colors sticky left-0 z-10">Commission</td>
                                    <td className="p-6 text-center text-gray-500">Standard (15%)</td>
                                    <td className="p-6 text-center bg-primary-50/5 border-x border-primary-50 text-green-600 font-bold">Réduite (10%)</td>
                                    <td className="p-6 text-center text-green-600 font-bold">0% (50 1ers)</td>
                                </tr>

                                {/* Section: Support & Outils */}
                                <tr className="bg-gray-50/50">
                                    <td colSpan={4} className="py-3 px-6 text-xs font-bold uppercase tracking-widest text-gray-400 border-t border-gray-100">
                                        Support & Outils
                                    </td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 text-gray-700 font-medium border-r border-gray-50 bg-white group-hover:bg-gray-50 transition-colors sticky left-0 z-10">Support client</td>
                                    <td className="p-6 text-center text-gray-400 text-sm">Email (48h)</td>
                                    <td className="p-6 text-center bg-primary-50/5 border-x border-primary-50 text-gray-900 font-medium">Prioritaire (24h)</td>
                                    <td className="p-6 text-center text-gray-900 font-bold text-amber-700">Manager dédié</td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 text-gray-700 font-medium border-r border-gray-50 bg-white group-hover:bg-gray-50 transition-colors sticky left-0 z-10">Tableau de bord</td>
                                    <td className="p-6 text-center flex justify-center"><Check size={18} className="text-gray-300" /></td>
                                    <td className="p-6 text-center bg-primary-50/5 border-x border-primary-50 flex justify-center"><Check size={20} className="text-primary-600" /></td>
                                    <td className="p-6 text-center flex justify-center"><Check size={20} className="text-amber-600" /></td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 text-gray-700 font-medium border-r border-gray-50 bg-white group-hover:bg-gray-50 transition-colors sticky left-0 z-10">Analyses avancées</td>
                                    <td className="p-6 text-center flex justify-center"><div className="w-4 h-0.5 bg-gray-200"></div></td>
                                    <td className="p-6 text-center bg-primary-50/5 border-x border-primary-50 font-medium text-gray-900">Basique</td>
                                    <td className="p-6 text-center flex justify-center"><Check size={20} className="text-amber-600" /></td>
                                </tr>
                                <tr className="group hover:bg-gray-50 transition-colors">
                                    <td className="p-6 text-gray-700 font-medium border-r border-gray-50 bg-white group-hover:bg-gray-50 transition-colors sticky left-0 z-10">Formation Marketing</td>
                                    <td className="p-6 text-center flex justify-center"><div className="w-4 h-0.5 bg-gray-200"></div></td>
                                    <td className="p-6 text-center bg-primary-50/5 border-x border-primary-50 flex justify-center"><div className="w-4 h-0.5 bg-gray-200"></div></td>
                                    <td className="p-6 text-center flex justify-center"><Check size={20} className="text-amber-600" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};
