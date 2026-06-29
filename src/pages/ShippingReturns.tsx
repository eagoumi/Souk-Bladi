import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MapPin } from 'lucide-react';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const ShippingReturns: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <SEO
                title={t('shipping.title')}
                description={t('shipping.desc')}
            />

            {/* Header */}
            <div className="bg-white border-b border-gray-100 py-12 mb-12">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">{t('shipping.title')}</h1>
                        <p className="text-xl text-gray-500">{t('shipping.desc')}</p>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Delivery Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-6">
                            <div className="bg-primary-50 p-4 rounded-xl text-primary-600 shrink-0">
                                <Truck size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('shipping.delivery.title')}</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {t('shipping.delivery.desc')}
                                    Nous couvrons l'ensemble des 12 régions du Royaume, avec des partenaires de confiance comme Amana, CTM, et des livreurs locaux pour les zones urbaines.
                                </p>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <h3 className="font-bold text-gray-900 mb-1">{t('shipping.costs.title')}</h3>
                                        <p className="text-sm text-gray-600">{t('shipping.costs.standard')}</p>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <h3 className="font-bold text-green-900 mb-1">Livraison Offerte</h3>
                                        <p className="text-sm text-green-700">{t('shipping.costs.free')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Returns Section */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-6">
                            <div className="bg-orange-50 p-4 rounded-xl text-orange-600 shrink-0">
                                <RotateCcw size={32} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('shipping.returns.title')}</h2>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {t('shipping.returns.desc')}
                                    Si un produit ne correspond pas à vos attentes ou arrive endommagé, nous nous engageons à le remplacer ou à vous rembourser.
                                </p>
                                <ul className="space-y-3 mt-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <ShieldCheck size={20} className="text-green-500 mt-1" />
                                        <span>Produit défectueux ou non conforme : Retour gratuit pris en charge à 100%.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <MapPin size={20} className="text-gray-400 mt-1" />
                                        <span>Change d'avis ? Retour à la charge du client vers notre entrepôt central.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
};
