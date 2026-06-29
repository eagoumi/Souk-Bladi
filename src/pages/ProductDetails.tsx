import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Heart, Truck, ShieldCheck } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { RatingStars } from '../components/common/RatingStars';
import { ProductCard } from '../components/domain/ProductCard';
import { cooperatives } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Badge } from '../components/common/Badge';
import { useProducts } from '../context/ProductContext';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);
    const { t } = useLanguage();

    const product = products.find(p => p.id === id);
    const cooperative = product ? cooperatives.find(c => c.id === product.coopId) : undefined;

    // Derived state
    const isWishlisted = product ? isInWishlist(product.id) : false;

    const relatedProducts = product
        ? products
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
        : [];

    if (!product) {
        return (
            <div className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('product.notFound')}</h2>
                <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium">
                    {t('product.backToProducts')}
                </Link>
            </div>
        );
    }

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={product.name}
                description={`Achetez ${product.name} chez Cooperative ${cooperative?.name}. ${product.shortDesc || ''}`}
            />
            {/* Breadcrumbs */}
            <div className="bg-gray-50 border-b border-gray-100 py-4">
                <Container>
                    <nav className="text-sm text-gray-500">
                        <Link to="/" className="hover:text-primary-600">{t('product.breadcrumbs.home')}</Link>
                        <span className="mx-2">/</span>
                        <Link to="/products" className="hover:text-primary-600">{t('product.breadcrumbs.products')}</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{product.name}</span>
                    </nav>
                </Container>
            </div>

            <Container className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {/* Mock thumbnails - just replicating logic for UI */}
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer border hover:border-primary-500">
                                    <img src={product.images[0]} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                                <Link to={`/cooperatives/${product.coopId}`} className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 group">
                                    {t('product.coopPrefix')} {cooperative?.name}
                                </Link>
                            </div>
                            <button onClick={toggleWishlist} className={`p-3 rounded-full hover:bg-gray-50 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}>
                                <Heart size={24} className={isWishlisted ? 'fill-current' : ''} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            <RatingStars rating={product.rating} size={20} showCount />
                            <span className="text-gray-300">|</span>
                            <Badge variant={product.stock > 0 ? 'success' : 'neutral'}>
                                {product.stock > 0 ? t('product.stock.in') : t('product.stock.out')}
                            </Badge>
                        </div>

                        <div className="mt-8 mb-8 p-6 bg-gray-50 rounded-xl">
                            <div className="flex items-end gap-3 mb-6">
                                <span className="text-4xl font-bold text-gray-900">{product.price} MAD</span>
                                {product.discount && (
                                    <span className="text-lg text-gray-400 line-through mb-1">{(product.price * 1.2).toFixed(0)} MAD</span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-3 text-gray-600 hover:bg-gray-50"
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="font-medium px-2 min-w-[2rem] text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-3 text-gray-600 hover:bg-gray-50"
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                                <Button
                                    size="lg"
                                    fullWidth
                                    onClick={handleAddToCart}
                                    className="flex items-center gap-2 justify-center"
                                >
                                    <ShoppingCart size={20} />
                                    {t('product.addToCart')}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-600">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">{t('product.description')}</h3>
                                <p className="leading-relaxed">{product.longDesc}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{t('product.origin')}</h4>
                                    <p className="text-sm">{product.originInfo}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-1">{t('product.ingredients')}</h4>
                                    <p className="text-sm">{product.ingredientsOrMaterials.join(', ')}</p>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6 mt-6 flex gap-8">
                                <div className="flex items-center gap-3">
                                    <Truck className="text-primary-600" size={24} />
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900">{t('product.delivery.fast')}</p>
                                        <p className="text-gray-500">{t('product.delivery.days')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-primary-600" size={24} />
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900">{t('product.certified')}</p>
                                        <p className="text-gray-500">{t('product.directProducer')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <div className="mt-24">
                    <h2 className="text-2xl font-bold mb-8">{t('product.similar')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};
