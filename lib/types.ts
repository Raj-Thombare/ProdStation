export interface ProductType {
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
    user: UserType;
    productId: number;
    email: any;
}

export interface UserType {
    id: number;
    name: string;
    email: string;
    image: string;
};

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