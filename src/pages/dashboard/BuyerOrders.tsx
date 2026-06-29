import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';

export const BuyerOrders: React.FC = () => {
    const { orders } = useOrders();
    const { user } = useAuth();

    // Filter orders for the current logged-in buyer
    const myOrders = orders.filter(order => order.customerId === user?.id);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Livré': return <CheckCircle size={20} className="text-green-500" />;
            case 'En cours': return <Clock size={20} className="text-yellow-500" />;
            case 'Expédié': return <Truck size={20} className="text-blue-500" />;
            case 'Annulé': return <XCircle size={20} className="text-red-500" />;
            default: return <Package size={20} className="text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold font-display text-gray-900">Mes Commandes</h2>
                <p className="text-sm text-gray-500">Suivez l'historique de vos achats.</p>
            </div>

            {myOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <Package size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Aucune commande</h3>
                    <p className="text-gray-500 mb-6">Vous n'avez pas encore passé de commande.</p>
                    <Link to="/products" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-colors">
                        Commencer vos achats
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {myOrders.map(order => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        {getStatusIcon(order.status)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Commande #{order.id}</div>
                                        <div className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString('fr-MA', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant={
                                        order.status === 'Livré' ? 'success' :
                                            order.status === 'Annulé' ? 'neutral' :
                                                order.status === 'Expédié' ? 'info' : 'warning'
                                    }>{order.status}</Badge>
                                    <div className="font-bold text-lg text-primary-600">{order.total} MAD</div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex -space-x-3 overflow-hidden">
                                    {order.items.slice(0, 3).map((item, index) => (
                                        <img
                                            key={index}
                                            className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover bg-gray-100"
                                            src={item.image || 'https://via.placeholder.com/40'}
                                            alt={item.name}
                                        />
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-gray-100 text-xs font-medium text-gray-500">
                                            +{order.items.length - 3}
                                        </div>
                                    )}
                                </div>

                                <Link
                                    to={`/dashboard/orders/${order.id}`}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm"
                                >
                                    Voir les détails <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
