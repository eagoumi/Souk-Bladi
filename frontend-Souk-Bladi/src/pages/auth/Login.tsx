import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { FadeIn, StaggerContainer, StaggerItem, SlideInLeft } from '../../components/common/Motion';

import { useLanguage } from '../../context/LanguageContext';

export const Login: React.FC = () => {
    const { t } = useLanguage();
    // ...
    // keep hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(t('common.error') || 'Échec de la connexion. Veuillez réessayer.');
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            <SEO title={t('auth.login.title')} description="Connectez-vous à votre espace Souk Bladna." />
            {/* Left Side - Image/Brand */}
            <FadeIn className="hidden lg:flex lg:w-1/2 relative bg-gray-900" duration={0.8}>
                <img
                    src="https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=2000&auto=format&fit=crop"
                    alt="Moroccan Architecture"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 w-full flex flex-col justify-between p-12 text-white">
                    <div>
                        <Link to="/" className="inline-block mb-8">
                            <img src="/imgs/Logo.png" alt="Souk Bladna" className="h-16 w-auto brightness-0 invert" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <Link to="/" className="text-sm font-medium text-white/80 hover:text-white transition-colors inline-flex items-center gap-2">
                                <ArrowLeft size={16} /> {t('auth.back')}
                            </Link>
                        </div>
                    </div>
                    <SlideInLeft delay={0.3} className="space-y-6 max-w-lg">
                        <h1 className="text-5xl font-bold font-display leading-tight">
                            L'authenticité à portée de main.
                        </h1>
                        <p className="text-xl text-gray-200 font-light">
                            Rejoignez la communauté Souk Bladna et découvrez le meilleur de l'artisanat marocain.
                        </p>
                    </SlideInLeft>
                    <FadeIn delay={0.6} className="text-sm text-gray-400">
                        © 2026 Souk Bladna. Tous droits réservés.
                    </FadeIn>
                </div>
            </FadeIn>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-12 bg-[#F9FAFB]">
                <StaggerContainer className="mx-auto w-full max-w-md bg-white p-10 rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100">
                    <StaggerItem className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">{t('auth.login.welcome')}</h2>
                        <p className="text-sm text-gray-500">
                            {t('auth.login.subtitle')}
                        </p>
                    </StaggerItem>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <StaggerItem>
                            <Input
                                label={t('auth.login.email')}
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="exemple@email.com"
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                        </StaggerItem>

                        <StaggerItem>
                            <Input
                                label={t('auth.login.password')}
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                            <div className="flex items-center justify-end mt-2">
                                <a href="#" className="font-medium text-xs text-primary-600 hover:text-primary-700 transition-colors">
                                    {t('auth.login.forgotPassword')}
                                </a>
                            </div>
                        </StaggerItem>

                        {error && (
                            <StaggerItem className="text-red-600 text-sm text-center bg-red-50 py-3 rounded-xl border border-red-100 font-medium">{error}</StaggerItem>
                        )}

                        <StaggerItem>
                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                disabled={loading}
                                className="h-12 text-base font-semibold shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {loading ? t('auth.login.submitting') : t('auth.login.submit')}
                            </Button>
                        </StaggerItem>
                    </form>

                    <StaggerItem className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            {t('auth.login.noAccount')}{' '}
                            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                                {t('auth.login.createAccount')}
                            </Link>
                        </p>
                    </StaggerItem>

                    <StaggerItem className="mt-10 pt-8 border-t border-gray-50">
                        <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-semibold mb-4">{t('auth.login.demo')}</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => { setEmail('admin@souk.ma'); setPassword('demo'); }}
                                className="flex justify-center items-center px-4 py-2.5 border border-gray-200 shadow-sm text-xs font-medium rounded-xl text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                Admin
                            </button>
                            <button
                                onClick={() => { setEmail('coop@souk.ma'); setPassword('demo'); }}
                                className="flex justify-center items-center px-4 py-2.5 border border-gray-200 shadow-sm text-xs font-medium rounded-xl text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                Coopérative
                            </button>
                        </div>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </div>
    );
};
