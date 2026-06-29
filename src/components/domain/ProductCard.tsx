import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { type Product } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';


interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const { t } = useLanguage();

    const isWishlisted = isInWishlist(product.id);

    const toggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product.id);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    return (
        <Link to={`/products/${product.id}`} className="group block bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-500 overflow-hidden relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Overlay actions */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-10 flex gap-2">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-white/90 backdrop-blur-md text-gray-900 py-3 rounded-xl font-medium text-sm hover:bg-primary-600 hover:text-white transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                        <ShoppingCart size={18} />
                        {t('products.addToCart')}
                    </button>
                    <button
                        onClick={toggleWishlist}
                        className={`p-3 rounded-xl backdrop-blur-md shadow-lg transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-900 hover:text-red-500'}`}
                    >
                        <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                    </button>
                </div>

                {(product.bestSeller || product.isPromoted) && (
                    <div className="absolute top-3 left-3 flex flex-col gap-2 items-start">
                        {product.isPromoted && (
                            <div className="bg-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                {t('products.sponsored')}
                            </div>
                        )}
                        {product.bestSeller && (
                            <div className="bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                {t('products.bestSeller')}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-primary-600 font-bold uppercase tracking-wider bg-primary-50 px-2 py-1 rounded-md">{product.category}</span>
                    <RatingStars rating={product.rating} size={14} />
                </div>
                <h3 className="text-gray-900 font-bold text-lg leading-tight mb-2 group-hover:text-primary-600 transition-colors font-display">
                    {product.name}
                </h3>
                <div className="flex items-end justify-between mt-3">
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                        {product.region}
                    </p>
                    <span className="text-xl font-bold text-gray-900">{product.price} <span className="text-sm font-normal text-gray-500">MAD</span></span>
                </div>
            </div>
        </Link>
    );
};
