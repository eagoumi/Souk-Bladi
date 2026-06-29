import React, { useEffect } from 'react';
import { ShoppingCart, CheckCircle, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export const AddToCartPopup: React.FC = () => {
    const { showPopup, closePopup, lastAddedProduct } = useCart();
    const navigate = useNavigate();

    // Auto-close after 5 seconds if not interacted with
    useEffect(() => {
        if (showPopup) {
            const timer = setTimeout(() => {
                closePopup();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showPopup, closePopup]);

    if (!lastAddedProduct) return null;

    return (
        <AnimatePresence>
            {showPopup && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closePopup}
                        className="fixed inset-0 bg-black/30 z-[100] backdrop-blur-[1px]"
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl border border-gray-100"
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
                                <CheckCircle size={32} />
                            </div>

                            <div>
                                <h3 className="text-xl font-bold font-display text-gray-900">
                                    Ajouté au panier !
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">
                                    {lastAddedProduct.quantity} x {lastAddedProduct.name}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3 w-full text-left">
                                <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                    <img src={lastAddedProduct.images[0]} alt={lastAddedProduct.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 line-clamp-1">{lastAddedProduct.name}</p>
                                    <p className="text-primary-600 font-bold">{lastAddedProduct.price * lastAddedProduct.quantity} MAD</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 w-full mt-4">
                                <Button
                                    variant="outline"
                                    onClick={closePopup}
                                    className="w-full justify-center"
                                >
                                    Continuer
                                </Button>
                                <Button
                                    onClick={() => {
                                        closePopup();
                                        navigate('/cart');
                                    }}
                                    className="w-full justify-center flex items-center gap-2"
                                >
                                    <ShoppingCart size={18} />
                                    Voir Panier
                                </Button>
                            </div>

                            <Button
                                fullWidth
                                variant="secondary"
                                onClick={() => {
                                    closePopup();
                                    navigate('/checkout'); // Assuming a checkout flow later, or redirect to cart
                                }}
                                className="w-full justify-center flex items-center gap-2 group"
                            >
                                Commander <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
