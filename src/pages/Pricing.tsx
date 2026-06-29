import React from 'react';
import { Star, Zap, Crown, Check } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const Pricing: React.FC = () => {
    const { t } = useLanguage();

    const plans = [
        {
            id: 'discovery',
            name: t('pricing.plans.discovery.name'),
            duration: t('pricing.plans.discovery.duration'),
            price: '50 MAD',
            icon: Star,
            color: 'blue',
            features: [
                t('pricing.plans.discovery.feature1'),
                t('pricing.plans.discovery.feature2'),
                t('pricing.plans.discovery.feature3')
            ]
        },
        {
            id: 'business',
            name: t('pricing.plans.business.name'),
            duration: t('pricing.plans.business.duration'),
            price: '300 MAD',
            icon: Zap,
            color: 'orange',
            popular: true,
            features: [
                t('pricing.plans.business.feature1'),
                t('pricing.plans.business.feature2'),
                t('pricing.plans.business.feature3'),
                t('pricing.plans.business.feature4')
            ]
        },
        {
            id: 'premium',
            name: t('pricing.plans.premium.name'),
            duration: t('pricing.plans.premium.duration'),
            price: '1000 MAD',
            icon: Crown,
            color: 'purple',
            features: [
                t('pricing.plans.premium.feature1'),
                t('pricing.plans.premium.feature2'),
                t('pricing.plans.premium.feature3'),
                t('pricing.plans.premium.feature4')
            ]
        }
    ];
    return (
        <div className="bg-gray-50 min-h-screen pb-24">
            <SEO
                title={t('pricing.seo.title')}
                description={t('pricing.seo.desc')}
            />

            {/* Hero Section with Gradient */}
            <div className="relative bg-gray-900 overflow-hidden pb-48 pt-24">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-gray-900 z-0" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-900/10 blur-[100px] rounded-full mix-blend-screen" />

                <Container className="relative z-10">
                    <div className="text-center max-w-2xl mx-auto">
                        <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md text-primary-400 font-bold uppercase tracking-widest text-xs mb-6 border border-white/10">
                            {t('pricing.hero.badge')}
                        </span>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                            {t('pricing.hero.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-400">{t('pricing.hero.titleHighlight')}</span>
                        </h1>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            {t('pricing.hero.subtitle')}
                        </p>
                    </div>
                </Container>
            </div>

            <Container className="relative z-20 -mt-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative bg-white rounded-[2rem] p-8 shadow-2xl flex flex-col transition-all duration-300 hover:-translate-y-2 group ${plan.popular ? 'border-2 border-primary-500 ring-8 ring-primary-500/10 z-10 scale-105 shadow-primary-900/20' : 'border border-gray-100 hover:border-gray-200'}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-orange-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <Crown size={14} fill="currentColor" /> {t('pricing.plan.recommended')}
                                </div>
                            )}

                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 ${plan.popular ? 'bg-gradient-to-br from-primary-50 to-orange-50 text-primary-600' : `bg-${plan.color}-50 text-${plan.color}-600`}`}>
                                <plan.icon size={32} strokeWidth={1.5} />
                            </div>

                            <div className="mb-2">
                                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                <div className="text-sm font-medium text-gray-400">{t('pricing.plan.duration')} : {plan.duration}</div>
                            </div>

                            <div className="my-6 pb-6 border-b border-gray-50">
                                <span className="text-5xl font-bold text-gray-900 font-display tracking-tight">{plan.price}</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                        <div className={`mt-0.5 p-1 rounded-full ${plan.popular ? 'bg-primary-100 text-primary-600' : `bg-${plan.color}-50 text-${plan.color}-600`}`}>
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className="text-gray-600 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to="/dashboard/products" className="mt-auto">
                                <Button
                                    variant={plan.popular ? 'primary' : 'outline'}
                                    className={`w-full justify-center py-4 text-base ${plan.popular ? 'shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40' : ''}`}
                                >
                                    {t('pricing.plan.select')}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('pricing.faq.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10 text-left">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-2">{t('pricing.faq.q1.title')}</h3>
                            <p className="text-gray-500">{t('pricing.faq.q1.desc')}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-lg mb-2">{t('pricing.faq.q2.title')}</h3>
                            <p className="text-gray-500">{t('pricing.faq.q2.desc')}</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
