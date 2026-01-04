import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'guest' | 'buyer' | 'cooperative' | 'manager' | 'admin' | 'super_admin';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    bio?: string;
    location?: string;
    phone?: string;
    verificationStatus?: 'unverified' | 'pending' | 'verified';
    banner?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    updateProfile: (data: Partial<User>) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const MOCK_USERS: Record<string, User> = {
    'admin@souk.ma': {
        id: '1',
        email: 'admin@souk.ma',
        name: 'Super Admin',
        role: 'super_admin',
        avatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=000000&color=fff',
        verificationStatus: 'verified',
        location: 'Casablanca, Maroc',
        bio: 'Super Administrateur avec accès complet.'
    },
    'manager@souk.ma': {
        id: '10',
        email: 'manager@souk.ma',
        name: 'Manager User',
        role: 'manager',
        avatar: 'https://ui-avatars.com/api/?name=Manager+User&background=6366f1&color=fff',
        verificationStatus: 'verified',
        location: 'Rabat, Maroc',
        bio: 'Gestionnaire de plateforme (Pas de boutique).'
    },
    'coop@souk.ma': {
        id: '2',
        email: 'coop@souk.ma',
        name: 'Coopérative Atlas',
        role: 'cooperative',
        avatar: 'https://ui-avatars.com/api/?name=Coop+Atlas&background=10B981&color=fff',
        verificationStatus: 'verified',
        location: 'Azrou, Moyen Atlas',
        bio: 'Nous sommes une coopérative de femmes passionnées par le tissage traditionnel de tapis berbères.',
        phone: '+212 6 00 00 00 00'
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem('souk_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, _password: string) => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        let loggedInUser: User;

        if (MOCK_USERS[email]) {
            loggedInUser = MOCK_USERS[email];
        } else {
            // Default to buyer for any other email
            loggedInUser = {
                id: Math.random().toString(36).substr(2, 9),
                email,
                name: email.split('@')[0],
                role: 'buyer',
                avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
                verificationStatus: 'unverified'
            };
        }

        setUser(loggedInUser);
        localStorage.setItem('souk_user', JSON.stringify(loggedInUser));
        setLoading(false);
    };

    const register = async (data: any) => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
            role: data.role || 'buyer',
            avatar: `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}&background=random`,
            verificationStatus: 'unverified'
        };

        setUser(newUser);
        localStorage.setItem('souk_user', JSON.stringify(newUser));
        setLoading(false);
    };

    const updateProfile = (data: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('souk_user', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('souk_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            register,
            updateProfile,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
