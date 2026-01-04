import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X, Globe, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useWishlist } from '../../context/WishlistContext';
import { Container } from '../common/Container';

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { itemCount } = useCart();
    const { items: wishlistItems } = useWishlist();
    const { user, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
        }
    };

    const toggleLanguage = () => {
        const nextFn = { 'fr': 'en', 'en': 'ar', 'ar': 'fr' };
        setLanguage(nextFn[language] as 'fr' | 'en' | 'ar');
    };

    // Styling logic
    const isTransparent = isHome && !isScrolled && !isMenuOpen;

    // Text Colors
    const textColor = isTransparent ? 'text-white' : 'text-gray-900';

    const hoverColor = isTransparent ? 'hover:text-white/80' : 'hover:text-primary-600';

    // Backgrounds
    const navBackground = isTransparent ? 'bg-transparent' : 'glass';
    const borderColor = isTransparent ? 'border-transparent' : 'border-gray-100';

    return (
        <nav className={`${navBackground} ${borderColor} border-b fixed top-0 w-full z-50 transition-all duration-500 ease-in-out`}>
            <Container>
                <div className="flex items-center justify-between h-20 md:h-24 transition-all duration-300">

                    {/* Logo */}
                    <Link to="/" className="relative z-50 transition-transform hover:scale-105">
                        <img
                            src="/imgs/Logo.png"
                            alt="Souk Bladna"
                            className={`h-12 w-auto object-contain transition-all duration-300 ${isTransparent ? 'brightness-0 invert' : ''}`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {['nav.home', 'nav.products', 'nav.giftsets', 'nav.cooperatives', 'nav.about', 'nav.contact'].map((key) => {
                                const path = key === 'nav.home' ? '/' : `/${key.split('.')[1].replace('giftsets', 'gift-sets')}`;
                                const isActive = location.pathname === path;
                                return (
                                    <Link
                                        key={key}
                                        to={path}
                                        className={`text-sm font-medium uppercase tracking-wide transition-colors ${isActive ? 'text-primary-500' : textColor} ${hoverColor}`}
                                    >
                                        {t(key)}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-6">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className={`relative group ${isTransparent ? 'text-white' : 'text-gray-400'}`}>
                            <input
                                type="text"
                                placeholder={t('search.placeholder')}
                                className={`w-0 group-hover:w-48 focus:w-48 pl-0 group-hover:pl-4 focus:pl-4 pr-8 py-1 bg-transparent border-b ${isTransparent ? 'border-white/50 focus:border-white' : 'border-gray-300 focus:border-primary-500'} transition-all duration-300 focus:outline-none text-sm ${textColor}`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search size={20} className="absolute right-0 top-1.5 cursor-pointer pointer-events-none" />
                        </form>

                        <div className="h-5 w-px bg-current opacity-20" />

                        <button onClick={toggleLanguage} className={`${textColor} ${hoverColor} font-medium uppercase text-xs flex items-center gap-1`}>
                            <Globe size={16} />
                            {language}
                        </button>

                        <div className="flex items-center gap-4">
                            <Link to="/wishlist" className={`relative ${textColor} ${hoverColor} transition-transform hover:scale-105`}>
                                <Heart size={22} />
                                {wishlistItems.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                                        {wishlistItems.length}
                                    </span>
                                )}
                            </Link>

                            <Link to="/cart" className={`relative ${textColor} ${hoverColor} transition-transform hover:scale-105`}>
                                <ShoppingCart size={22} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                                        {itemCount}
                                    </span>
                                )}
                            </Link>

                            {user ? (
                                <div className="relative group">
                                    <button className={`${textColor} ${hoverColor}`}>
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover" />
                                        ) : (
                                            <User size={22} />
                                        )}
                                    </button>
                                    <div className="absolute right-0 mt-4 w-56 glass rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50 translate-y-2 group-hover:translate-y-0">
                                        <div className="px-5 py-3 border-b border-gray-100">
                                            <p className="font-medium text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        {['admin', 'cooperative', 'super_admin', 'manager'].includes(user.role) && (
                                            <Link to="/dashboard" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors">
                                                <LayoutDashboard size={16} /> {t('nav.dashboard')}
                                            </Link>
                                        )}
                                        <Link to="/account" className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors">
                                            <User size={16} /> {t('nav.login')} {/* Using 'Login' generically for Profile if no profile key, but let's add common.profile or similar later if needed. For now sticking to keys I have or adding simple ones. Actually nav.login is Login. I should add nav.profile */}
                                        </Link>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-5 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                        >
                                            <LogOut size={16} /> {t('nav.logout')}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <Link to="/login" className={`${textColor} ${hoverColor}`}>
                                    <User size={22} />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex lg:hidden items-center gap-4">
                        <Link to="/cart" className={`relative ${textColor}`}>
                            <ShoppingCart size={24} />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-1 ${textColor} focus:outline-none transition-transform active:scale-95 relative z-50`}
                        >
                            {isMenuOpen ? <X size={28} className="text-gray-900" /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </Container>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-secondary/95 backdrop-blur-xl z-40 transition-all duration-500 lg:hidden flex flex-col pt-24 px-6 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t('search.placeholder')}
                            className="w-full pl-5 pr-12 py-4 rounded-xl bg-white border-none shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary-500 text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-600 p-1">
                            <Search size={24} />
                        </button>
                    </div>
                </form>

                <div className="flex flex-col space-y-2">
                    {['nav.home', 'nav.products', 'nav.giftsets', 'nav.cooperatives', 'nav.about', 'nav.contact'].map((key, idx) => (
                        <Link
                            key={key}
                            to={key === 'nav.home' ? '/' : `/${key.split('.')[1].replace('giftsets', 'gift-sets')}`}
                            className="text-3xl font-display font-medium text-gray-900 py-3 border-b border-gray-100 last:border-0 hover:text-primary-600 transition-colors"
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            {t(key)}
                        </Link>
                    ))}
                </div>

                <div className="mt-auto pb-10 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={toggleLanguage} className="bg-white p-4 rounded-xl flex items-center justify-center gap-2 shadow-sm">
                            <Globe size={20} /> <span className="uppercase">{language}</span>
                        </button>
                        <Link to="/account" className="bg-white p-4 rounded-xl flex items-center justify-center gap-2 shadow-sm text-gray-900">
                            <User size={20} /> <span>Compte</span>
                        </Link>
                    </div>
                    {user && (
                        <button onClick={logout} className="text-red-600 font-medium text-center py-2">
                            Se déconnecter
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};
