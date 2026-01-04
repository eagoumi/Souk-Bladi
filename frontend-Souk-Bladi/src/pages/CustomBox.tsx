import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Plus, Minus, Upload, Check, Camera, ArrowLeft } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { SEO } from '../components/common/SEO';
import type { Product } from '../types';

// Virtual Base Product for Custom Box
const BASE_BOX_PRODUCT: Product = {
    id: 'custom-box-base',
    coopId: 'system',
    name: 'Mon Coffret Sur Mesure',
    price: 0, // Base price is 0, total is sum of items
    category: 'CustomBox',
    subcategory: 'Custom',
    region: 'N/A',
    rating: 5,
    images: ['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1000&auto=format&fit=crop'], // Default placeholder
    shortDesc: 'Coffret personnalisé',
    longDesc: 'Un coffret unique créé par vous.',
    originInfo: 'Maroc',
    ingredientsOrMaterials: [],
    bestSeller: false,
    isGiftable: true,
    stock: 999
};

export const CustomBox: React.FC = () => {
    const { products } = useProducts();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Builder State
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [boxName, setBoxName] = useState('');
    const [boxImage, setBoxImage] = useState<string | null>(null);
    const [boxItems, setBoxItems] = useState<{ product: Product; quantity: number }[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('Tout');

    // Data Filtering
    const fillProducts = useMemo(() => products.filter(p => p.category !== 'Packaging' && p.category !== 'CustomBox'), [products]);

    // Categories for Step 2 tabs
    const categories = ['Tout', ...Array.from(new Set(fillProducts.map(p => p.category)))];

    // Filtered products for Step 2
    const displayProducts = activeCategory === 'Tout'
        ? fillProducts
        : fillProducts.filter(p => p.category === activeCategory);

    // Handlers
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBoxImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNextStep = () => {
        if (step === 1 && boxName) {
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const addItemToBox = (product: Product) => {
        setBoxItems(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeItemFromBox = (productId: string) => {
        setBoxItems(prev => {
            const existing = prev.find(item => item.product.id === productId);
            if (existing && existing.quantity > 1) {
                return prev.map(item =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prev.filter(item => item.product.id !== productId);
        });
    };

    const getTotalPrice = () => {
        return boxItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    };

    const handleAddToCart = () => {
        // Add to Cart Logic
        addToCart(
            BASE_BOX_PRODUCT,
            1,
            boxItems,
            boxName, // Use the custom name as Bundle Name
            boxImage || BASE_BOX_PRODUCT.images[0] // Use custom image or default
        );
        setStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <SEO title="Composez votre Coffret" description="Créez un cadeau unique sur mesure." />

            {/* Header (Only show for Step 1 & 2) */}
            {step !== 3 && (
                <div className="bg-white border-b border-gray-100 py-8 mb-8 sticky top-20 lg:top-24 z-30 shadow-sm">
                    <Container>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Mon Coffret Sur Mesure</h1>
                                <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <span className={step === 1 ? 'text-primary-600 font-bold' : ''}>1. Personnalisation</span>
                                    <ArrowRight size={14} />
                                    <span className={step === 2 ? 'text-primary-600 font-bold' : ''}>2. Sélection des produits</span>
                                </div>
                            </div>

                            {step === 2 && (
                                <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">Total estimé</div>
                                        <div className="font-bold text-primary-600">{getTotalPrice()} MAD</div>
                                    </div>
                                    <div className="h-8 w-px bg-gray-300"></div>
                                    <div className="text-right">
                                        <div className="text-xs text-gray-500">Produits</div>
                                        <div className="font-bold text-gray-900">{boxItems.reduce((acc, i) => acc + i.quantity, 0)}</div>
                                    </div>
                                    <Button size="sm" onClick={handleAddToCart} disabled={boxItems.length === 0} className="ml-2">
                                        Terminer
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            )}

            <Container>
                {/* STEP 1: Customize (Name & Image) */}
                {step === 1 && (
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-6 text-center">Commencez votre création</h2>

                        <div className="space-y-8">
                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Donnez un nom à votre coffret <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Coffret Anniversaire Maman, Cadeau de Mariage..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    value={boxName}
                                    onChange={(e) => setBoxName(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Ajoutez une photo personnelle (Optionnel)
                                    <span className="block text-xs font-normal text-gray-500 mt-1">Cette image sera utilisée pour représenter votre coffret dans le panier.</span>
                                </label>

                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${boxImage ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'}`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />

                                    {boxImage ? (
                                        <div className="relative group w-full max-w-xs aspect-video rounded-lg overflow-hidden shadow-sm">
                                            <img src={boxImage} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-white text-sm font-medium flex items-center gap-2">
                                                    <Camera size={16} /> Changer la photo
                                                </span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                                                <Upload size={24} />
                                            </div>
                                            <p className="font-medium text-gray-600">Cliquez pour importer une image</p>
                                            <p className="text-xs">JPG, PNG (Max 5MB)</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button
                                size="lg"
                                fullWidth
                                onClick={handleNextStep}
                                disabled={!boxName.trim()}
                                className="mt-4"
                            >
                                Continuer vers la sélection des produits <ArrowRight size={20} className="ml-2" />
                            </Button>
                        </div>
                    </div>
                )}


                {/* STEP 2: Fill Box */}
                {step === 2 && (
                    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <ShoppingBag className="text-primary-600" /> Ajoutez vos produits
                                </h2>
                                <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-gray-500">
                                    <ArrowLeft size={16} className="mr-1" /> Retour
                                </Button>
                            </div>

                            {/* Category Tabs */}
                            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                            ? 'bg-gray-900 text-white'
                                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {displayProducts.map(product => {
                                    const inBoxQty = boxItems.find(i => i.product.id === product.id)?.quantity || 0;
                                    return (
                                        <div key={product.id} className="bg-white p-3 rounded-xl border border-gray-100 flex gap-4 hover:shadow-sm transition-shadow">
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <h3 className="font-medium text-gray-900 text-sm line-clamp-2">{product.name}</h3>
                                                <div className="text-primary-600 font-bold text-sm mt-1 mb-auto">{product.price} MAD</div>

                                                {inBoxQty === 0 ? (
                                                    <Button size="sm" variant="outline" className="w-full py-1 h-8 text-xs" onClick={() => addItemToBox(product)}>
                                                        Ajouter
                                                    </Button>
                                                ) : (
                                                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1">
                                                        <button onClick={() => removeItemFromBox(product.id)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-gray-600 hover:text-red-500">
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="text-sm font-bold w-6 text-center">{inBoxQty}</span>
                                                        <button onClick={() => addItemToBox(product)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-primary-600 hover:bg-primary-50">
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sidebar Summary (Desktop) */}
                        <div className="hidden lg:block w-80 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-48">
                                <h3 className="font-bold text-lg mb-4">Votre Coffret</h3>

                                <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100 items-start">
                                    <img src={boxImage || BASE_BOX_PRODUCT.images[0]} className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                                    <div>
                                        <div className="font-bold text-gray-900 line-clamp-2">{boxName}</div>
                                        <div className="text-xs text-gray-500 mt-1 cursor-pointer hover:text-primary-600" onClick={() => setStep(1)}>Modifier</div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                    {boxItems.length === 0 ? (
                                        <div className="text-center text-gray-400 text-sm py-8 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                            Votre coffret est vide.<br />Ajoutez des produits pour commencer.
                                        </div>
                                    ) : (
                                        boxItems.map(item => (
                                            <div key={item.product.id} className="flex justify-between items-center text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="bg-primary-50 text-primary-700 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                                        {item.quantity}
                                                    </span>
                                                    <span className="truncate max-w-[120px] text-gray-700">{item.product.name}</span>
                                                </div>
                                                <span className="font-medium text-gray-900">{item.product.price * item.quantity} MAD</span>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="border-t border-gray-100 pt-4 space-y-4">
                                    <div className="flex justify-between items-center font-bold text-lg">
                                        <span>Total</span>
                                        <span className="text-primary-600">{getTotalPrice()} MAD</span>
                                    </div>
                                    <Button className="w-full" onClick={handleAddToCart} disabled={boxItems.length === 0}>
                                        Ajouter au Panier
                                    </Button>
                                    <p className="text-xs text-center text-gray-400">Total hors frais de livraison</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP 3: Success */}
                {step === 3 && (
                    <div className="max-w-xl mx-auto text-center py-12 animate-fade-in">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={48} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">C'est dans la boîte !</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Votre coffret <span className="font-bold text-gray-900">"{boxName}"</span> a été créé et ajouté à votre panier avec succès.
                        </p>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-sm mx-auto">
                            <img src={boxImage || BASE_BOX_PRODUCT.images[0]} alt="Box Preview" className="w-full aspect-video object-cover rounded-xl mb-4" />
                            <div className="flex justify-between items-center font-bold text-lg border-t border-gray-100 pt-4">
                                <span>Total</span>
                                <span className="text-primary-600">{getTotalPrice()} MAD</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" onClick={() => navigate('/cart')}>
                                <ShoppingBag size={20} className="mr-2" /> Voir mon panier
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => {
                                setStep(1);
                                setBoxName('');
                                setBoxImage(null);
                                setBoxItems([]);
                                setBoxImage(null);
                            }}>
                                <Plus size={20} className="mr-2" /> Créer un autre coffret
                            </Button>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};
