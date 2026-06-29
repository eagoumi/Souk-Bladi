import React, { useState } from 'react';
import { Plus, Search, X, Save, Image as ImageIcon, Star, Trash2, Edit2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { type Product } from '../../types';
import { PromotionModal } from '../../components/dashboard/PromotionModal';

export const DashboardProducts: React.FC = () => {
    const { adminProducts, addProduct, updateProduct, deleteProduct } = useProducts();
    const { user } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Promotion Modal State
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
    const [promoProduct, setPromoProduct] = useState<Product | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        shortDescription: '',
        description: ''
    });

    const resetForm = () => {
        setFormData({ name: '', price: '', category: '', image: '', shortDescription: '', description: '' });
        setEditingProduct(null);
        setIsEditing(false);
    };

    const handleStartEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price.toString(),
            category: product.category,
            image: product.images[0] || '',
            shortDescription: product.shortDesc,
            description: product.longDesc
        });
        setIsEditing(true);
    };

    const handleStartAdd = () => {
        setEditingProduct(null);
        setFormData({ name: '', price: '', category: '', image: '', shortDescription: '', description: '' });
        setIsEditing(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const priceValue = parseFloat(formData.price.replace(/[^0-9.]/g, '')) || 0;

        if (editingProduct) {
            // Update existing product
            const updated: Product = {
                ...editingProduct,
                name: formData.name,
                price: priceValue,
                category: formData.category,
                images: formData.image ? [formData.image] : [],
                shortDesc: formData.shortDescription,
                longDesc: formData.description,
                // Reset status to pending on significant edit? For now, keep as is or pending.
                // Let's reset to pending to re-trigger approval.
                status: 'pending'
            };
            updateProduct(updated);
        } else {
            // Create new product
            const newProduct: Product = {
                id: `p-${Date.now()}`,
                coopId: user?.id || 'c1',
                name: formData.name,
                price: priceValue,
                category: formData.category,
                subcategory: 'Divers', // Default
                region: 'Maroc', // Default
                rating: 0,
                images: formData.image ? [formData.image] : [],
                shortDesc: formData.shortDescription || formData.name,
                longDesc: formData.description || 'Pas de description',
                originInfo: 'Maroc',
                ingredientsOrMaterials: [],
                bestSeller: false,
                isGiftable: false,
                stock: 10,
                isPromoted: false,
                status: 'pending' // Explicitly pending
            };
            addProduct(newProduct);
        }
        resetForm();
    };

    const handleOpenPromoModal = (product: Product) => {
        setPromoProduct(product);
        setIsPromoModalOpen(true);
    };

    const handleConfirmPromotion = (planId: string) => {
        if (promoProduct) {
            // Simulate API call / Payment
            console.log(`Activating plan ${planId} for product ${promoProduct.id}`);

            // If already promoted, maybe this is an extension or upgrade. 
            // For now we just ensure it is true.
            // If the user wants to CANCEL promotion, we'd need a different flow or a cancel button in the modal/dashboard. 
            // Assuming this flow is primarily for ACTIVATION.

            updateProduct({ ...promoProduct, isPromoted: true });

            setIsPromoModalOpen(false);
            setPromoProduct(null);
            alert(`Promotion "${planId}" activée avec succès !`);
        }
    };

    const handleTogglePromote = (product: Product) => {
        if (product.isPromoted) {
            // If already promoted, maybe ask to remove?
            if (window.confirm("Voulez-vous arrêter la promotion de ce produit ?")) {
                updateProduct({ ...product, isPromoted: false });
            }
        } else {
            handleOpenPromoModal(product);
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            deleteProduct(id);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: imageUrl });
        }
    };

    // Filter products for THIS cooperative ONLY
    const myProducts = adminProducts.filter(p => p.coopId === user?.id);

    const filteredProducts = myProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold font-display text-gray-900">Vos Produits</h2>
                    <p className="text-sm text-gray-500">Gérez votre catalogue de produits</p>
                </div>
                {!isEditing && (
                    <Button onClick={handleStartAdd} className="flex items-center gap-2">
                        <Plus size={16} /> Ajouter un produit
                    </Button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-gray-50 min-h-screen animation-fade-in pb-20">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 font-display">
                            {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
                        </h3>
                        <div className="flex gap-3">
                            <Button type="button" variant="outline" onClick={resetForm}>Annuler</Button>
                            <Button onClick={() => document.getElementById('product-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))} className="flex items-center gap-2">
                                <Save size={16} /> {editingProduct ? 'Mettre à jour' : 'Publier'}
                            </Button>
                        </div>
                    </div>

                    <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Column (2/3) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Product Name */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 text-lg font-medium rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                                    placeholder="Nom du produit"
                                />
                            </div>

                            {/* Long Description */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description longue</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    rows={10}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                                    placeholder="Description détaillée du produit..."
                                />
                            </div>

                            {/* Product Data Panel */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                                    <h4 className="font-semibold text-gray-700">Données produit</h4>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix régulier (MAD)</label>
                                        <input
                                            required
                                            type="number"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Prix promo (Optionnel)</label>
                                        <input
                                            type="number"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock (Quantité)</label>
                                        <input
                                            type="number"
                                            defaultValue={10}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Short Description */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description courte</label>
                                <p className="text-xs text-gray-500 mb-2">Apparaît à côté de l'image du produit.</p>
                                <textarea
                                    value={formData.shortDescription}
                                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                                    placeholder="Bref résumé..."
                                />
                            </div>
                        </div>

                        {/* Sidebar Column (1/3) */}
                        <div className="space-y-6">
                            {/* Category */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Catégories de produits</label>
                                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                                    {['Cosmétique', 'Alimentaire', 'Décoration', 'Vêtements', 'Bijoux', 'Maison', 'Epices'].map(cat => (
                                        <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                            <input
                                                type="radio"
                                                name="category"
                                                checked={formData.category === cat}
                                                onChange={() => setFormData({ ...formData, category: cat })}
                                                className="rounded text-primary-600 focus:ring-primary-500"
                                            />
                                            <span className="text-sm text-gray-700">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                                <button type="button" className="mt-3 text-sm text-primary-600 hover:underline flex items-center gap-1">
                                    <Plus size={14} /> Ajouter une catégorie
                                </button>
                            </div>

                            {/* Product Image */}
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Image du produit</label>
                                <div className="space-y-3">
                                    {formData.image ? (
                                        <div className="relative group">
                                            <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image: '' })}
                                                className="absolute top-2 right-2 bg-white text-red-500 p-1.5 rounded-full shadow-sm hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-500">Ajouter une image</p>
                                            </div>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    )}

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200"></div>
                                        </div>
                                        <div className="relative flex justify-center text-xs">
                                            <span className="px-2 bg-white text-gray-400">Ou via URL</span>
                                        </div>
                                    </div>
                                    <input
                                        type="url"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all outline-none"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    {/* Search Bar for Products */}
                    <div className="relative max-w-md mb-6">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className={`bg-white rounded-xl border transition-all group ${product.isPromoted ? 'border-primary-200 ring-2 ring-primary-100 shadow-lg' : 'border-gray-100 hover:shadow-md'}`}>
                                <div className="h-48 bg-gray-100 relative overflow-hidden">
                                    {/* Status Badge */}
                                    <div className="absolute top-2 right-2 flex flex-col gap-1 items-end z-10">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1 ${product.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                product.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {product.status === 'approved' && 'Approuvé'}
                                            {product.status === 'rejected' && 'Rejeté'}
                                            {(product.status === 'pending' || !product.status) && 'En attente'}
                                        </span>
                                    </div>

                                    {product.isPromoted && (
                                        <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10 flex items-center gap-1">
                                            <Star size={12} fill="currentColor" /> Promu
                                        </div>
                                    )}
                                    {product.images && product.images.length > 0 ? (
                                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <ImageIcon size={32} />
                                        </div>
                                    )}

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => handleTogglePromote(product)}
                                            className={`p-2 rounded-full shadow-sm transition-colors ${product.isPromoted ? 'bg-yellow-400 text-white' : 'bg-white text-gray-600 hover:text-yellow-500'}`}
                                            title={product.isPromoted ? "Retirer de la promotion" : "Promouvoir ce produit"}
                                        >
                                            <Star size={18} fill={product.isPromoted ? "currentColor" : "none"} />
                                        </button>
                                        <button
                                            onClick={() => handleStartEdit(product)}
                                            className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-primary-600 transition-colors"
                                            title="Modifier"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                                            title="Supprimer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">{product.category}</span>
                                        <span className="font-bold text-gray-900">{product.price} MAD</span>
                                    </div>
                                    <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.shortDesc}</p>
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={handleStartAdd}
                            className="h-full min-h-[280px] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-primary-500 hover:text-primary-500 transition-colors bg-gray-50/50 hover:bg-primary-50/10"
                        >
                            <Plus size={32} className="mb-2" />
                            <span className="font-medium">Ajouter un produit</span>
                        </button>
                    </div>
                </>
            )}
            {/* Promotion Modal */}
            <PromotionModal
                isOpen={isPromoModalOpen}
                onClose={() => setIsPromoModalOpen(false)}
                onConfirm={handleConfirmPromotion}
                product={promoProduct}
            />
        </div>
    );
};
