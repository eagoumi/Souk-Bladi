import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Product } from '../types';
import { products as initialProducts } from '../data/mockData';

interface ProductContextType {
    products: Product[];
    adminProducts: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (product: Product) => void;
    deleteProduct: (productId: string) => void;
    approveProduct: (productId: string) => void;
    rejectProduct: (productId: string, reason: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

interface ProductProviderProps {
    children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>(() => {
        const savedProducts = localStorage.getItem('products_v5');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    useEffect(() => {
        localStorage.setItem('products_v5', JSON.stringify(products));
    }, [products]);

    // Initialize with some approved mock data if no status is present (migration)
    useEffect(() => {
        setProducts(prev => prev.map(p => ({
            ...p,
            status: p.status || 'approved' // Migrate existing mock data to approved
        })));
    }, []);

    // Derived state for sorted products (Promoted first)
    // PUBLIC: Only approved products
    const publicProducts = products
        .filter(p => p.status === 'approved')
        .sort((a, b) => {
            if (a.isPromoted && !b.isPromoted) return -1;
            if (!a.isPromoted && b.isPromoted) return 1;
            return 0;
        });

    // ADMIN: All products
    const adminProducts = [...products].sort((a, b) => {
        // Pending first for admin visibility
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        if (a.isPromoted && !b.isPromoted) return -1;
        if (!a.isPromoted && b.isPromoted) return 1;
        return 0;
    });

    const addProduct = (product: Product) => {
        // New products are pending by default
        setProducts(prev => [...prev, { ...product, status: 'pending' }]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };

    const approveProduct = (productId: string) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'approved', rejectionReason: undefined } : p));
    };

    const rejectProduct = (productId: string, reason: string) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: 'rejected', rejectionReason: reason } : p));
    };

    return (
        <ProductContext.Provider value={{
            products: publicProducts,
            adminProducts,
            addProduct,
            updateProduct,
            deleteProduct,
            approveProduct,
            rejectProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};
