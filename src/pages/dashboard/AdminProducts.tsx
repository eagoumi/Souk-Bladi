import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, AlertCircle } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';


export const AdminProducts: React.FC = () => {
    const { adminProducts, approveProduct, rejectProduct } = useProducts();
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = adminProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || p.status === filter;
        return matchesSearch && matchesFilter;
    });

    const handleReject = (id: string) => {
        const reason = prompt("Raison du rejet :");
        if (reason) {
            rejectProduct(id, reason);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold font-display text-gray-900">Gestion des Produits</h2>
                <p className="text-sm text-gray-500">Validez ou rejetez les produits soumis par les coopératives.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex gap-2">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            {status === 'all' ? 'Tous' : status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64"
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Produit</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Coopérative</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Prix</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.images[0] || 'https://via.placeholder.com/40'}
                                            alt={product.name}
                                            className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900 line-clamp-1">{product.name}</p>
                                            <p className="text-xs text-gray-500">{product.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">
                                    {product.coopId} {/* Ideally fetch coop Name */}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                    {product.price} MAD
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${product.status === 'approved' ? 'bg-green-50 text-green-700' :
                                        product.status === 'rejected' ? 'bg-red-50 text-red-700' :
                                            'bg-yellow-50 text-yellow-700'
                                        }`}>
                                        {product.status === 'approved' && <CheckCircle size={12} />}
                                        {product.status === 'rejected' && <XCircle size={12} />}
                                        {product.status === 'pending' && <AlertCircle size={12} />}
                                        {product.status || 'Pending'}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-gray-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors" title="Voir">
                                            <Eye size={18} />
                                        </button>

                                        {product.status !== 'approved' && (
                                            <button
                                                onClick={() => approveProduct(product.id)}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="Approuver"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                        )}

                                        {product.status !== 'rejected' && (
                                            <button
                                                onClick={() => handleReject(product.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Rejeter"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm">
                        Aucun produit trouvé pour ce filtre.
                    </div>
                )}
            </div>
        </div>
    );
};
