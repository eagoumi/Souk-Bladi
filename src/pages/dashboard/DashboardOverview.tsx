import React from 'react';
import { Link } from 'react-router-dom';
import { Package, User, Wallet, Heart, ChevronRight, ShoppingCart } from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useCooperatives } from '../../context/CooperativeContext';
import { Button } from '../../components/common/Button';

export const DashboardOverview: React.FC = () => {
    const { orders } = useOrders();
    const { products } = useProducts();
    const { t } = useLanguage();
    const { user } = useAuth();
    const { items: cart, cartTotal } = useCart();

    // Buyer Dashboard View
    if (user?.role === 'buyer') {
        // Calculate Loyalty Points
        const userOrders = orders.filter(o => o.customerId === user.id);
        const loyaltyPoints = userOrders.reduce((acc, order) => {
            if (order.paymentMethod === 'Carte Bancaire') {
                return acc + (order.total * 0.02);
            } else if (order.paymentMethod === 'Espèces à la livraison' && order.status === 'Livré') {
                return acc + (order.total * 0.01);
            }
            return acc;
        }, 0);

        const deliveredCount = userOrders.filter(o => o.status === 'Livré').length;
        const pendingCount = userOrders.filter(o => o.status === 'En cours').length;

        const { cooperatives, isFollowed } = useCooperatives();

        // Get Subscribed Cooperatives
        const subscriptions = cooperatives.filter(coop => isFollowed(coop.id));

        return (
            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Mon Tableau de bord</h2>
                    <p className="text-gray-500">Bienvenue, {user.name}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Profile */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <User className="text-primary-600" size={20} /> Mon Profil
                            </h3>
                            <Link to="/dashboard/settings" className="text-sm text-primary-600 hover:underline">Modifier</Link>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-2xl font-bold text-gray-400">{user.name.charAt(0)}</span>
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{user.name}</h4>
                                <p className="text-sm text-gray-500">{user.email}</p>
                                <p className="text-xs text-gray-400 mt-1 capitalize">{user.role}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-xl">
                                <span className="text-gray-600">Téléphone</span>
                                <span className="font-medium">{user.phone || '-'}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-xl">
                                <span className="text-gray-600">Ville</span>
                                <span className="font-medium">{user.location || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <ShoppingCart className="text-primary-600" size={20} /> Mon Panier
                            </h3>
                            <Link to="/cart" className="text-sm text-primary-600 hover:underline">Voir le panier</Link>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 mb-4">
                                <ShoppingCart size={32} />
                            </div>
                            <p className="text-gray-500 mb-1">Articles dans le panier</p>
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">{cart?.length || 0} Articles</h4>
                            <Link to="/cart" className="w-full">
                                <Button variant="primary" className="w-full">
                                    Commander ({cartTotal.toLocaleString()} MAD)
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Loyalty Stats */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Wallet className="text-primary-600" size={20} /> Ma Fidélité
                            </h3>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-primary-50 rounded-xl border border-primary-100">
                                <div>
                                    <p className="text-sm text-primary-700 font-medium">Points cumulés</p>
                                    <p className="text-3xl font-bold text-primary-900">{Math.floor(loyaltyPoints)} pts</p>
                                </div>
                                <div className="p-3 bg-white rounded-full text-primary-600 shadow-sm">
                                    <Package size={24} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-gray-50 rounded-xl text-center">
                                    <p className="text-xs text-gray-500 mb-1">Commandes Livrées</p>
                                    <p className="text-xl font-bold text-gray-900">{deliveredCount}</p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl text-center">
                                    <p className="text-xs text-gray-500 mb-1">En Cours</p>
                                    <p className="text-xl font-bold text-gray-900">{pendingCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subscriptions / Cooperatives */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Heart className="text-primary-600" size={20} /> Mes Coopératives
                            </h3>
                            <Link to="/dashboard/cooperatives" className="text-sm text-primary-600 hover:underline">Voir tout</Link>
                        </div>
                        <div className="space-y-4">
                            {subscriptions.map(sub => (
                                <div key={sub.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                            {sub.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900 text-sm">{sub.name}</h4>
                                            <p className="text-xs text-gray-500">{sub.location}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );

    }

    // Admin/Coop Dashboard View (Existing Logic)
    const { recentOrders, stats } = (() => {
        const totalSales = orders.reduce((acc, order) => acc + (order.status !== 'Annulé' ? order.total : 0), 0);
        const activeProducts = products.length;
        const pendingOrders = orders.filter(o => o.status === 'En cours').length;
        const recentOrders = orders.slice(0, 4);
        const stats = [
            { label: t('dashboard.overview.sales'), value: `${totalSales.toLocaleString()} MAD`, change: '+15%', trend: 'up' },
            { label: t('dashboard.overview.pendingOrders'), value: pendingOrders.toString(), change: '+5%', trend: 'up' },
            { label: t('dashboard.overview.newCustomers'), value: '12', change: '+2%', trend: 'up' },
            { label: t('dashboard.overview.activeProducts'), value: activeProducts.toString(), change: '0%', trend: 'neutral' },
        ];
        return { recentOrders, stats };
    })();

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
