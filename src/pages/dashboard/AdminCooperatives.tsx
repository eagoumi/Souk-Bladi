import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, UserCheck, UserX, ShieldAlert, ShieldCheck, Plus, Crown, Star } from 'lucide-react';
import { useCooperatives } from '../../context/CooperativeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export const AdminCooperatives: React.FC = () => {
    const { cooperatives, updateCooperative } = useCooperatives();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleVerify = (id: string) => {
        updateCooperative(id, { status: 'verified' });
    };

    const handleBlock = (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir bloquer cette coopérative ?")) {
            updateCooperative(id, { status: 'suspended' });
        }
    };

    const filteredCoops = cooperatives.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const canAddCooperative = user?.role === 'super_admin' || user?.role === 'admin';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold font-display text-gray-900">Coopératives Partenaires</h2>
                    <p className="text-sm text-gray-500">Gérez les comptes des coopératives et leurs statuts.</p>
                </div>
                {canAddCooperative && (
                    <Button onClick={() => navigate('/dashboard/admin-coops/new')} className="flex items-center gap-2">
                        <Plus size={18} /> Ajouter une coopérative
                    </Button>
                )}
            </div>

            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher une coopérative par nom ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full"
                    />
                </div>
                <div className="text-sm text-gray-500">
                    Total: <span className="font-semibold text-gray-900">{cooperatives.length}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoops.map(coop => (
                    <div key={coop.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-full ${coop.status === 'verified' ? 'bg-green-100 text-green-600' : (coop.status === 'suspended' || coop.status === 'blacklisted') ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-primary-600'}`}>
                                {(coop.status === 'suspended' || coop.status === 'blacklisted') ? <ShieldAlert size={24} /> : <ShieldCheck size={24} />}
                            </div>
                            <Link to={`/dashboard/admin-coops/${coop.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                                Gérer
                            </Link>
                        </div>

                        <h3 className="font-bold text-lg text-gray-900 mb-1">{coop.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{coop.email}</p>

                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                            <span className="bg-gray-50 px-2 py-1 rounded border border-gray-100">{coop.productCount} Produits</span>
                            <span>Depuis le {coop.joinedDate}</span>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                            <div className="flex gap-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full uppercase ${coop.status === 'verified' ? 'bg-green-50 text-green-700' :
                                    (coop.status === 'suspended' || coop.status === 'blacklisted') ? 'bg-red-50 text-red-700' :
                                        'bg-yellow-50 text-yellow-700'
                                    }`}>
                                    {coop.status}
                                </span>
                                {/* Tier Badge */}
                                {coop.tier && (
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${coop.tier === 'premium' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                                        coop.tier === 'verified' ? 'bg-primary-50 text-primary-700 border border-primary-100' :
                                            'bg-gray-100 text-gray-600 border border-gray-200'
                                        }`}>
                                        {coop.tier === 'premium' && <Crown size={10} fill="currentColor" />}
                                        {coop.tier === 'verified' && <ShieldCheck size={10} />}
                                        {coop.tier === 'discovery' && <Star size={10} />}
                                        {coop.tier === 'premium' ? 'Premium' : coop.tier === 'verified' ? 'Vérifié' : 'Découverte'}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2">
                                {coop.status !== 'verified' && (
                                    <button
                                        onClick={() => handleVerify(coop.id)}
                                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                                        title="Vérifier"
                                    >
                                        <UserCheck size={18} />
                                    </button>
                                )}
                                {(coop.status !== 'suspended' && coop.status !== 'blacklisted') && (
                                    <button
                                        onClick={() => handleBlock(coop.id)}
                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                                        title="Bloquer"
                                    >
                                        <UserX size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {filteredCoops.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        Aucune coopérative trouvée.
                    </div>
                )}
            </div>
        </div>
    );
};
