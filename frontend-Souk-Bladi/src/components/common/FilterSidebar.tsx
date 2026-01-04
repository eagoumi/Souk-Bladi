import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    categories: string[];
    regions: string[];
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
    isOpen,
    onClose,
    categories,
    regions
}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category');
    const currentRegion = searchParams.get('region');
    const { t } = useLanguage();

    const handleFilterChange = (key: string, value: string | null) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:shadow-none lg:z-auto lg:w-64 flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-4 border-b border-gray-100 flex justify-between items-center lg:hidden">
                    <h2 className="text-lg font-bold">{t('products.filter.title')}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900">{t('filters.categories')}</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={!currentCategory}
                                    onChange={() => handleFilterChange('category', null)}
                                    className="text-primary-600 focus:ring-primary-500"
                                />
                                <span className={!currentCategory ? 'text-primary-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}>
                                    {t('filters.all')}
                                </span>
                            </label>
                            {categories.map(cat => (
                                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={currentCategory === cat}
                                        onChange={() => handleFilterChange('category', cat)}
                                        className="text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className={currentCategory === cat ? 'text-primary-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}>
                                        {cat}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Regions */}
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900">{t('filters.regions')}</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="region"
                                    checked={!currentRegion}
                                    onChange={() => handleFilterChange('region', null)}
                                    className="text-primary-600 focus:ring-primary-500"
                                />
                                <span className={!currentRegion ? 'text-primary-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}>{t('filters.all')}</span>
                            </label>
                            {regions.map(region => (
                                <label key={region} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="region"
                                        checked={currentRegion === region}
                                        onChange={() => handleFilterChange('region', region)}
                                        className="text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className={currentRegion === region ? 'text-primary-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}>
                                        {region}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900">{t('filters.special')}</h3>
                        <div className="space-y-2">
                            {[
                                { id: 'bestSeller', label: t('filters.bestSales') },
                                { id: 'isGiftable', label: t('filters.gift') },
                                { id: 'isPromoted', label: t('filters.sponsored') }
                            ].map(tag => {
                                const currentTags = searchParams.get('tags')?.split(',') || [];
                                const isChecked = currentTags.includes(tag.id);
                                return (
                                    <label key={tag.id} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => {
                                                const newTags = e.target.checked
                                                    ? [...currentTags, tag.id]
                                                    : currentTags.filter(t => t !== tag.id);
                                                handleFilterChange('tags', newTags.length ? newTags.join(',') : null);
                                            }}
                                            className="text-primary-600 focus:ring-primary-500 rounded"
                                        />
                                        <span className={isChecked ? 'text-primary-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}>
                                            {tag.label}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Rating */}
                    <div>
                        <h3 className="font-semibold mb-4 text-gray-900">{t('filters.minRating')}</h3>
                        <div className="space-y-2">
                            {[0, 4, 3].map((rating) => (
                                <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="minRating"
                                        checked={(Number(searchParams.get('minRating')) || 0) === rating}
                                        onChange={() => handleFilterChange('minRating', rating === 0 ? null : rating.toString())}
                                        className="text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className={(Number(searchParams.get('minRating')) || 0) === rating ? 'text-primary-600 font-medium' : 'text-gray-600 group-hover:text-gray-900'}>
                                        {rating === 0 ? t('filters.all') : `${rating} ${t('filters.stars')}`}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-900">{t('filters.priceMax')}</h3>
                            {searchParams.get('maxPrice') && (
                                <button
                                    onClick={() => handleFilterChange('maxPrice', null)}
                                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    {t('products.reset')}
                                </button>
                            )}
                        </div>
                        <div className="mb-2 text-primary-600 font-bold">
                            {searchParams.get('maxPrice') ? `${searchParams.get('maxPrice')} MAD` : t('filters.unlimited')}
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={searchParams.get('maxPrice') || 5000}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>0 MAD</span>
                            <span>5000+ MAD</span>
                        </div>
                    </div>

                    {/* Reset All Button */}
                    {(currentCategory || currentRegion || searchParams.get('maxPrice') || searchParams.get('minRating') || searchParams.get('tags')) && (
                        <div className="pt-6 border-t border-gray-100">
                            <button
                                onClick={() => setSearchParams({})}
                                className="w-full py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
                            >
                                <X size={16} /> {t('products.reset')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};
