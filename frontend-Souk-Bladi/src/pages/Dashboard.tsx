import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users as UsersIcon, Settings, BarChart3, Plus, Search, Bell, Menu, LogOut, ChevronRight, Globe, ShieldAlert } from 'lucide-react';

import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { t } = useLanguage();

    const menuItems = [
        { id: '', label: t('dashboard.nav.overview'), icon: LayoutDashboard, path: '/dashboard', end: true },
        { id: 'products', label: t('dashboard.nav.products'), icon: ShoppingBag, path: '/dashboard/products', end: false, hidden: !['cooperative', 'admin'].includes(user?.role || '') }, // Shop only for Sellers (Coop & Hybrid Admin)
        { id: 'admin-products', label: t('dashboard.nav.adminProducts'), icon: ShoppingBag, path: '/dashboard/admin-products', end: false, hidden: !['admin', 'manager', 'super_admin'].includes(user?.role || '') },
        { id: 'admin-coops', label: t('dashboard.nav.coops'), icon: UsersIcon, path: '/dashboard/admin-coops', end: false, hidden: !['admin', 'manager', 'super_admin'].includes(user?.role || '') },
        { id: 'admin-blacklist', label: t('dashboard.nav.blacklist'), icon: ShieldAlert, path: '/dashboard/admin-blacklist', end: false, hidden: !['admin', 'manager', 'super_admin'].includes(user?.role || '') },
        { id: 'orders', label: t('dashboard.nav.orders'), icon: ShoppingBag, path: '/dashboard/orders', end: false },
        { id: 'customers', label: t('dashboard.nav.customers'), icon: UsersIcon, path: '/dashboard/customers', end: false },
        { id: 'analytics', label: t('dashboard.nav.analytics'), icon: BarChart3, path: '/dashboard/analytics', end: false },
        { id: 'settings', label: t('dashboard.nav.settings'), icon: Settings, path: '/dashboard/settings', end: false },
    ].filter(item => !item.hidden);

    const currentTitle = menuItems.find(item => {
        if (item.end) return location.pathname === item.path;
        return location.pathname.startsWith(item.path);
    })?.label || t('dashboard.nav.overview');

    return (
        <div className="bg-gray-50 min-h-screen font-sans flex text-gray-900">
            <SEO title={currentTitle} description="Gérez votre coopérative, vos produits et vos commandes sur Souk Bladna." />
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                    <img src="/imgs/Logo.png" alt="Souk Bladna" className="h-8 w-auto" />
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500">
                        <Menu size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{t('dashboard.nav.menu')}</p>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                ? 'bg-primary-50 text-primary-700 shadow-sm'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            {({ isActive }) => (
                                <>
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} className={isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'} />
                                        {item.label}
                                    </div>
                                    {isActive && <ChevronRight size={16} className="text-primary-400" />}
                                </>
                            )}
                        </NavLink>
                    ))}

                    <div className="mt-8 pt-6 border-t border-gray-50">
                        <Link
                            to="/"
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors group"
                        >
                            <Globe size={20} className="text-gray-400 group-hover:text-primary-600" />
                            {t('dashboard.nav.backToSite')}
                        </Link>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-50">
                    <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 mb-3">
                        {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                {user?.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-500 truncate capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 text-sm text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                        <LogOut size={16} /> {t('dashboard.nav.logout')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-4 sm:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500">
                            <Menu size={24} />
                        </button>
                        <h1 className="text-2xl font-bold font-display text-gray-900 capitalize">
                            {currentTitle}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('dashboard.header.search')}
                                className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all"
                            />
                        </div>
                        <button className="relative p-2 text-gray-400 hover:text-primary-600 transition-colors rounded-full hover:bg-gray-50">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <Button size="sm" className="hidden sm:flex items-center gap-2 shadow-lg shadow-primary-500/20">
                            <Plus size={16} /> <span className="hidden md:inline">{t('dashboard.header.add')}</span>
                        </Button>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
