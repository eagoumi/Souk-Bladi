import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Heart, MessageSquare, UserPlus, BadgeCheck, ChevronRight, Star, ShieldCheck, Globe, Phone, Mail } from 'lucide-react';
import { Container } from '../components/common/Container';
import { ProductCard } from '../components/domain/ProductCard';
import { cooperatives } from '../data/mockData';
import { useProducts } from '../context/ProductContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useLanguage } from '../context/LanguageContext';

type Tab = 'home' | 'products' | 'profile' | 'contact';

export const CooperativeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { t } = useLanguage();
    const cooperative = cooperatives.find(c => c.id === id);
    const { products } = useProducts();
    const coopProducts = products.filter(p => p.coopId === id);
    const [activeTab, setActiveTab] = useState<Tab>('home');
    const [isFollowing, setIsFollowing] = useState(false);

    if (!cooperative) {
        return <div className="p-20 text-center">{t('coops.notFound')}</div>;
    }

    // Mock stats
    const stats = [
        { label: 'Années d\'expérience', value: '12+' },
        { label: 'Commandes livrées', value: '1.5k+' },
        { label: 'Taux de réponse', value: '98%' },
        { label: 'Note moyenne', value: '4.9' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-white shadow-sm pb-0">
                {/* Banner */}
                <div className="h-48 md:h-64 w-full relative group bg-gray-200">
                    <img
                        src={cooperative.bannerUrl}
                        alt="Couverture"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>

                    {/* Action Bar Overlay */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors text-gray-700 hover:text-red-500 shadow-sm">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>

                <Container>
                    <div className="relative mb-6 flex flex-col md:flex-row items-end md:items-center gap-6 pb-6 border-b border-gray-100">
                        {/* Logo - Shifted up to overlap banner */}
                        <div className="relative -mt-12 md:-mt-16 flex-shrink-0">
                            <img
                                src={cooperative.logoUrl}
                                alt={cooperative.name}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-white shadow-lg bg-white object-cover"
                            />
                            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-white" title="Verified Producer">
                                <BadgeCheck size={16} fill="currentColor" strokeWidth={0} className="text-white" />
                            </div>
                        </div>

                        {/* Basic Info - Now sits comfortably below the banner on white bg */}
                        <div className="flex-1 pt-2 md:pt-4">
                            <div className="flex items-center gap-2 mb-1">
                                <h1 className="text-2xl font-bold text-gray-900">{cooperative.name}</h1>
                                <Badge variant="success" className="text-xs flex items-center gap-1">
                                    <ShieldCheck size={12} /> Vérifié
                                </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1"><MapPin size={14} /> {cooperative.region}</span>
                                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /> {cooperative.rating}/5 (120 avis)</span>
                                <span>• 12 ans d'activité</span>
                            </div>
                        </div>

                        {/* Main Actions */}
                        <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0">
                            <Button
                                variant={isFollowing ? "outline" : "primary"}
                                onClick={() => setIsFollowing(!isFollowing)}
                                className="flex-1 md:flex-none gap-2"
                            >
                                <UserPlus size={18} /> {isFollowing ? 'Suivi' : 'Suivre'}
                            </Button>
                            <Button variant="outline" className="flex-1 md:flex-none gap-2">
                                <MessageSquare size={18} /> Contacter
                            </Button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-8 overflow-x-auto scrollbar-hide">
                        {[
                            { id: 'home', label: 'Accueil' },
                            { id: 'products', label: 'Produits' },
                            { id: 'profile', label: 'Profil Entreprise' },
                            { id: 'contact', label: 'Contacts' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-primary-600 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </Container>
            </div>

            <Container className="mt-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar (Info) */}
                    <div className="hidden lg:block w-80 flex-shrink-0 space-y-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Informations</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Type d'entreprise</span>
                                    <span className="font-medium">Coopérative</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Employés</span>
                                    <span className="font-medium">11-50</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Année fondation</span>
                                    <span className="font-medium">2012</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-gray-50">
                                    <span className="text-gray-500">Marchés principaux</span>
                                    <span className="font-medium">Maroc, Europe</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4">Capacités</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Bio', 'Fait Main', 'Commerce Équitable', 'Vente en Gros'].map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">

                        {/* HOME TAB */}
                        {activeTab === 'home' && (
                            <div className="space-y-8 animate-fade-in">
                                {/* About Summary */}
                                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                    <h2 className="text-xl font-bold mb-4">À propos de nous</h2>
                                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                        {cooperative.story}
                                    </p>
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className="text-primary-600 font-medium text-sm flex items-center hover:underline"
                                    >
                                        En savoir plus <ChevronRight size={16} />
                                    </button>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 text-center shadow-sm">
                                            <div className="text-2xl font-bold text-primary-600 mb-1">{stat.value}</div>
                                            <div className="text-xs text-gray-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Featured Products */}
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold">Produits en vedette</h2>
                                        <button
                                            onClick={() => setActiveTab('products')}
                                            className="text-primary-600 text-sm font-medium hover:underline"
                                        >
                                            Voir tout
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {coopProducts.slice(0, 3).map(p => (
                                            <ProductCard key={p.id} product={p} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PRODUCTS TAB */}
                        {activeTab === 'products' && (
                            <div className="animate-fade-in">
                                <h2 className="text-xl font-bold mb-6">Tous nos produits ({coopProducts.length})</h2>
                                {coopProducts.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {coopProducts.map(p => (
                                            <ProductCard key={p.id} product={p} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                                        <p className="text-gray-500">Aucun produit disponible pour le moment.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm animate-fade-in space-y-8">
                                <div>
                                    <h2 className="text-xl font-bold mb-4">Notre Histoire</h2>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                        {cooperative.story}
                                        {'\n\n'}
                                        Depuis notre création, nous nous engageons à fournir des produits d'une qualité exceptionnelle tout en soutenant l'économie locale et en préservant les méthodes traditionnelles de fabrication.
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                    <div>
                                        <h3 className="font-bold mb-4">Détails de l'entreprise</h3>
                                        <ul className="space-y-3 text-sm text-gray-600">
                                            <li className="grid grid-cols-2"><span className="text-gray-400">Nom légal:</span> <span>{cooperative.name} S.A.R.L</span></li>
                                            <li className="grid grid-cols-2"><span className="text-gray-400">Région:</span> <span>{cooperative.region}</span></li>
                                            <li className="grid grid-cols-2"><span className="text-gray-400">Type d'activité:</span> <span>Production & Export</span></li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-4">Certifications</h3>
                                        <div className="flex gap-4">
                                            {/* Placeholders for cert badges */}
                                            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 text-xs font-bold text-gray-400">BIO</div>
                                            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 text-xs font-bold text-gray-400">ISO</div>
                                            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 text-xs font-bold text-gray-400">ONSSA</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CONTACT TAB */}
                        {activeTab === 'contact' && (
                            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
                                <h2 className="text-xl font-bold mb-6">Contactez-nous</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary-50 p-3 rounded-lg text-primary-600"><MapPin size={20} /></div>
                                            <div>
                                                <h4 className="font-bold text-sm">Adresse</h4>
                                                <p className="text-gray-600 text-sm mt-1">{cooperative.region}, Maroc</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary-50 p-3 rounded-lg text-primary-600"><Phone size={20} /></div>
                                            <div>
                                                <h4 className="font-bold text-sm">Téléphone</h4>
                                                <p className="text-gray-600 text-sm mt-1">+212 600 000 000</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary-50 p-3 rounded-lg text-primary-600"><Mail size={20} /></div>
                                            <div>
                                                <h4 className="font-bold text-sm">Email</h4>
                                                <p className="text-gray-600 text-sm mt-1">contact@{cooperative.id}.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-primary-50 p-3 rounded-lg text-primary-600"><Globe size={20} /></div>
                                            <div>
                                                <h4 className="font-bold text-sm">Site Web</h4>
                                                <p className="text-gray-600 text-sm mt-1">www.{cooperative.id}.com</p>
                                            </div>
                                        </div>
                                    </div>

                                    <form className="bg-gray-50 p-6 rounded-xl space-y-4">
                                        <h3 className="font-bold text-sm">Envoyer un message direct</h3>
                                        <input type="text" placeholder="Votre nom" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500" />
                                        <input type="email" placeholder="Votre email" className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500" />
                                        <textarea placeholder="Votre message..." rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500"></textarea>
                                        <Button fullWidth>Envoyer le message</Button>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </Container>
        </div>
    );
};
