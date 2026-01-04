import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AddToCartPopup } from '../cart/AddToCartPopup';

export const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-secondary">
            <Navbar />
            <AddToCartPopup />
            <main className={`flex-1 w-full ${!isHome ? 'pt-20 lg:pt-24' : ''}`}>
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};
