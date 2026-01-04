import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Order } from '../types';

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Order) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
    getOrder: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};

// Mock Data
const mockOrders: Order[] = [
    {
        id: 'CMD-4092',
        customerId: 'u1',
        customerName: 'Fatima Z.',
        date: '2026-01-03',
        total: 450,
        status: 'En cours',
        items: [
            { id: 'i1', productId: 'p1', name: 'Tapis Béni Ouarain', price: 450, quantity: 1, image: 'https://images.unsplash.com/photo-1570701123784-8d9382d715a3?auto=format&fit=crop&q=80&w=800' }
        ],
        shippingAddress: '123 Rue Principale, Casablanca',
        paymentMethod: 'Carte Bancaire'
    },
    {
        id: 'CMD-4091',
        customerId: 'u2',
        customerName: 'Karim B.',
        date: '2026-01-02',
        total: 1200,
        status: 'Livré',
        items: [
            { id: 'i2', productId: 'p2', name: 'Huile d\'Argan Bio', price: 100, quantity: 12, image: 'https://images.unsplash.com/photo-1549488497-6953eb63a017?auto=format&fit=crop&q=80&w=800' }
        ],
        shippingAddress: '45 Av. Mohammed V, Rabat',
        paymentMethod: 'Virement'
    },
    {
        id: 'CMD-4090',
        customerId: 'u3',
        customerName: 'Sophia M.',
        date: '2026-01-02',
        total: 320,
        status: 'Livré',
        items: [
            { id: 'i3', productId: 'p3', name: 'Céramique de Fès', price: 160, quantity: 2, image: 'https://images.unsplash.com/photo-1565193566173-7fae8928d6d8?auto=format&fit=crop&q=80&w=800' }
        ],
        shippingAddress: 'Appt 4, Res. Les Iris, Marrakech',
        paymentMethod: 'Espèces à la livraison'
    },
    {
        id: 'CMD-4089',
        customerId: 'u4',
        customerName: 'Amine K.',
        date: '2026-01-01',
        total: 850,
        status: 'Annulé',
        items: [
            { id: 'i4', productId: 'p4', name: 'Pouf en Cuir', price: 850, quantity: 1, image: 'https://images.unsplash.com/photo-1589830206253-2415d481da67?auto=format&fit=crop&q=80&w=800' }
        ],
        shippingAddress: 'Villa 12, Hay Riad, Rabat',
        paymentMethod: 'Carte Bancaire'
    }
];

interface OrderProviderProps {
    children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : mockOrders;
    });

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    };

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    };

    const getOrder = (orderId: string) => {
        return orders.find(o => o.id === orderId);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
