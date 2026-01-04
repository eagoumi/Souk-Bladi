import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth, type UserRole } from '../../context/AuthContext';
import { ArrowLeft, Check } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem, SlideInLeft } from '../../components/common/Motion';

import { useLanguage } from '../../context/LanguageContext';

export const Register: React.FC = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth();
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'buyer' as UserRole
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        try {
            await register(formData);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Image/Brand */}
            <FadeIn className="hidden lg:flex lg:w-1/2 relative bg-gray-900" duration={0.8}>
                <img
                    src="https://images.unsplash.com/photo-1548216309-54b83f912185?q=80&w=2000&auto=format&fit=crop"
                    alt="Moroccan Crafts"
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
                            {t('auth.register.marketing.title')}
                        </h1>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center backdrop-blur-sm">
                                    <Check size={16} className="text-primary-300" />
                                </div>
                                <p className="text-lg text-gray-200">{t('auth.register.marketing.access')}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center backdrop-blur-sm">
                                    <Check size={16} className="text-primary-300" />
                                </div>
                                <p className="text-lg text-gray-200">{t('auth.register.marketing.support')}</p>
                            </div>
                        </div>
                    </SlideInLeft>
                    <FadeIn delay={0.6} className="text-sm text-gray-400">
                        © 2026 Souk Bladna. Rejoignez le mouvement.
                    </FadeIn>
                </div>
            </FadeIn>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-12 bg-[#F9FAFB]">
                <StaggerContainer className="mx-auto w-full max-w-lg bg-white p-10 rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100">
                    <StaggerItem className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 font-display mb-2">{t('auth.register.title')}</h2>
                        <p className="text-sm text-gray-500">
                            {t('auth.register.subtitle')}
                        </p>
                    </StaggerItem>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <StaggerItem className="grid grid-cols-2 gap-4">
                            <Input
                                label={t('auth.register.firstName')}
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                            <Input
                                label={t('auth.register.lastName')}
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                        </StaggerItem>

                        <StaggerItem>
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                        </StaggerItem>

                        <StaggerItem className="grid grid-cols-2 gap-4">
                            <Input
                                label="Mot de passe"
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                            <Input
                                label="Confirmer"
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            />
                        </StaggerItem>

                        <StaggerItem>
                            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                                {t('auth.register.accountType')}
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${formData.role === 'buyer' ? 'border-primary-500 bg-primary-50/50 text-primary-700 ring-1 ring-primary-500' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}>
                                    <input type="radio" name="role" value="buyer" checked={formData.role === 'buyer'} onChange={handleChange} className="sr-only" />
                                    <span className="font-bold text-sm">{t('auth.register.buyer')}</span>
                                </label>
                                <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${formData.role === 'cooperative' ? 'border-primary-500 bg-primary-50/50 text-primary-700 ring-1 ring-primary-500' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}>
                                    <input type="radio" name="role" value="cooperative" checked={formData.role === 'cooperative'} onChange={handleChange} className="sr-only" />
                                    <span className="font-bold text-sm">{t('auth.register.cooperative')}</span>
                                </label>
                            </div>
                        </StaggerItem>

                        <StaggerItem>
                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                disabled={loading}
                                className="h-12 text-base font-semibold shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {loading ? t('auth.register.submitting') : t('auth.register.submit')}
                            </Button>
                        </StaggerItem>
                    </form>

                    <StaggerItem className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            {t('auth.register.haveAccount')}{' '}
                            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                                {t('nav.login')}
                            </Link>
                        </p>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </div>
    );
};
