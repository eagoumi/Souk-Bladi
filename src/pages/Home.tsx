import { HeroSlider } from '../components/home/HeroSlider';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Truck, Users, ClipboardCheck, Monitor, LayoutGrid, CreditCard, Activity, Package, Megaphone, Share2, Heart, Camera } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/domain/ProductCard';
import { CooperativeCard } from '../components/domain/CooperativeCard';
import { cooperatives, collections } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { SEO } from '../components/common/SEO';

export const Home: React.FC = () => {
    const { t } = useLanguage();
    const { products } = useProducts();
    const featuredProducts = products.filter(p => p.bestSeller).slice(0, 4);
    const featuredCoops = cooperatives.filter(c => c.featured).slice(0, 3);

    return (
        <div className="font-sans text-gray-900 pb-24 space-y-32">
            <SEO
                title="Accueil"
                description="Découvrez l'authenticité de l'artisanat marocain sur Souk Bladna. Produits certifiés, impact social et livraison rapide."
            />
            {/* Hero Section */}
            <div className="relative">
                <HeroSlider />
                {/* Floating Trust Badges */}
                <div className="hidden lg:block absolute -bottom-10 left-0 right-0 z-20">
                    <Container>
                        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 grid grid-cols-6 divide-x divide-gray-100">
                            {[
                                { icon: ShieldCheck, title: t('features.authentic'), subtitle: t('features.authentic.sub') },
                                { icon: Users, title: t('features.social'), subtitle: t('features.social.sub') },
                                { icon: Truck, title: t('features.delivery'), subtitle: t('features.delivery.sub') },
                                { icon: Star, title: t('features.quality'), subtitle: t('features.quality.sub') },
                                { icon: ClipboardCheck, title: t('features.trust'), subtitle: t('features.trust.sub') },
                                { icon: Monitor, title: t('features.support'), subtitle: t('features.support.sub') }
                            ].map((feature, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center gap-2 group px-4">
                                    <feature.icon size={28} strokeWidth={1.5} className="text-gray-400 group-hover:text-primary-600 transition-colors duration-300" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{feature.title}</h4>
                                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{feature.subtitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            </div>

            {/* Mobile Trust Badges (Visible only on small screens) */}
            <div className="lg:hidden mt-8">
                <Container>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: ShieldCheck, title: t('features.authentic') },
                            { icon: Truck, title: t('features.delivery') },
                            { icon: Star, title: t('features.quality') },
                            { icon: Monitor, title: t('features.support') }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
                                <feature.icon size={20} className="text-primary-600" />
                                <span className="font-bold text-sm text-gray-700">{feature.title}</span>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Promoted Products (Coups de Cœur) - Enhanced */}
            {products.some(p => p.isPromoted) && (
                <section className="relative overflow-hidden pt-12">
                    <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-orange-50/50 to-transparent -z-10" />
                    <Container>
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                            <div>
                                <span className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs mb-3">
                                    <Star size={14} fill="currentColor" /> {t('home.featured.badge')}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display tracking-tight">{t('home.featured.title')}</h2>
                            </div>
                            <Link to="/products" className="hidden md:flex text-gray-900 font-medium hover:text-primary-600 items-center gap-2 group transition-colors">
                                {t('home.featured.viewSelection')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.filter(p => p.isPromoted).slice(0, 4).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </Container>
                </section>
            )}

            {/* Platform Services - Bento Grid Style */}
            <section>
                <Container>
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-3 block">{t('home.experience.badge')}</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">{t('home.experience.title')}</h2>
                        <p className="text-gray-500 text-lg">
                            {t('home.experience.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-gray-50 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-blue-600">
                                    <LayoutGrid size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('home.experience.catalog.title')}</h3>
                                <p className="text-gray-500 max-w-md">{t('home.experience.catalog.desc')}</p>
                            </div>
                        </div>
                        <div className="bg-gray-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 z-0" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 text-white border border-white/10">
                                    <Activity size={28} />
                                </div>
                                <h3 className="text-2xl font-bold mb-3">{t('home.experience.impact.title')}</h3>
                                <p className="text-gray-400">{t('home.experience.impact.desc')}</p>
                            </div>
                        </div>
                        <div className="bg-orange-50 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm text-orange-600">
                                    <Package size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('home.experience.logistics.title')}</h3>
                                <p className="text-gray-600">{t('home.experience.logistics.desc')}</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1">
                                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                                        <CreditCard size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('home.experience.payment.title')}</h3>
                                    <p className="text-gray-500">{t('home.experience.payment.desc')}</p>
                                </div>
                                <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                        <span className="text-xs font-mono">Secure Payment UI</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Featured Collections - Immersive */}
            <section className="bg-gray-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2676&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

                <Container className="relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <span className="text-primary-400 font-bold uppercase tracking-widest text-xs mb-3 block">{t('home.collections.badge')}</span>
                            <h2 className="text-4xl md:text-6xl font-bold font-display text-white">{t('home.collections.title')}</h2>
                        </div>
                        <Link to="/gift-sets">
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                                {t('home.collections.cta')}
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {collections.map((collection, idx) => (
                            <Link
                                to={`/gift-sets`}
                                key={collection.id}
                                className={`group relative rounded-[2rem] overflow-hidden cursor-pointer ${idx === 1 ? 'md:-mt-12 md:mb-12' : ''}`}
                            >
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img
                                        src={collection.imageUrl}
                                        alt={collection.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <span className="text-primary-400 text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{collection.theme}</span>
                                    <h3 className="text-3xl font-display font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">{collection.name}</h3>
                                    <p className="text-gray-300 line-clamp-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        {collection.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Featured Products */}
            <section className="py-24">
                <Container>
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-3 block">{t('home.bestsellers.badge')}</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-display">{t('home.bestsellers.title')}</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Link to="/products">
                            <Button className="px-10 py-4 h-auto text-lg rounded-full">
                                {t('home.bestsellers.cta')}
                            </Button>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* Mission / Marketing Split */}
            <section className="py-24 bg-[#FDF8F6] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fae8e0]/30 -skew-x-12 translate-x-32" />
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary-600 font-bold uppercase tracking-widest text-xs mb-3 block">{t('home.mission.badge')}</span>
                            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 font-display leading-tight">
                                {t('home.mission.title')}
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600">
                                <p>
                                    {t('home.mission.desc1')}
                                </p>
                                <p>
                                    {t('home.mission.desc2')}
                                </p>
                            </div>
                            <div className="mt-10 grid grid-cols-2 gap-8">
                                <div>
                                    <span className="block text-4xl font-bold text-gray-900 mb-1">50+</span>
                                    <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">{t('home.mission.stats.coops')}</span>
                                </div>
                                <div>
                                    <span className="block text-4xl font-bold text-gray-900 mb-1">100%</span>
                                    <span className="text-sm text-gray-500 font-medium uppercase tracking-wider">{t('home.mission.stats.auth')}</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="relative z-10 grid grid-cols-2 gap-4">
                                <div className="space-y-4 translate-y-8">
                                    <div className="bg-white p-6 rounded-[2rem] shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center mb-4">
                                            <Share2 size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{t('home.mission.social')}</h4>
                                        <p className="text-sm text-gray-500">Une communauté engagée sur tous les réseaux.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-[2rem] shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                        <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center mb-4">
                                            <Megaphone size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{t('home.mission.marketing')}</h4>
                                        <p className="text-sm text-gray-500">Campagnes ciblées pour chaque artisan.</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-white p-6 rounded-[2rem] shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-4">
                                            <Heart size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{t('home.mission.story')}</h4>
                                        <p className="text-sm text-gray-500">Histoires uniques derrière chaque produit.</p>
                                    </div>
                                    <div className="bg-white p-6 rounded-[2rem] shadow-xl hover:-translate-y-2 transition-transform duration-300">
                                        <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-xl flex items-center justify-center mb-4">
                                            <Camera size={24} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">{t('home.mission.content')}</h4>
                                        <p className="text-sm text-gray-500">Shooting professionnel des produits.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            {/* Featured Cooperatives */}
            <section className="py-24 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50 -z-10 rounded-l-[5rem]" />
                <Container>
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
                        <div>
                            <span className="text-primary-600 font-medium uppercase tracking-widest text-sm mb-2 block">{t('home.coops.badge')}</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-display">{t('home.coops.title')}</h2>
                            <p className="text-gray-600 max-w-xl text-lg leading-relaxed">
                                {t('home.coops.desc')}
                            </p>
                        </div>
                        <Link to="/cooperatives">
                            <Button variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-full text-lg">
                                {t('home.coops.cta')}
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {featuredCoops.map(coop => (
                            <CooperativeCard key={coop.id} cooperative={coop} />
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
};
