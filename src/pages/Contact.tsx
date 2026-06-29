import React, { useState } from 'react';
// Contact page component

import { Container } from '../components/common/Container';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const { t } = useLanguage();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="bg-white pb-20">
            <div className="bg-gray-900 py-16 text-white text-center">
                <Container>
                    <h1 className="text-4xl text-white font-bold mb-4">{t('contact.title')}</h1>
                    <p className="text-gray-300">{t('contact.subtitle')}</p>
                </Container>
            </div>

            <Container className="mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Info */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">{t('contact.stayInTouch')}</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{t('contact.phone')}</h3>
                                    <p className="text-gray-600">+212 5 37 00 00 00</p>
                                    <p className="text-sm text-gray-500">Lun-Ven, 9h-18h</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{t('contact.email')}</h3>
                                    <p className="text-gray-600">contact@soukbladna.ma</p>
                                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary-50 text-primary-600 rounded-lg">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{t('contact.address')}</h3>
                                    <p className="text-gray-600">{t('contact.companyAddress')}</p>
                                    <p className="text-gray-600">{t('contact.companyCity')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-gray-50 p-8 rounded-2xl">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                    <Send size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{t('contact.success.title')}</h3>
                                <p className="text-gray-600">{t('contact.success.desc')}</p>
                                <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>{t('contact.sendAnother')}</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label={t('contact.form.firstName')} required />
                                    <Input label={t('contact.form.lastName')} required />
                                </div>
                                <Input label={t('contact.form.email')} type="email" required />
                                <Input label={t('contact.form.subject')} required />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('contact.form.message')}</label>
                                    <textarea
                                        rows={4}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3"
                                        required
                                    ></textarea>
                                </div>
                                <Button size="lg" fullWidth type="submit">{t('contact.form.submit')}</Button>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
