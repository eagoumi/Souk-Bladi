import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useProducts } from '../context/ProductContext';
import { Container } from '../components/common/Container';
import { ProductCard } from '../components/domain/ProductCard';
import { SEO } from '../components/common/SEO';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryLandingProps {
    categoryKey: string;     // 'terroir', 'cosmetics', 'crafts'
    filterCategory: string;  // 'alimentaire', 'cosmetique', 'artisanat'
    heroColor: string;       // Tailwind class for gradient e.g. 'from-orange-500'
    heroPattern?: string;
}

export const CategoryLanding: React.FC<CategoryLandingProps> = ({
    categoryKey,
    filterCategory,
    heroColor,
    heroPattern = "bg-[url('https://images.unsplash.com/photo-1548586196-aa5803b77379?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center" // Generic fallback
}) => {
    const { t } = useLanguage();
    const { products } = useProducts();

    // Filter products
    const categoryProducts = products.filter(p => p.category === filterCategory);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <SEO
                title={t(`category.${categoryKey}.title`)}
                description={t(`category.${categoryKey}.desc`)}
            />

            {/* Custom Hero Section */}
            <div className={`relative ${heroColor} text-white py-24 overflow-hidden mb-12`}>
                {/* Background Image / Pattern */}
                <div className={`absolute inset-0 opacity-20 mix-blend-overlay ${heroPattern}`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <Container className="relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 drop-shadow-sm">
                        {t(`category.${categoryKey}.title`)}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                        {t(`category.${categoryKey}.desc`)}
                    </p>
                </Container>
            </div>

            <Container>
                {/* Breadcrumb-ish Link */}
                <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary-600 mb-8 font-medium transition-colors">
                    <ArrowLeft size={18} className="mr-2" /> {t('common.back')}
                </Link>

                {/* Products Grid */}
                {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categoryProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 text-lg">
                            {t('products.noResults')}
                            <br />
                            <span className="text-sm opacity-70">
                                ({t('coops.noProducts')})
                            </span>
                        </p>
                        <Link to="/products" className="mt-4 inline-block text-primary-600 font-medium hover:underline">
                            {t('common.viewAll')}
                        </Link>
                    </div>
                )}
            </Container>
        </div>
    );
};
