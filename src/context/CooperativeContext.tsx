import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface CooperativeUser {
    id: string;
    name: string;
    email: string;
    status: 'verified' | 'pending' | 'suspended' | 'blacklisted';
    joinedDate: string;
    productCount: number;
    bio?: string;
    location?: string;
    phone?: string;
    avatar?: string;
    role?: 'admin' | 'manager' | 'super_admin' | 'cooperative' | 'buyer';
    bannerUrl?: string;
    logoUrl?: string;
    region?: string;
    rating?: number;
    story?: string;
    womenLed?: boolean;
    categoryTags?: string[];
    tier?: 'discovery' | 'verified' | 'premium';
}

interface CooperativeContextType {
    cooperatives: CooperativeUser[];
    addCooperative: (coop: Omit<CooperativeUser, 'id' | 'joinedDate' | 'productCount'>) => void;
    updateCooperative: (id: string, updates: Partial<CooperativeUser>) => void;
    deleteCooperative: (id: string) => void;
    getCooperative: (id: string) => CooperativeUser | undefined;
    followedCoops: string[];
    followCooperative: (id: string) => void;
    unfollowCooperative: (id: string) => void;
    isFollowed: (id: string) => boolean;
}

const CooperativeContext = createContext<CooperativeContextType | undefined>(undefined);

const INITIAL_MOCK_COOPS: CooperativeUser[] = [
    {
        id: '1',
        name: 'Coopérative Yacout',
        email: 'contact@coopyacout.ma',
        status: 'verified',
        tier: 'premium',
        joinedDate: '2024-06-15',
        productCount: 45,
        bio: "Spécialisée dans la production d'huile d'argan et de produits cosmétiques naturels.",
        location: 'Souss-Massa',
        phone: '+212 600 000 000',
        role: 'cooperative',
        logoUrl: '/imgs/Logo.png'
    },
    {
        id: '2',
        name: 'Atlas Bio Terroir',
        email: 'info@atlasbio.ma',
        status: 'verified',
        tier: 'verified',
        joinedDate: '2025-02-10',
        productCount: 30,
        bio: "Miels rares et huiles d'olive d'exception du Moyen Atlas.",
        location: 'Moyen Atlas',
        phone: '+212 611 111 111',
        role: 'cooperative',
        logoUrl: '/imgs/cooperative-yacout-agriculture-biologique-150x150-1.png'
    },
    {
        id: '3',
        name: 'Artisanat Authentic',
        email: 'salam@artisanat.ma',
        status: 'verified',
        tier: 'discovery',
        joinedDate: '2025-01-20',
        productCount: 28,
        bio: "Tapis, textiles et objets de décoration uniques faits main.",
        location: 'Marrakech-Safi',
        phone: '+212 622 222 222',
        role: 'cooperative',
        logoUrl: '/imgs/Capture-decran-2023-08-01-a-21.32.03-150x150.png'
    },
    {
        id: '4',
        name: 'Coopérative Toubkal',
        email: 'toubkal@coop.ma',
        status: 'verified',
        tier: 'verified',
        joinedDate: '2025-03-01',
        productCount: 12,
        bio: "Tissage traditionnel de tapis berbères et couvertures.",
        location: 'Haut Atlas',
        phone: '+212 633 333 333',
        role: 'cooperative',
        logoUrl: '/imgs/kenza-and-co-beni-ourain-wool-berber-rug-teppich-uuldtaeppe.webp'
    },
    {
        id: '5',
        name: 'Coopérative Rosa Bio',
        email: 'rosa@bio.ma',
        status: 'verified',
        tier: 'premium',
        joinedDate: '2024-12-05',
        productCount: 8,
        bio: "Eaux florales et cosmétiques à la rose de Damas.",
        location: 'Kalaat M\'gouna',
        phone: '+212 644 444 444',
        role: 'cooperative',
        logoUrl: '/imgs/PARFUM-DIFUSEUR-ROSE-KALAAT-MGOUNA-KALAA-GOUNA-TRADITIONNELLE-FLEUR-DORANGER-COOPERATIVE-YACOUT-SENTEUR-PARFUM-JAUNE-ROUGE-MAROC-PRODUIT-MAROCAIN-MADE-IN-MOROCCO.png'
    },
    {
        id: '6',
        name: 'Oasis Dattes',
        email: 'dates@oasis.ma',
        status: 'verified',
        tier: 'discovery',
        joinedDate: '2025-02-28',
        productCount: 5,
        bio: "Dattes Majhoul de première qualité.",
        location: 'Errachidia',
        phone: '+212 655 555 555',
        role: 'cooperative',
        logoUrl: '/imgs/bien-e_tre-banner.jpg'
    },
    {
        id: '7',
        name: 'Argan Souss',
        email: 'argan@souss.ma',
        status: 'verified',
        tier: 'verified',
        joinedDate: '2024-10-10',
        productCount: 15,
        bio: "Huile d'argan certifiée IGP par les femmes rurales.",
        location: 'Taroudant',
        phone: '+212 666 666 666',
        role: 'cooperative',
        logoUrl: '/imgs/HUILE D\'ARGAN .jpg'
    },
    {
        id: '8',
        name: 'Femmes du Rif',
        email: 'rif@art.ma',
        status: 'verified',
        tier: 'verified',
        joinedDate: '2025-01-15',
        productCount: 10,
        bio: "Poterie traditionnelle et tissages du Nord.",
        location: 'Chefchaouen',
        phone: '+212 677 777 777',
        role: 'cooperative',
        logoUrl: '/imgs/DSC_0843-300x300.jpg'
    },
];

export const CooperativeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cooperatives, setCooperatives] = useState<CooperativeUser[]>(() => {
        const saved = localStorage.getItem('cooperatives_data');
        return saved ? JSON.parse(saved) : INITIAL_MOCK_COOPS;
    });

    const [followedCoops, setFollowedCoops] = useState<string[]>(() => {
        const saved = localStorage.getItem('followed_coops');
        return saved ? JSON.parse(saved) : ['1', '2']; // Default mock followed coops
    });

    useEffect(() => {
        localStorage.setItem('cooperatives_data', JSON.stringify(cooperatives));
    }, [cooperatives]);

    useEffect(() => {
        localStorage.setItem('followed_coops', JSON.stringify(followedCoops));
    }, [followedCoops]);

    const addCooperative = (coopData: Omit<CooperativeUser, 'id' | 'joinedDate' | 'productCount'>) => {
        const newCoop: CooperativeUser = {
            ...coopData,
            id: Date.now().toString(),
            joinedDate: new Date().toISOString().split('T')[0],
            productCount: 0,
            status: coopData.status || 'pending', // Default to pending if not specified
            role: coopData.role || 'cooperative' // Default to cooperative
        };
        setCooperatives(prev => [...prev, newCoop]);
    };

    const updateCooperative = (id: string, updates: Partial<CooperativeUser>) => {
        setCooperatives(prev => prev.map(coop => coop.id === id ? { ...coop, ...updates } : coop));
    };

    const deleteCooperative = (id: string) => {
        setCooperatives(prev => prev.filter(coop => coop.id !== id));
    };

    const getCooperative = (id: string) => {
        return cooperatives.find(c => c.id === id);
    };

    const followCooperative = (id: string) => {
        setFollowedCoops(prev => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
        });
    };

    const unfollowCooperative = (id: string) => {
        setFollowedCoops(prev => prev.filter(coopId => coopId !== id));
    };

    const isFollowed = (id: string) => followedCoops.includes(id);

    return (
        <CooperativeContext.Provider value={{
            cooperatives,
            addCooperative,
            updateCooperative,
            deleteCooperative,
            getCooperative,
            followedCoops,
            followCooperative,
            unfollowCooperative,
            isFollowed
        }}>
            {children}
        </CooperativeContext.Provider>
    );
};

export const useCooperatives = () => {
    const context = useContext(CooperativeContext);
    if (context === undefined) {
        throw new Error('useCooperatives must be used within a CooperativeProvider');
    }
    return context;
};
