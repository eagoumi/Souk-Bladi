import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, MapPin, Calendar, CreditCard } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const OrderDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getOrder, updateOrderStatus } = useOrders();
    const order = getOrder(id || '');

    if (!order) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-900">Commande non trouvée</h2>
                <Link to="/dashboard/orders" className="text-primary-600 hover:underline mt-4 inline-block">
                    Retour aux commandes
                </Link>
            </div>
        );
    }

    const handleStatusUpdate = (newStatus: typeof order.status) => {
        updateOrderStatus(order.id, newStatus);
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <button onClick={() => navigate('/dashboard/orders')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft size={20} /> Retour aux commandes
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold font-display text-gray-900">Commande #{order.id}</h1>
                        <Badge variant={
                            order.status === 'Livré' ? 'success' :
                                order.status === 'Annulé' ? 'neutral' :
                                    order.status === 'Expédié' ? 'info' : 'warning'
                        }>{order.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar size={14} /> Passée le {order.date}
                    </p>
                </div>
                <div className="flex gap-2">
                    {order.status === 'En cours' && (
                        <>
                            <Button size="sm" variant="outline" onClick={() => handleStatusUpdate('Annulé')} className="text-red-600 hover:bg-red-50 hover:border-red-200">
                                Annuler
                            </Button>
                            <Button size="sm" onClick={() => handleStatusUpdate('Expédié')}>
                                Marquer comme expédié
                            </Button>
                        </>
                    )}
                    {order.status === 'Expédié' && (
                        <Button size="sm" onClick={() => handleStatusUpdate('Livré')}>
                            Marquer comme livré
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-50">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Package size={20} className="text-primary-500" /> Articles commandés
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {order.items.map((item) => (
                                <div key={item.id} className="p-6 flex items-center gap-4">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                                        <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">{item.price * item.quantity} MAD</p>
                                        <p className="text-xs text-gray-500">{item.price} MAD / unité</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 p-6 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Sous-total</span>
                                <span className="font-medium">{order.total} MAD</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600">Livraison</span>
                                <span className="font-medium text-green-600">Gratuite</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-lg font-bold text-primary-600">{order.total} MAD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tracking & Info */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <UsersIcon className="text-primary-500" size={20} /> Client
                        </h3>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold">
                                {order.customerName.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                <p className="text-sm text-gray-500">Client fidèle</p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-gray-50">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Adresse de livraison</p>
                                    <p className="text-sm text-gray-700 mt-1">{order.shippingAddress}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CreditCard size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Méthode de paiement</p>
                                    <p className="text-sm text-gray-700 mt-1">{order.paymentMethod}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Truck className="text-primary-500" size={20} /> Statut de livraison
                        </h3>
                        <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
                            <div className="relative">
                                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${order.status ? 'bg-primary-500 border-primary-500' : 'bg-white border-gray-300'}`}></div>
                                <p className="text-sm font-medium text-gray-900">Commande reçue</p>
                                <p className="text-xs text-gray-500">{order.date}</p>
                            </div>
                            <div className="relative">
                                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${['Expédié', 'Livré'].includes(order.status) ? 'bg-primary-500 border-primary-500' : 'bg-white border-gray-300'}`}></div>
                                <p className={`text-sm font-medium ${['Expédié', 'Livré'].includes(order.status) ? 'text-gray-900' : 'text-gray-400'}`}>Expédié</p>
                            </div>
                            <div className="relative">
                                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${order.status === 'Livré' ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}></div>
                                <p className={`text-sm font-medium ${order.status === 'Livré' ? 'text-gray-900' : 'text-gray-400'}`}>Livré</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Start Icon helper import (was missing)
import { Users as UsersIcon } from 'lucide-react'; 
