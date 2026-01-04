import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
    items: string[]; // Product IDs
    addToWishlist: (productId: string) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<string[]>(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(items));
    }, [items]);

    const addToWishlist = (productId: string) => {
        setItems(prev => {
            if (prev.includes(productId)) return prev;
            return [...prev, productId];
        });
    };

    const removeFromWishlist = (productId: string) => {
        setItems(prev => prev.filter(id => id !== productId));
    };

    const isInWishlist = (productId: string) => items.includes(productId);

    return (
        <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
