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
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');

    // Card State
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (items.length === 0 && step !== 'success') {
            navigate('/cart');
        }
    }, [items, navigate, step]);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call and Payment Processing
        const processingTime = paymentMethod === 'card' ? 3000 : 1500;

        setTimeout(() => {
            setLoading(false);
            setStep('success');
            clearCart();
        }, processingTime);
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
                            <div className="space-y-4">
                                {/* Cash on Delivery */}
                                <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-primary-500 bg-primary-50/50 ring-1 ring-primary-500' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        className="mt-1 text-primary-600 focus:ring-primary-500"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                    />
                                    <div className="flex-1">
                                        <span className="font-medium block text-gray-900">{t('checkout.payment.cod')}</span>
                                        <span className="text-sm text-gray-500">{t('checkout.payment.codDesc')}</span>
                                    </div>
                                </label>

                                {/* Credit Card */}
                                <label className={`block relative border rounded-xl cursor-pointer transition-all duration-500 overflow-hidden ${paymentMethod === 'card' ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50 bg-white shadow-md scale-[1.01]' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'}`}>
                                    <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                                        <div className="relative flex items-center justify-center w-5 h-5">
                                            <input
                                                type="radio"
                                                name="payment"
                                                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-primary-600 checked:border-0 transition-all z-10 cursor-pointer"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                            />
                                            <div className="absolute w-2.5 h-2.5 bg-primary-600 rounded-full scale-0 peer-checked:scale-100 transition-transform duration-300 ease-spring"></div>
                                        </div>

                                        <div className="flex-1 flex justify-between items-center">
                                            <div>
                                                <span className={`font-bold block transition-colors ${paymentMethod === 'card' ? 'text-primary-700' : 'text-gray-900'}`}>{t('checkout.payment.card')}</span>
                                                <span className="text-xs text-gray-500">Paiement sécurisé en ligne</span>
                                            </div>
                                            <div className="flex gap-2 grayscale peer-checked:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100">
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Interactive Card & Form */}
                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${paymentMethod === 'card' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
                                        onClick={e => e.stopPropagation()}
                                    >
                                        <div className="p-6 flex flex-col xl:flex-row gap-8 items-start">

                                            {/* Visual Card - 3D Flip Container */}
                                            <div className="w-full xl:w-1/2 perspective-1000 h-[220px]">
                                                <div className={`relative w-full h-full duration-700 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>

                                                    {/* CARD FRONT */}
                                                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 p-6 text-white shadow-2xl">
                                                        {/* Background Texture */}
                                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-2xl pointer-events-none"></div>

                                                        <div className="relative flex flex-col justify-between h-full z-10">
                                                            <div className="flex justify-between items-start">
                                                                <div className="w-11 h-7 rounded bg-yellow-400/80 flex items-center justify-center overflow-hidden relative">
                                                                    <div className="absolute inset-0 border border-yellow-600/50 rounded opacity-50"></div>
                                                                </div>
                                                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5 brightness-0 invert opacity-90" />
                                                            </div>

                                                            <div className="mt-2">
                                                                <div className="text-[10px] text-slate-300 font-mono mb-0.5">Card Number</div>
                                                                <div className="font-mono text-lg sm:text-xl tracking-widest text-shadow-sm truncate">
                                                                    {cardNumber || '•••• •••• •••• ••••'}
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-between items-end mt-2">
                                                                <div>
                                                                    <div className="text-[9px] text-slate-300 font-mono uppercase">Card Holder</div>
                                                                    <div className="font-mono text-xs sm:text-sm tracking-wider uppercase truncate max-w-[150px]">
                                                                        {cardHolder || 'NOM PRENOM'}
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-[9px] text-slate-300 font-mono uppercase">Expires</div>
                                                                    <div className="font-mono text-xs sm:text-sm tracking-wider">
                                                                        {expiryDate || 'MM/YY'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* CARD BACK */}
                                                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-2xl overflow-hidden">

                                                        {/* Top Text */}
                                                        <div className="w-full h-6 flex items-center px-4 text-[6px] text-slate-400 tracking-wider mt-2">
                                                            IF LOST OR STOLEN, PLEASE RETURN TO ANY BRANCH OF YOUR BANK.
                                                        </div>

                                                        {/* Magnetic Strip */}
                                                        <div className="w-full h-10 bg-black/90 relative z-20"></div>

                                                        <div className="px-6 relative z-20 mt-3">
                                                            {/* Signature & CVV Row */}
                                                            <div className="flex gap-3 items-center">
                                                                {/* Signature Panel */}
                                                                <div className="flex-1 h-8 bg-white/90 rounded-sm flex items-center overflow-hidden relative">
                                                                    <div className="absolute inset-0 flex flex-wrap content-center opacity-30 select-none overflow-hidden text-[4px] text-black leading-tight break-all p-0.5 tracking-tighter font-mono" style={{ wordBreak: 'break-all' }}>
                                                                        AUTHORIZED SIGNATURE NOT VALID UNLESS SIGNED SOUK BLADNA AUTHORIZED SIGNATURE NOT VALID UNLESS SIGNED SOUK BLADNA AUTHORIZED SIGNATURE
                                                                    </div>
                                                                    <div className="z-10 text-slate-800 font-handwriting text-[10px] ml-4 italic opacity-80">
                                                                        Not Valid Unless Signed
                                                                    </div>
                                                                </div>

                                                                {/* CVV Box with Circle Animation */}
                                                                <div className="relative">
                                                                    <div className="h-8 px-2 bg-white flex items-center justify-center text-slate-900 font-mono text-sm font-bold rounded-sm border border-gray-200 min-w-[40px] shadow-sm">
                                                                        {cvc || '000'}
                                                                    </div>
                                                                    {/* Red Circle Animation - Properly positioned relative to CVV box */}
                                                                    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[160%] border-2 border-red-600 rounded-[50%] ${cvc || isFlipped ? 'opacity-100 animate-pulse' : 'opacity-0'} transition-opacity pointer-events-none`}></div>
                                                                </div>
                                                            </div>

                                                            {/* Mirrored Details (Below Strip/Panel) */}
                                                            <div className="mt-4 text-right opacity-30 select-none grayscale pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
                                                                <div className="font-mono text-lg sm:text-lg tracking-widest text-shadow-sm truncate text-white">
                                                                    {cardNumber || '•••• •••• •••• ••••'}
                                                                </div>
                                                                <div className="flex justify-between mt-1 px-1">
                                                                    <div className="font-mono text-[9px] tracking-wider uppercase text-slate-300">
                                                                        {expiryDate || 'MM/YY'}
                                                                    </div>
                                                                    <div className="font-mono text-[10px] tracking-wider uppercase text-slate-300">
                                                                        {cardHolder || 'NOM PRENOM'}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Bottom Info */}
                                                        <div className="absolute bottom-3 left-6 text-[7px] text-slate-500 font-medium tracking-wider uppercase z-10">
                                                            Issued by Souk Bladna Bank
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            {/* Form Fields */}
                                            <div className="w-full xl:w-1/2 space-y-5 animate-fade-in-up delay-100">
                                                <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Détails de paiement</h4>

                                                <Input
                                                    label="Nom sur la carte"
                                                    placeholder="Jack Sparrow"
                                                    required={paymentMethod === 'card'}
                                                    value={cardHolder}
                                                    onChange={e => setCardHolder(e.target.value)}
                                                    className="bg-transparent border-0 border-b-2 border-gray-200 rounded-none px-0 focus:ring-0 focus:border-cyan-500 transition-colors placeholder:text-gray-300"
                                                />

                                                <Input
                                                    label="Numéro de carte"
                                                    placeholder="1234 5678 9000 0000"
                                                    required={paymentMethod === 'card'}
                                                    value={cardNumber}
                                                    onChange={e => {
                                                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
                                                        setCardNumber(val);
                                                    }}
                                                    className="bg-transparent border-0 border-b-2 border-gray-200 rounded-none px-0 focus:ring-0 focus:border-cyan-500 transition-colors placeholder:text-gray-300 font-mono"
                                                    maxLength={19}
                                                />

                                                <div className="grid grid-cols-2 gap-6">
                                                    <Input
                                                        label="Date d'expiration"
                                                        placeholder="MM/YY"
                                                        required={paymentMethod === 'card'}
                                                        value={expiryDate}
                                                        onChange={e => setExpiryDate(e.target.value)}
                                                        className="bg-transparent border-0 border-b-2 border-gray-200 rounded-none px-0 focus:ring-0 focus:border-cyan-500 transition-colors placeholder:text-gray-300 text-center font-mono"
                                                        maxLength={5}
                                                    />
                                                    <div className="relative">
                                                        <Input
                                                            label="CVV"
                                                            placeholder="123"
                                                            required={paymentMethod === 'card'}
                                                            value={cvc}
                                                            onChange={e => setCvc(e.target.value)}
                                                            onFocus={() => setIsFlipped(true)}
                                                            onBlur={() => setIsFlipped(false)}
                                                            className="bg-transparent border-0 border-b-2 border-gray-200 rounded-none px-0 focus:ring-0 focus:border-cyan-500 transition-colors placeholder:text-gray-300 text-center font-mono"
                                                            maxLength={3}
                                                            type="password"
                                                        />
                                                        <div className="absolute right-0 top-8 text-gray-300 cursor-help" title="Code à 3 chiffres au dos de la carte">
                                                            <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs">?</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Button
                                                    className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30 border-0"
                                                >
                                                    Payer {cartTotal} MAD
                                                </Button>
                                            </div>
                                        </div>
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
