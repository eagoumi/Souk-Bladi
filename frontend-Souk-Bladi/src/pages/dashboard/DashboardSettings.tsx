import React, { useState, useEffect } from 'react';
import { Camera, Save, MapPin, Phone, Mail, Award, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useAuth, type User } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { VerificationPricing } from '../../components/dashboard/VerificationPricing';

export const DashboardSettings: React.FC = () => {
    const { user, updateProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<User>>({
        name: '',
        bio: '',
        location: '',
        phone: '',
        avatar: '',
        banner: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                bio: user.bio || '',
                location: user.location || '',
                phone: user.phone || '',
                avatar: user.avatar || '',
                banner: user.banner || ''
            });
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, avatar: imageUrl }));
        }
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setFormData(prev => ({ ...prev, banner: imageUrl }));
        }
    };

    const [showVerificationModal, setShowVerificationModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        updateProfile(formData);
        setIsLoading(false);
        // Could add a toast notification here
    };

    const handleVerificationRequest = () => {
        setShowVerificationModal(true);
    };

    const handlePlanSelection = async (planId: string) => {
        setShowVerificationModal(false);
        setIsLoading(true);
        console.log('Selected plan:', planId);
        // Simulate API call for plan subscription
        await new Promise(resolve => setTimeout(resolve, 1500));
        updateProfile({ verificationStatus: 'pending' });
        setIsLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-xl font-bold font-display text-gray-900">Paramètres du profil</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Profile Card */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm text-center overflow-hidden">
                        {/* Banner Upload */}
                        <div className="h-32 bg-gray-100 relative group">
                            {formData.banner ? (
                                <img src={formData.banner} alt="Banner" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                    Ajouter une couverture
                                </div>
                            )}
                            <label className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-colors flex items-center justify-center cursor-pointer group-hover:opacity-100 opacity-0">
                                <span className="bg-white/90 p-2 rounded-full shadow-sm text-gray-700">
                                    <Camera size={18} />
                                </span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleBannerChange} />
                            </label>
                        </div>

                        <div className="px-6 pb-6 relative">
                            {/* Avatar - Shifted up */}
                            <div className="relative inline-block -mt-12 mb-4">
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md overflow-hidden mx-auto">
                                    {formData.avatar ? (
                                        <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-2xl">
                                            {formData.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-primary-700 transition-colors shadow-sm ring-2 ring-white">
                                    <Camera size={14} />
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                </label>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg">{user?.name}</h3>
                            <p className="text-gray-500 text-sm capitalize mb-4">{user?.role}</p>

                            <div className="flex items-center justify-center gap-2 mb-2">
                                {user?.verificationStatus === 'verified' && (
                                    <Badge variant="success" className="flex items-center gap-1">
                                        <CheckCircle size={12} /> Vérifié
                                    </Badge>
                                )}
                                {user?.verificationStatus === 'pending' && (
                                    <Badge variant="warning" className="flex items-center gap-1">
                                        <Loader2 size={12} className="animate-spin" /> En attente
                                    </Badge>
                                )}
                                {(user?.verificationStatus === 'unverified' || !user?.verificationStatus) && (
                                    <Badge variant="neutral">Non vérifié</Badge>
                                )}
                            </div>

                            {(!user?.verificationStatus || user?.verificationStatus === 'unverified') && (
                                <button
                                    onClick={handleVerificationRequest}
                                    disabled={isLoading}
                                    className="text-sm text-primary-600 hover:text-primary-700 underline font-medium"
                                >
                                    Demander le badge vérifié
                                </button>
                            )}
                        </div>

                        <div className="bg-gradient-to-br from-primary-900 to-primary-800 p-6 rounded-2xl text-white shadow-lg overflow-hidden relative">
                            <Award className="absolute -bottom-4 -right-4 text-white/10 w-32 h-32" />
                            <h4 className="font-bold text-lg mb-2 relative z-10">Devenez un Vendeur Vérifié</h4>
                            <p className="text-primary-100 text-sm mb-4 relative z-10">
                                Obtenez le badge de confiance pour augmenter vos ventes et rassurer vos clients.
                            </p>
                            <Button
                                size="sm"
                                variant="secondary"
                                className="w-full justify-center relative z-10"
                                onClick={handleVerificationRequest}
                                disabled={user?.verificationStatus !== 'unverified'}
                            >
                                {user?.verificationStatus === 'verified' ? 'Badge Obtenu' : user?.verificationStatus === 'pending' ? 'Demande envoyée' : 'Vérifier mon compte'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Edit Form */}
                <div className="md:col-span-2 space-y-6">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
                                <Loader2 className="animate-spin text-primary-600" size={32} />
                            </div>
                        )}

                        <h3 className="font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">Informations Générales</h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet / Coopérative</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-xs text-gray-400">(Non modifiable)</span></label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            value={user?.email}
                                            disabled
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio / À propos</label>
                                <textarea
                                    name="bio"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Racontez votre histoire..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                                />
                                <p className="text-xs text-gray-500 mt-1 text-right">{formData.bio?.length}/500</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+212 6..."
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                                    <div className="relative">
                                        <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            placeholder="Ville, Région"
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                            <Button type="submit" className="flex items-center gap-2 shadow-lg shadow-primary-500/20">
                                <Save size={16} /> Enregistrer les modifications
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={showVerificationModal}
                onClose={() => setShowVerificationModal(false)}
                title="Devenir Vendeur Vérifié"
                className="max-w-4xl"
            >
                <VerificationPricing onSelectPlan={handlePlanSelection} />
            </Modal>
        </div>
    );
};
