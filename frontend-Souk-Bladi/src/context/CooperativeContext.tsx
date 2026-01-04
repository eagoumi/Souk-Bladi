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
}

interface CooperativeContextType {
    cooperatives: CooperativeUser[];
    addCooperative: (coop: Omit<CooperativeUser, 'id' | 'joinedDate' | 'productCount'>) => void;
    updateCooperative: (id: string, updates: Partial<CooperativeUser>) => void;
    deleteCooperative: (id: string) => void;
    getCooperative: (id: string) => CooperativeUser | undefined;
}

const CooperativeContext = createContext<CooperativeContextType | undefined>(undefined);

const INITIAL_MOCK_COOPS: CooperativeUser[] = [
    { id: '1', name: 'Coopérative Atlas', email: 'coop@atlas.ma', status: 'verified', joinedDate: '2025-01-10', productCount: 12, bio: 'Tradition et qualité du Moyen Atlas.', location: 'Azrou', phone: '+212 600 000 000', role: 'cooperative' },
    { id: '2', name: 'Argan Bio', email: 'contact@arganbio.ma', status: 'pending', joinedDate: '2026-01-02', productCount: 0, bio: "Production d'huile d'argan bio.", location: 'Agadir', phone: '+212 611 111 111', role: 'cooperative' },
    { id: '3', name: 'Tapis Tradition', email: 'info@tapis.ma', status: 'suspended', joinedDate: '2024-11-15', productCount: 5, bio: 'Tapis faits main.', location: 'Marrakech', phone: '+212 622 222 222', role: 'cooperative' },
];

export const CooperativeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cooperatives, setCooperatives] = useState<CooperativeUser[]>(() => {
        const saved = localStorage.getItem('cooperatives_data');
        return saved ? JSON.parse(saved) : INITIAL_MOCK_COOPS;
    });

    useEffect(() => {
        localStorage.setItem('cooperatives_data', JSON.stringify(cooperatives));
    }, [cooperatives]);

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

    return (
        <CooperativeContext.Provider value={{ cooperatives, addCooperative, updateCooperative, deleteCooperative, getCooperative }}>
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
