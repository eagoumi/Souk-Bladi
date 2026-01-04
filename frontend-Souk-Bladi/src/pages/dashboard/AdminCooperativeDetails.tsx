import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, MapPin, Phone, Shield, ShieldAlert, ShieldCheck, Mail, AlertTriangle, Lock } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useProducts } from '../../context/ProductContext';
import { type UserRole } from '../../context/AuthContext';
import { useCooperatives, type CooperativeUser } from '../../context/CooperativeContext';

export const AdminCooperativeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { adminProducts, approveProduct, rejectProduct } = useProducts();
    const { getCooperative, updateCooperative, addCooperative } = useCooperatives();

    const [activeTab, setActiveTab] = useState<'profile' | 'products'>('profile');
    const [coop, setCoop] = useState<Partial<CooperativeUser> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const isNew = id === 'new';

    useEffect(() => {
        if (isNew) {
            setCoop({
                status: 'pending',
                role: 'cooperative',
                joinedDate: new Date().toISOString().split('T')[0],
                productCount: 0
            });
            setIsLoading(false);
        } else if (id) {
            const foundCoop = getCooperative(id);
            if (foundCoop) {
                setCoop(foundCoop);
            } else {
                setCoop(null); // Not found
            }
            setIsLoading(false);
        }
    }, [id, getCooperative, isNew]);

    if (isLoading) return <div className="p-8 text-center">Chargement...</div>;
    if (!coop && !isNew) return <div className="p-8 text-center">Coopérative introuvable.</div>;

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();

        if (!coop?.name || !coop?.email) {
            alert('Veuillez remplir au moins le nom et l\'email.');
            return;
        }

        if (isNew) {
            addCooperative(coop as CooperativeUser); // ID and joinDate are handled in context
            alert('Coopérative ajoutée avec succès !');
            navigate('/dashboard/admin-coops');
        } else if (id) {
            updateCooperative(id, coop as CooperativeUser);
            alert('Profil mis à jour avec succès !');
        }
    };

    const coopProducts = id && !isNew ? adminProducts.filter(p => p.coopId === id) : [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/dashboard/admin-coops')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-xl font-bold font-display text-gray-900">{isNew ? 'Nouvelle Coopérative' : coop?.name}</h2>
                    <p className="text-sm text-gray-500">{isNew ? 'Ajoutez une nouvelle coopérative.' : 'Gestion détaillée du compte coopérative'}</p>
                </div>
            </div>

            {/* Tabs (Hide for new) */}
            {!isNew && (
                <div className="border-b border-gray-200">
                    <nav className="flex gap-6">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'profile' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Profil & Informations
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`pb-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'products' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            Produits ({coopProducts.length})
                        </button>
                    </nav>
                </div>
            )}

            {activeTab === 'profile' ? (
                <div className="max-w-4xl bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                                {coop?.avatar ? <img src={coop.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" /> : <User size={40} />}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Informations Générales</h3>
                                <p className="text-sm text-gray-500">Modifiez les informations publiques de la coopérative.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la coopérative *</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        required
                                        value={coop?.name || ''}
                                        onChange={e => setCoop({ ...coop, name: e.target.value })}
                                        className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={coop?.email || ''}
                                        onChange={e => setCoop({ ...coop, email: e.target.value })}
                                        className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        value={coop?.phone || ''}
                                        onChange={e => setCoop({ ...coop, phone: e.target.value })}
                                        className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ville / Région</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={coop?.location || ''}
                                        onChange={e => setCoop({ ...coop, location: e.target.value })}
                                        className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
                            <textarea
                                value={coop?.bio || ''}
                                onChange={e => setCoop({ ...coop, bio: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Shield size={20} className="text-primary-600" /> Statut et Sécurité
                            </h3>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Statut du compte</label>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        { value: 'verified', label: 'Vérifié', icon: ShieldCheck, color: 'text-green-700 bg-green-50 border-green-200' },
                                        { value: 'pending', label: 'En attente', icon: AlertTriangle, color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
                                        { value: 'suspended', label: 'Suspendu', icon: ShieldAlert, color: 'text-orange-700 bg-orange-50 border-orange-200' },
                                        { value: 'blacklisted', label: 'Blacklisté', icon: ShieldAlert, color: 'text-red-700 bg-red-50 border-red-200' },
                                    ].map(option => (
                                        <label
                                            key={option.value}
                                            className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-all ${coop?.status === option.value ? option.color + ' ring-2 ring-offset-1 ring-primary-200' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="status"
                                                value={option.value}
                                                checked={coop?.status === option.value}
                                                onChange={() => setCoop({ ...coop, status: option.value as any })}
                                                className="hidden"
                                            />
                                            <option.icon size={18} />
                                            <span className="font-medium">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-3">
                                    Les comptes "Suspendus" ou "Blacklistés" ne peuvent plus accéder à leur tableau de bord ni vendre de produits.
                                </p>
                            </div>
                        </div>

                        {/* Privileges Section */}
                        <div className="pt-6 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Lock size={20} className="text-primary-600" /> Rôles & Privilèges
                            </h3>
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <p className="text-sm text-gray-700 mb-4">
                                    Sélectionnez les rôles assignés à cet utilisateur :
                                </p>
                                <div className="flex flex-col gap-3">
                                    {/* Seller Role Checkbox */}
                                    <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50/50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={['cooperative', 'admin'].includes(coop?.role || 'cooperative')}
                                            onChange={(e) => {
                                                const isSeller = e.target.checked;
                                                const isAdmin = ['admin', 'manager', 'super_admin'].includes(coop?.role || '');

                                                let newRole: UserRole = 'buyer';
                                                if (isSeller && isAdmin) newRole = 'admin';
                                                else if (isSeller && !isAdmin) newRole = 'cooperative';
                                                else if (!isSeller && isAdmin) newRole = 'manager';

                                                setCoop({ ...coop, role: newRole });
                                            }}
                                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 border-green-300"
                                        />
                                        <div>
                                            <span className="font-bold text-gray-900">Vendeur (Coopérative)</span>
                                            <p className="text-xs text-gray-500">Accès à "Mes Produits" et à la boutique.</p>
                                        </div>
                                    </label>

                                    {/* Admin Role Checkbox */}
                                    <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-50/50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={['admin', 'manager', 'super_admin'].includes(coop?.role || '')}
                                            onChange={(e) => {
                                                const isAdmin = e.target.checked;
                                                const isSeller = ['cooperative', 'admin'].includes(coop?.role || '');

                                                let newRole: UserRole = 'buyer';
                                                if (isSeller && isAdmin) newRole = 'admin'; // Hybrid
                                                else if (isSeller && !isAdmin) newRole = 'cooperative';
                                                else if (!isSeller && isAdmin) newRole = 'manager'; // Manager

                                                setCoop({ ...coop, role: newRole });
                                            }}
                                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500 border-blue-300"
                                        />
                                        <div>
                                            <span className="font-bold text-gray-900">Administrateur</span>
                                            <p className="text-xs text-gray-500">Accès à la gestion des produits, coopératives et liste noire.</p>
                                        </div>
                                    </label>
                                </div>
                                <div className="mt-4 pt-4 border-t border-blue-200">
                                    <p className="text-sm font-medium text-blue-800">
                                        Rôle technique actuel : <span className="uppercase font-bold">{coop?.role || 'COOPERATIVE'}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" className="flex items-center gap-2">
                                <Save size={18} /> {isNew ? 'Créer la coopérative' : 'Enregistrer les modifications'}
                            </Button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Products List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Produit</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Prix</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                    <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {coopProducts.map(product => (
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
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                            {product.price} MAD
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${product.status === 'approved' ? 'bg-green-50 text-green-700' :
                                                product.status === 'rejected' ? 'bg-red-50 text-red-700' :
                                                    'bg-yellow-50 text-yellow-700'
                                                }`}>
                                                {product.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                {product.status !== 'approved' && (
                                                    <button onClick={() => approveProduct(product.id)} className="text-green-600 hover:underline text-xs font-medium">Approuver</button>
                                                )}
                                                {product.status !== 'rejected' && (
                                                    <button onClick={() => rejectProduct(product.id, "Admin Override")} className="text-red-600 hover:underline text-xs font-medium">Rejeter</button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {coopProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-500">
                                            Aucun produit trouvé pour cette coopérative.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};
