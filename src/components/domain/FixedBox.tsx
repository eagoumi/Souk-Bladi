import React from 'react';
import { Package, ShoppingBag, Check } from 'lucide-react';
import type { Product, Collection } from '../../types';
import { Button } from '../common/Button';
import { useLanguage } from '../../context/LanguageContext';

interface FixedBoxProps {
    collection: Collection;
    products: Product[];
    onAdd: () => void;
    isAdding: boolean;
}

export const FixedBox: React.FC<FixedBoxProps> = ({ collection, products, onAdd, isAdding }) => {
    const { t } = useLanguage();

    const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Left: Box Visual / Cover */}
            <div className="w-full lg:w-96 flex-shrink-0 bg-gray-50 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                <div className="relative w-64 h-64 bg-white rounded-2xl shadow-md p-4 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                    <img
                        src={collection.imageUrl}
                        alt={collection.name}
                        className="w-full h-full object-cover rounded-xl"
                    />
                    {/* Decorative Elements mimicking contents sticking out */}
                    <div className="absolute -top-4 -right-4 bg-white p-2 rounded-lg shadow-sm border border-gray-100 w-16 h-16 transform rotate-12 z-10">
                        {products[0] && <img src={products[0].images[0]} className="w-full h-full object-cover rounded" />}
                    </div>
                    <div className="absolute -bottom-2 -left-2 bg-white p-2 rounded-lg shadow-sm border border-gray-100 w-12 h-12 transform -rotate-6 z-10">
                        {products[1] && <img src={products[1].images[0]} className="w-full h-full object-cover rounded" />}
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest">
                        {collection.theme}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 font-display">{collection.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 px-4">{collection.description}</p>
                </div>
            </div>

            {/* Right: Contents List */}
            <div className="flex-1 p-8 w-full">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-lg flex items-center gap-2">
                        <Package className="text-primary-600" size={20} />
                        Contenu du coffret
                    </h4>
                    <span className="text-2xl font-bold text-primary-600">{totalPrice} MAD</span>
                </div>

                <div className="space-y-4 mb-8">
                    {/* Packaging Item (Simulated or First item if it serves as packaging) */}
                    {/* Using a generic "Coffret" line item purely visual or mapped if exists */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-gray-400">
                                <Package size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-sm text-gray-900">Emballage Cadeau Premium</div>
                                <div className="text-xs text-gray-500">Boîte artisanale et ruban</div>
                            </div>
                        </div>
                        <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">Inclus</div>
                    </div>

                    {products.map(product => (
                        <div key={product.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                </div>
                                <div>
                                    <div className="font-bold text-sm text-gray-900 line-clamp-1">{product.name}</div>
                                    <div className="text-xs text-gray-500">{product.category}</div>
                                </div>
                            </div>
                            <div className="font-medium text-sm text-gray-900 px-3">{product.price} MAD</div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <Button
                        size="lg"
                        onClick={onAdd}
                        disabled={isAdding}
                        className={`w-full sm:w-auto transition-all duration-300 ${isAdding ? 'bg-green-600 border-green-600' : ''}`}
                    >
                        {isAdding ? (
                            <span className="flex items-center gap-2">
                                <Check size={20} /> Ajouté !
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <ShoppingBag size={20} /> {t('giftsets.addBundle')}
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};
