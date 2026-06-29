import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { useLanguage } from '../../context/LanguageContext';

export const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 border-t border-gray-800">
            <Container>
                {/* Newsletter Section */}
                <div className="mb-16 border-b border-gray-800 pb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl text-center lg:text-left">
                            <h3 className="text-2xl font-display font-bold text-white mb-2">{t('footer.newsletter.title')}</h3>
                            <p className="text-gray-400">Recevez nos dernières offres et découvrez les histoires de nos artisans.</p>
                        </div>
                        <form className="w-full max-w-md flex gap-2">
                            <input
                                type="email"
                                placeholder={t('footer.newsletter.placeholder')}
                                className="flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                            />
                            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center">
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="space-y-6">
                        <Link to="/" className="block">
                            <img src="/imgs/Logo.png" alt="Souk Bladna" className="h-12 w-auto object-contain brightness-0 invert" />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            {t('footer.mission')}
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-display">Découvrir</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/cosmetique" className="hover:text-primary-500 transition-colors">{t('category.cosmetics.title')}</Link></li>
                            <li><Link to="/terroir" className="hover:text-primary-500 transition-colors">{t('category.terroir.title')}</Link></li>
                            <li><Link to="/artisanat" className="hover:text-primary-500 transition-colors">{t('category.crafts.title')}</Link></li>
                            <li><Link to="/gift-sets" className="hover:text-primary-500 transition-colors">{t('nav.giftsets')}</Link></li>
                            <li><Link to="/pricing" className="hover:text-primary-500 transition-colors">{t('pricing.seo.title')}</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-display">{t('features.support')}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/contact" className="hover:text-primary-500 transition-colors">{t('nav.contact')}</Link></li>
                            <li><Link to="/livraison" className="hover:text-primary-500 transition-colors">{t('shipping.title')}</Link></li>
                            <li><Link to="/faq" className="hover:text-primary-500 transition-colors">FAQ</Link></li>
                            <li><Link to="/cooperatives" className="hover:text-primary-500 transition-colors">{t('nav.cooperatives')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-display">{t('nav.contact')}</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <div className="p-2 bg-gray-800 rounded-lg text-primary-500 mt-1">
                                    <MapPin size={16} />
                                </div>
                                <span className="text-gray-400">123 Avenue Mohammed V,<br />Agadir, Maroc</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-2 bg-gray-800 rounded-lg text-primary-500">
                                    <Phone size={16} />
                                </div>
                                <span className="text-gray-400">+212 5 37 90 23 56</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-2 bg-gray-800 rounded-lg text-primary-500">
                                    <Mail size={16} />
                                </div>
                                <span className="text-gray-400">contact@soukbladna.ma</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium">
                    <p>{t('footer.copyright')}</p>
                    <div className="flex flex-wrap items-center gap-6 mt-4 md:mt-0">
                        <div className="flex space-x-6">
                            <Link to="#" className="hover:text-primary-500 transition-colors">{t('footer.links.privacy')}</Link>
                            <Link to="#" className="hover:text-primary-500 transition-colors">CGV</Link>
                            <Link to="#" className="hover:text-primary-500 transition-colors">Mentions Légales</Link>
                        </div>
                        <div className="flex items-center gap-3 pl-0 md:pl-6 border-l-0 md:border-l border-gray-800">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 opacity-60 hover:opacity-100 transition-opacity" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 opacity-60 hover:opacity-100 transition-opacity" />
                            <div className="bg-white/10 px-2 py-0.5 rounded text-xs font-bold text-gray-400">CMI</div>
                            <div className="bg-white/10 px-1 py-0.5 rounded" title="Cash on Delivery">
                                <img src="https://cdn-icons-png.flaticon.com/512/2331/2331941.png" alt="Cash" className="w-4 h-4 invert opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
