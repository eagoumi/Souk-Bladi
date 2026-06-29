import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Container } from '../components/common/Container';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { ProductCard } from '../components/domain/ProductCard';
// import { products } from '../data/mockData';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';

import { useLanguage } from '../context/LanguageContext';

export const Products: React.FC = () => {

    const { products } = useProducts();
    const { t } = useLanguage();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    // Derived State
    const searchQuery = searchParams.get('q') || '';
    const currentCategory = searchParams.get('category');
    const currentRegion = searchParams.get('region');
    const sort = searchParams.get('sort') || 'popular';
    const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : Infinity;
    const minRating = Number(searchParams.get('minRating')) || 0;
    const tags = searchParams.get('tags')?.split(',') || [];

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = (product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = !currentCategory || product.category === currentCategory;
        const matchesRegion = !currentRegion || product.region === currentRegion;
        const matchesPrice = product.price <= maxPrice;
        const matchesRating = product.rating >= minRating;

        const matchesTags = tags.length === 0 || tags.every(tag => {
            if (tag === 'bestSeller') return product.bestSeller;
            if (tag === 'isGiftable') return product.isGiftable;
            if (tag === 'isPromoted') return product.isPromoted;
            return true;
        });

        return matchesSearch && matchesCategory && matchesRegion && matchesPrice && matchesRating && matchesTags;
    });

    // Sort Logic
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        // Always prioritize Promoted products
        if (a.isPromoted && !b.isPromoted) return -1;
        if (!a.isPromoted && b.isPromoted) return 1;

        // Then apply selected sort
        switch (sort) {
            case 'price_asc': return a.price - b.price;
            case 'price_desc': return b.price - a.price;
            case 'popular': return b.rating - a.rating;
            case 'newest': return 0; // Placeholder as no date field exists
            default: return 0;
        }
    });

    // Extract unique values for filters
    const categories = Array.from(new Set(products.map(p => p.category)));
    const regions = Array.from(new Set(products.map(p => p.region)));

    // existing return logic wrapper
    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <SEO
                title={searchQuery ? `${t('products.results')} "${searchQuery}"` : t('products.catalog')}
                description={t('products.subtitle').replace('{count}', products.length.toString())}
            />
            {/* Header */}
            <div className="bg-white border-b border-gray-100 py-8 mb-8">
                <Container>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {searchQuery ? `${t('products.results')} "${searchQuery}"` : t('products.all')}
                    </h1>
                    <p className="text-gray-500">
                        {t('products.subtitle').replace('{count}', filteredProducts.length.toString())}
                    </p>
                </Container>
            </div>

            <Container>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Area */}
                    <FilterSidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                        categories={categories}
                        regions={regions}
                    />

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="flex justify-between items-center mb-6">
                            <Button
                                variant="outline"
                                className="lg:hidden flex items-center gap-2"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <Filter size={18} /> {t('products.filter.title')}
                            </Button>

                            <div className="flex items-center gap-3 ml-auto">
                                <span className="text-sm text-gray-500 hidden sm:inline">{t('products.sort.label')}:</span>
                                <div className="relative">
                                    <select
                                        value={sort}
                                        onChange={(e) => {
                                            const newParams = new URLSearchParams(searchParams);
                                            newParams.set('sort', e.target.value);
                                            setSearchParams(newParams);
                                        }}
                                        className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                                    >
                                        <option value="popular">{t('products.sort.popular')}</option>
                                        <option value="newest">{t('products.sort.newest')}</option>
                                        <option value="price_asc">{t('products.sort.priceAsc')}</option>
                                        <option value="price_desc">{t('products.sort.priceDesc')}</option>
                                    </select>
                                    <SlidersHorizontal size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        {sortedProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">{t('products.noResults')}</h3>
                                <p className="text-gray-500">{t('products.tryAdjust')}</p>
                                <Button
                                    variant="ghost"
                                    className="mt-4 text-primary-600"
                                    onClick={() => setSearchParams(new URLSearchParams())}
                                >
                                    {t('products.reset')}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
