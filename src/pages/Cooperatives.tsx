import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Container } from '../components/common/Container';
import { CooperativeCard } from '../components/domain/CooperativeCard';
import { cooperatives } from '../data/mockData';

import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';


export const Cooperatives: React.FC = () => {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [regionFilter, setRegionFilter] = useState('');

    const regions = Array.from(new Set(cooperatives.map(c => c.region)));

    const filteredCoops = cooperatives.filter(coop => {
        const matchesSearch = coop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coop.story.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRegion = !regionFilter || coop.region === regionFilter;
        return matchesSearch && matchesRegion;
    });

    return (
        <div className="bg-white min-h-screen pb-20">
            <SEO
                title={t('coops.title')}
                description={t('coops.subtitle')}
            />
            <div className="bg-orange-50 py-12 mb-12">
                <Container className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900">{t('coops.title')}</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        {t('coops.subtitle')}
                    </p>
                </Container>
            </div>

            <Container>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder={t('coops.search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>

                    <select
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                        className="w-full md:w-64 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm bg-white"
                    >
                        <option value="">{t('coops.allRegions')}</option>
                        {regions.map(r => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                {/* Grid */}
                {filteredCoops.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCoops.map(coop => (
                            <CooperativeCard key={coop.id} cooperative={coop} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-900 font-medium">{t('coops.none')}</h3>
                    </div>
                )}
            </Container>
        </div>
    );
};
