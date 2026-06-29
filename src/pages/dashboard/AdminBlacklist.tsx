import React, { useState } from 'react';
import { Search, ShieldCheck, Trash2, ShieldAlert } from 'lucide-react';

interface BlacklistedUser {
    id: string;
    name: string;
    email: string;
    reason: string;
    date: string;
}

// Mock Data for Blacklist
const MOCK_BLACKLIST: BlacklistedUser[] = [
    { id: '3', name: 'Tapis Tradition', email: 'info@tapis.ma', reason: 'Non-respect des conditions de vente', date: '2024-11-15' },
    { id: '99', name: 'Fake Coop', email: 'spam@fake.com', reason: 'Compte frauduleux', date: '2024-12-01' },
];

export const AdminBlacklist: React.FC = () => {
    const [blacklist, setBlacklist] = useState<BlacklistedUser[]>(MOCK_BLACKLIST);
    const [searchTerm, setSearchTerm] = useState('');

    const handleUnblock = (id: string) => {
        if (window.confirm("Voulez-vous vraiment débloquer cette coopérative ?")) {
            setBlacklist(prev => prev.filter(item => item.id !== id));
            // In a real app, this would also update the User status to 'verified' or 'pending'
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm("ATTENTION : Cette action est irréversible. Voulez-vous supprimer définitivement ce compte ?")) {
            setBlacklist(prev => prev.filter(item => item.id !== id));
        }
    };

    const filteredList = blacklist.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold font-display text-gray-900 flex items-center gap-2">
                    <ShieldAlert className="text-red-600" /> Liste Noire (Blacklist)
                </h2>
                <p className="text-sm text-gray-500">Gérez les coopératives bannies de la plateforme.</p>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                    />
                </div>
            </div>

            {/* List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-red-50 border-b border-red-100">
                        <tr>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-red-800 uppercase">Coopérative</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-red-800 uppercase">Raison du ban</th>
                            <th className="text-left py-4 px-6 text-xs font-semibold text-red-800 uppercase">Date</th>
                            <th className="text-right py-4 px-6 text-xs font-semibold text-red-800 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredList.map(item => (
                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div>
                                        <p className="font-bold text-gray-900">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.email}</p>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">
                                    {item.reason}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-500">
                                    {item.date}
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => handleUnblock(item.id)}
                                            className="flex items-center gap-1 text-green-600 hover:text-green-700 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                            title="Débloquer (Remettre en vérifié)"
                                        >
                                            <ShieldCheck size={14} /> Débloquer
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="flex items-center gap-1 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                                            title="Supprimer définitivement"
                                        >
                                            <Trash2 size={14} /> Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredList.length === 0 && (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-500">
                                    Aucune coopérative trouvée dans la liste noire.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
