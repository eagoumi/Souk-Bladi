import React, { createContext, useContext, useState, useEffect } from 'react';
import { type CartItem, type Product } from '../types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number, boxItems?: { product: Product; quantity: number }[], bundleName?: string, customImage?: string) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    itemCount: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    showPopup: boolean;
    setShowPopup: (show: boolean) => void;
    lastAddedProduct: CartItem | null;
    closePopup: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [lastAddedProduct, setLastAddedProduct] = useState<CartItem | null>(null);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity = 1, boxItems?: { product: Product; quantity: number }[], bundleName?: string, customImage?: string) => {
        // If it's a custom box, add as a UNIQUE item everytime
        if (boxItems && boxItems.length > 0) {
            const bundlePrice = product.price + boxItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            const uniqueId = `box-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

            const newItem: CartItem = {
                ...product,
                id: uniqueId,
                price: bundlePrice,
                quantity: 1, // Custom boxes are added 1 by 1 usually
                boxItems: boxItems,
                bundleName: bundleName || product.name, // Use provided name or default to product name
                customImage: customImage // Store custom image if provided
            };

            setItems(prev => [...prev, newItem]);
            setLastAddedProduct(newItem);
            setShowPopup(true);
            setIsCartOpen(false);
            return;
        }

        // Regular Product Logic
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id && !item.boxItems);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });

        // Setup popup data instead of opening side cart
        setLastAddedProduct({ ...product, quantity });
        setShowPopup(true);
        setIsCartOpen(false); // Ensure side cart doesn't open simultaneously
    };

    const closePopup = () => setShowPopup(false);

    const removeFromCart = (productId: string) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            itemCount,
            isCartOpen,
            setIsCartOpen,
            showPopup,
            setShowPopup,
            lastAddedProduct,
            closePopup
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
