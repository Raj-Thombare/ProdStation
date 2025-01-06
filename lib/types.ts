export interface ProductDetailsType {
    id: number;
    title: string;
    price: number;
    fileUrl: string;
    about: string;
    createdBy: string;
    category: string;
    description: string;
    imageUrl: string;
    message: string;
    user: User;
    productId: number;
    email: any;
}

export interface User {
    image: string;
    name: string
}

export type ProductType = Pick<ProductDetailsType, 'id' | 'title' | 'price' | 'imageUrl' | 'user' | 'category' | 'productId' | 'email' | 'description' | 'purchase'>

export interface AddProductType {
    title: string;
    category: string;
    description: string;
    price: number;
    about: string;
    message: string;
    userEmail: string
}

export interface OrderType {
    id: number,
    title: string,
    price: number,
    description?: string,
    about?: string,
    category: string,
    imageUrl: string,
    fileUrl?: string,
    message?: string,
    createdBy: string,
    email: any,
    productId: number,
    amount: number;
}