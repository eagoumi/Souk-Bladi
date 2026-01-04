import React from 'react';
import { Badge } from '../../components/common/Badge';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';

export const DashboardOverview: React.FC = () => {
    const { orders } = useOrders();
    const { products } = useProducts();
    const { t } = useLanguage();

    // Calculate dynamic stats
    const totalSales = orders.reduce((acc, order) => acc + (order.status !== 'Annulé' ? order.total : 0), 0);
    const activeProducts = products.length;
    const pendingOrders = orders.filter(o => o.status === 'En cours').length;

    // Get recent orders (last 4)
    const recentOrders = orders.slice(0, 4);

    const stats = [
        { label: t('dashboard.overview.sales'), value: `${totalSales.toLocaleString()} MAD`, change: '+15%', trend: 'up' },
        { label: t('dashboard.overview.pendingOrders'), value: pendingOrders.toString(), change: '+5%', trend: 'up' },
        { label: t('dashboard.overview.newCustomers'), value: '12', change: '+2%', trend: 'up' },
        { label: t('dashboard.overview.activeProducts'), value: activeProducts.toString(), change: '0%', trend: 'neutral' },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Recent Orders Section */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h3 className="text-lg font-bold font-display text-gray-900">{t('dashboard.overview.recentOrders.title')}</h3>
                        <p className="text-sm text-gray-500">{t('dashboard.overview.recentOrders.subtitle')}</p>
                    </div>
                    {/* We can add navigation logic here if needed */}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold">{t('dashboard.overview.table.order')}</th>
                                <th className="px-6 py-4 font-semibold">{t('dashboard.overview.table.customer')}</th>
                                <th className="px-6 py-4 font-semibold">{t('dashboard.overview.table.date')}</th>
                                <th className="px-6 py-4 font-semibold">{t('dashboard.overview.table.items')}</th>
                                <th className="px-6 py-4 font-semibold">{t('dashboard.overview.table.total')}</th>
                                <th className="px-6 py-4 font-semibold">{t('dashboard.overview.table.status')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                                    <td className="px-6 py-4 font-medium text-primary-600">#{order.id}</td>
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {order.customerName.charAt(0)}
                                        </div>
                                        {order.customerName}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 text-gray-500">{order.items.length} articles</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.total} MAD</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={
                                            order.status === 'Livré' ? 'success' :
                                                order.status === 'Annulé' ? 'neutral' : 'warning'
                                        }>{order.status}</Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
