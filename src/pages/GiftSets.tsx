import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../components/common/Container';
import { collections } from '../data/mockData';
import { Button } from '../components/common/Button';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/common/SEO';
import { FadeIn, SlideUp } from '../components/common/Motion';
import { useToast } from '../context/ToastContext';
import { FixedBox } from '../components/domain/FixedBox';

export const GiftSets: React.FC = () => {
    const { products } = useProducts();
    const { addToCart } = useCart();
    const { t } = useLanguage();
    const { success } = useToast();
    const [addingCollection, setAddingCollection] = useState<string | null>(null);

    const getCollectionProducts = (collectionId: string) => {
        const collection = collections.find(c => c.id === collectionId);
        if (!collection) return [];
        // Filter products that are in the collection's product ID list
        return products.filter(p => collection.products.includes(p.id));
    };

    const handleAddBundle = (collectionId: string) => {
        setAddingCollection(collectionId);
        const collection = collections.find(c => c.id === collectionId);
        const collectionProducts = getCollectionProducts(collectionId);

        setTimeout(() => {
            if (collection && collectionProducts.length > 0) {
                // Logic: Use first product as 'main' and others as boxItems
                const mainProduct = collectionProducts[0];
                const otherProducts = collectionProducts.slice(1).map(p => ({ product: p, quantity: 1 }));

                // Add the bundle to cart
                addToCart(mainProduct, 1, otherProducts, collection.name);

                success(`Le coffret "${collection.name}" a été ajouté au panier !`);
            }
            setAddingCollection(null);
        }, 800);
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO title={t('giftsets.seo.title')} description={t('giftsets.seo.desc')} />

            {/* Hero */}
            <FadeIn className="bg-gray-900 text-white py-24 mb-16 relative overflow-hidden" duration={0.8}>
                <img
                    src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2000&auto=format&fit=crop"
                    alt="Gift Sets"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <Container className="relative z-10 text-center">
                    <SlideUp delay={0.2}>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display tracking-tight">{t('giftsets.hero.title')}</h1>
                    </SlideUp>
                    <SlideUp delay={0.4}>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
                            {t('giftsets.hero.subtitle')}
                        </p>
                    </SlideUp>
                </Container>
            </FadeIn>

            <Container className="space-y-16">
                {collections.map((collection) => {
                    const collectionProducts = getCollectionProducts(collection.id);
                    const isAdding = addingCollection === collection.id;

                    return (
                        <div key={collection.id}>
                            <FixedBox
                                collection={collection}
                                products={collectionProducts}
                                onAdd={() => handleAddBundle(collection.id)}
                                isAdding={isAdding}
                            />
                        </div>
                    );
                })}

                {/* Custom Box Builder CTA */}
                <FadeIn viewport={{ once: true }}>
                    <div className="relative bg-secondary rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden group">
                        {/* Decorative rings */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-100 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50 group-hover:opacity-70 transition-opacity"></div>

                        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-display">{t('giftsets.custom.title')}</h2>
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                {t('giftsets.custom.desc')}
                            </p>
                            <Link to="/custom-box" className="inline-block">
                                <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 h-auto text-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                                    {t('giftsets.custom.cta')} <ArrowRight size={20} className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </Container>
        </div>
    );
};
