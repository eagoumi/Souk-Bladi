export interface Cooperative {
    id: string;
    name: string;
    region: string;
    categoryTags: string[];
    story: string;
    rating: number;
    womenLed: boolean;
    logoUrl: string;
    bannerUrl: string;
    productCount: number;
    featured?: boolean;
}

export interface Product {
    id: string;
    coopId: string;
    name: string;
    price: number;
    category: string;
    subcategory: string;
    region: string;
    rating: number;
    images: string[];
    shortDesc: string;
    longDesc: string;
    originInfo: string;
    ingredientsOrMaterials: string[];
    bestSeller: boolean;
    isGiftable: boolean;
    isPromoted?: boolean;
    stock: number;
    discount?: number;
    // Admin Fields
    status?: 'pending' | 'approved' | 'rejected';
    rejectionReason?: string;
}

export interface Collection {
    id: string;
    name: string;
    description: string;
    theme: string;
    imageUrl: string;
    products: string[]; // Product IDs
}

export interface CartItem extends Product {
    quantity: number;
    boxItems?: { product: Product; quantity: number }[];
    bundleName?: string;
    customImage?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    wishlist: string[];
    bio?: string;
    location?: string;
    phone?: string;
    avatar?: string;
    banner?: string;
    verificationStatus?: 'unverified' | 'pending' | 'verified';
}

export interface OrderItem {
    id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

export interface Order {
    id: string;
    customerId: string;
    customerName: string;
    date: string;
    total: number;
    status: 'En cours' | 'Livré' | 'Annulé' | 'Expédié';
    items: OrderItem[];
    shippingAddress: string;
    paymentMethod: string;
}
