import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const Checkout: React.FC = () => {
    const { items, cartTotal, clearCart } = useCart();
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'success'>('form');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (items.length === 0 && step !== 'success') {
            navigate('/cart');
        }
    }, [items, navigate, step]);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setStep('success');
            clearCart();
        }, 1500);
    };

    if (step === 'success') {
        return (

            <Container className="py-20 text-center max-w-lg mx-auto">
                <SEO title={t('checkout.success.title')} description={t('checkout.success.desc')} />
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-4">{t('checkout.success.title')}</h2>
                <p className="text-gray-600 mb-8">
                    {t('checkout.success.desc')} #CMD-{Math.floor(Math.random() * 10000)}.
                </p>
                <Link to="/">
                    <Button size="lg" fullWidth>{t('checkout.success.back')}</Button>
                </Link>
            </Container>
        );
    }

    if (items.length === 0) return null; // Logic handled in useEffect, prevent flicker

    return (
        <Container className="py-12">
            <SEO title={t('checkout.title')} description={t('checkout.shipping')} />

            <Link to="/cart" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-6 transition-colors">
                <ArrowLeft size={18} className="mr-2" /> {t('checkout.backToCart')}
            </Link>

            <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Form Column */}
                <div className="flex-1">
                    <form id="checkout-form" onSubmit={handleCheckout} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-lg mb-4">{t('checkout.shipping')}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label={t('checkout.form.firstName')} required placeholder="Ali" />
                            <Input label={t('checkout.form.lastName')} required placeholder="Alaoui" />
                        </div>
                        <Input label={t('checkout.form.email')} type="email" required placeholder="ali@example.com" />
                        <Input label={t('checkout.form.phone')} required placeholder="+212 6..." />
                        <Input label={t('checkout.form.address')} required placeholder="123 Rue..." />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label={t('checkout.form.city')} required placeholder="Casablanca" />
                            <Input label={t('checkout.form.zip')} required placeholder="20000" />
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="font-bold text-lg mb-4">{t('checkout.payment')}</h3>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary-500 bg-gray-50">
                                    <input type="radio" name="payment" className="text-primary-600 focus:ring-primary-500" defaultChecked />
                                    <div className="flex-1">
                                        <span className="font-medium block">{t('checkout.payment.cod')}</span>
                                        <span className="text-sm text-gray-500">{t('checkout.payment.codDesc')}</span>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary-500 opacity-60">
                                    <input type="radio" name="payment" className="text-primary-600 focus:ring-primary-500" disabled />
                                    <div className="flex-1">
                                        <span className="font-medium block">{t('checkout.payment.card')}</span>
                                        <span className="text-sm text-gray-500">{t('checkout.payment.cardDesc')}</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Summary Column */}
                <div className="lg:w-96">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                        <h3 className="font-bold text-lg mb-4">{t('checkout.summary')}</h3>

                        <div className="mb-4 max-h-60 overflow-y-auto pr-2 space-y-3">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-3 text-sm">
                                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                        <img src={item.images[0]} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <span className="font-medium line-clamp-1">{item.name}</span>
                                            <span>{item.price * item.quantity} MAD</span>
                                        </div>
                                        <div className="text-gray-500 text-xs">
                                            Qty: {item.quantity} {item.boxItems ? `(${t('cart.boxContents')}: ${item.boxItems.reduce((acc, i) => acc + i.quantity, 0)})` : ''}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-100 pt-4 space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex justify-between">
                                <span>{t('cart.subtotal')}</span>
                                <span>{cartTotal} MAD</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{t('cart.delivery')}</span>
                                <span>{t('cart.free')}</span>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg mb-6">
                            <span>{t('cart.total')}</span>
                            <span>{cartTotal} MAD</span>
                        </div>

                        <Button
                            size="lg"
                            fullWidth
                            type="submit"
                            form="checkout-form"
                            disabled={loading}
                            className={loading ? 'opacity-75 cursor-not-allowed' : ''}
                        >
                            {loading ? t('checkout.processing') : t('checkout.confirm')}
                        </Button>

                        <p className="text-xs text-center text-gray-400 mt-4">
                            {t('cart.secure')}
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};
