import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    name?: string;
    type?: string;
    image?: string;
    url?: string;
}

export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    name = 'Souk Bladna',
    type = 'website',
    image = '/og-image.jpg',
    url = 'https://soukbladna.ma'
}) => {

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Souk Bladna",
        "url": "https://soukbladna.ma",
        "description": "La première marketplace pour les coopératives marocaines.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://soukbladna.ma/products?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title} | {name}</title>
            <meta name='description' content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={`${title} | ${name}`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@soukbladna" />
            <meta name="twitter:title" content={`${title} | ${name}`} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};
