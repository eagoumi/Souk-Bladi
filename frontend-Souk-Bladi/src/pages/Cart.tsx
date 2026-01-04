import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, XCircle } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const Cart: React.FC = () => {
    const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { t } = useLanguage();

    if (items.length === 0) {
        return (
            <Container className="py-20 text-center">
                <SEO title={t('cart.empty.title')} description={t('cart.empty.desc')} />
                <h1 className="text-3xl font-bold mb-6">{t('cart.empty.title')}</h1>
                <p className="text-gray-500 mb-8">{t('cart.empty.desc')}</p>
                <Link to="/products">
                    <Button size="lg">{t('cart.continue')}</Button>
                </Link>
            </Container>
        );
    }

    return (
        <Container className="py-12">
            <SEO title={t('cart.title')} description={t('cart.desc')} />

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">{t('cart.title')}</h1>
                <Button variant="outline" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                    <Trash2 size={16} className="mr-2" /> {t('cart.clear')}
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column: List */}
                <div className="flex-1 space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <img src={item.customImage || item.images[0]} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-gray-50 border border-gray-100" />
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        {item.bundleName ? (
                                            // Bundle Layout
                                            <>
                                                <h3 className="font-semibold text-gray-900 text-lg">{item.bundleName}</h3>
                                                <p className="text-xs text-primary-600 font-medium mb-2 uppercase tracking-wide">Coffret Personnalisé</p>
                                            </>
                                        ) : (
                                            // Regular Product Layout
                                            <>
                                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                            </>
                                        )}

                                        {/* Display Box Contents */}
                                        {item.boxItems && (
                                            <div className="mt-3 bg-gray-50 rounded-lg p-3 space-y-2">
                                                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 pb-2 border-b border-gray-100">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                                                    Contenu ({item.boxItems.reduce((acc, i) => acc + i.quantity, 0)})
                                                </div>
                                                <ul className="text-xs text-gray-600 space-y-2">
                                                    {/* Show Packaging if implied or show generic line? 
                                                        Actually item itself IS the packaging product usually. 
                                                        Let's show "Emballage: [Item Name]" if it's a bundle 
                                                    */}
                                                    <li className="flex justify-between items-center pl-2 border-l-2 border-gray-200">
                                                        <span>1x {item.name} (Boîte)</span>
                                                    </li>
                                                    {item.boxItems.map((boxItem, idx) => (
                                                        <li key={idx} className="flex justify-between items-center pl-2 border-l-2 border-gray-200 hover:border-primary-300 transition-colors">
                                                            <span className="line-clamp-1">{boxItem.quantity}x {boxItem.product.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                                        <XCircle size={20} />
                                    </button>
                                </div>

                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                        <button className="p-1 hover:bg-gray-50" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-sm px-2 font-medium">{item.quantity}</span>
                                        <button className="p-1 hover:bg-gray-50" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <span className="font-bold">{item.price * item.quantity} MAD</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Summary */}
                <div className="lg:w-96">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
                        <h3 className="font-bold text-lg mb-4">{t('cart.summary')}</h3>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
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

                        <Link to="/checkout">
                            <Button size="lg" fullWidth>
                                {t('cart.checkout')} <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>

                        <p className="text-xs text-center text-gray-400 mt-4">
                            {t('cart.secure')}
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <Link to="/products" className="text-sm text-primary-600 hover:underline">
                            {t('cart.continue')}
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};
