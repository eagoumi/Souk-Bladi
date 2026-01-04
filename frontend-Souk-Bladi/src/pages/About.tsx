import { Container } from '../components/common/Container';
import { ShieldCheck, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="bg-white pb-20">
            <div className="bg-orange-50 py-20 text-center">
                <Container>
                    <h1 className="text-4xl font-bold mb-6">{t('about.mission.title')}</h1>
                    <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
                        {t('about.mission.desc')}
                    </p>
                </Container>
            </div>

            <Container className="mt-16 space-y-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">{t('about.support.title')}</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {t('about.support.desc1')}
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            {t('about.support.desc2')}
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-80">
                        <img src="https://images.unsplash.com/photo-1596436534275-d84128b14e5a?q=80&w=1000&auto=format&fit=crop" alt="Femmes coopérative" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-gray-100">
                    <div className="text-center p-6">
                        <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t('about.transparency.title')}</h3>
                        <p className="text-gray-500">{t('about.transparency.desc')}</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t('about.quality.title')}</h3>
                        <p className="text-gray-500">{t('about.quality.desc')}</p>
                    </div>
                    <div className="text-center p-6">
                        <div className="mx-auto w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{t('about.ambition.title')}</h3>
                        <p className="text-gray-500">{t('about.ambition.desc')}</p>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-8">{t('about.selection.title')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                        {[
                            { step: '1', title: t('about.steps.1.title'), desc: t('about.steps.1.desc') },
                            { step: '2', title: t('about.steps.2.title'), desc: t('about.steps.2.desc') },
                            { step: '3', title: t('about.steps.3.title'), desc: t('about.steps.3.desc') },
                            { step: '4', title: t('about.steps.4.title'), desc: t('about.steps.4.desc') },
                        ].map((item) => (
                            <div key={item.step} className="bg-gray-50 p-6 rounded-xl relative overflow-hidden">
                                <span className="text-6xl font-black text-gray-200 absolute -top-4 -right-4">{item.step}</span>
                                <h4 className="font-bold text-lg mb-2 relative z-10">{item.title}</h4>
                                <p className="text-sm text-gray-600 relative z-10">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};
