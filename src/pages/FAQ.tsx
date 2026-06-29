import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

export const FAQ: React.FC = () => {
    const { t } = useLanguage();

    const categories = [
        {
            title: t('faq.cat.orders'),
            questions: [
                { q: 'faq.q.track.title', a: 'faq.q.track.desc' },
                { q: 'faq.q.payment.title', a: 'faq.q.payment.desc' },
            ]
        },
        {
            title: t('faq.cat.products'),
            questions: [
                { q: 'faq.q.origin.title', a: 'faq.q.origin.desc' },
            ]
        },
        // We can add more mock Q&As here if needed, reused keys for brevity
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <SEO title={t('faq.page.title')} description={t('faq.page.subtitle')} />

            {/* Header */}
            <div className="bg-white border-b border-gray-100 py-16 mb-12">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary-600">
                            <HelpCircle size={32} />
                        </div>
                        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">{t('faq.page.title')}</h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t('faq.page.subtitle')}</p>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="max-w-3xl mx-auto space-y-8">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">{cat.title}</h2>
                            <div className="space-y-4">
                                {cat.questions.map((item, qIdx) => (
                                    <AccordionItem key={qIdx} question={t(item.q)} answer={t(item.a)} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-200 bg-gray-50/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-white transition-colors"
            >
                <span>{question}</span>
                {isOpen ? <ChevronUp size={20} className="text-primary-600" /> : <ChevronDown size={20} className="text-gray-400" />}
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-4 pt-0 text-gray-600 text-sm leading-relaxed bg-white border-t border-gray-100">
                    {answer}
                </div>
            </div>
        </div>
    );
};
