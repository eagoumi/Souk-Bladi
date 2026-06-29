import React from 'react';
import { BarChart3, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
// import { motion } from 'framer-motion';

export const DashboardAnalytics: React.FC = () => {
    const { orders } = useOrders();
    const { products } = useProducts();
    const { t } = useLanguage();

    // 1. Key Metrics Calculation
    const totalRevenue = orders
        .filter(o => o.status !== 'Annulé')
        .reduce((acc, order) => acc + order.total, 0);

    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Mock growth rates
    const growthRates = {
        revenue: '+12.5%',
        orders: '+8.2%',
        customers: '+5.3%',
        products: '+2.1%'
    };

    // 2. Mock Chart Data (Last 6 Months)
    // Since we don't have historical data structure, we mock this for visualization
    const monthlyData = [
        { month: 'Jan', sales: 12500, orders: 45 },
        { month: 'Fév', sales: 15000, orders: 52 },
        { month: 'Mar', sales: 18200, orders: 68 },
        { month: 'Avr', sales: 16800, orders: 61 },
        { month: 'Mai', sales: 21000, orders: 75 },
        { month: 'Juin', sales: 24500, orders: 89 },
    ];

    const maxSales = Math.max(...monthlyData.map(d => d.sales));

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('dashboard.nav.analytics')}</h2>
                <p className="text-gray-500">Analysez les performances de votre activité.</p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <DollarSign size={20} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                            {growthRates.revenue}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Chiffre d'affaires</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalRevenue.toLocaleString()} MAD</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <ShoppingBag size={20} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                            {growthRates.orders}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Total Commandes</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{totalOrders}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <Users size={20} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                            {growthRates.customers}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Panier Moyen</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{Math.round(averageOrderValue)} MAD</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                            <BarChart3 size={20} />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-50 text-orange-700">
                            {growthRates.products}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Produits Actifs</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{products.length}</h3>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart (Big) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-gray-900">Évolution des Ventes</h3>
                            <p className="text-sm text-gray-500">6 derniers mois</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">Mois</button>
                            <button className="p-2 text-sm text-gray-900 bg-gray-100 font-medium rounded-lg">Année</button>
                        </div>
                    </div>

                    {/* CSS Bar Chart */}
                    <div className="h-64 flex items-end gap-2 sm:gap-4">
                        {monthlyData.map((data, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="relative w-full bg-gray-100 rounded-t-lg overflow-hidden flex items-end h-full">
                                    <div
                                        className="w-full bg-primary-500 hover:bg-primary-600 transition-all duration-500 rounded-t-lg relative group-hover:shadow-lg"
                                        style={{ height: `${(data.sales / maxSales) * 100}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                            {data.sales.toLocaleString()} MAD
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Distribution */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-6">État des Commandes</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Livré', count: orders.filter(o => o.status === 'Livré').length, color: 'bg-green-500' },
                            { label: 'En cours', count: orders.filter(o => o.status === 'En cours').length, color: 'bg-blue-500' },
                            { label: 'Expédié', count: orders.filter(o => o.status === 'Expédié').length, color: 'bg-yellow-500' },
                            { label: 'Annulé', count: orders.filter(o => o.status === 'Annulé').length, color: 'bg-red-500' },
                        ].map((stat, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">{stat.label}</span>
                                    <span className="font-medium text-gray-900">{stat.count}</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${stat.color}`}
                                        style={{ width: `${(stat.count / totalOrders) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-50">
                        <h4 className="font-bold text-gray-900 mb-4">Meilleures Régions</h4>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Souss-Massa</span>
                                <span className="font-medium text-gray-900">45%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Marrakech-Safi</span>
                                <span className="font-medium text-gray-900">30%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Fès-Meknès</span>
                                <span className="font-medium text-gray-900">15%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Autres</span>
                                <span className="font-medium text-gray-900">10%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
