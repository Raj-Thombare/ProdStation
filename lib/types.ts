export interface ProductType {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    user: {
        image: string;
        name: string
    }
}

export interface ProductData {
    title: string;
    category: string;
    description: string;
    price: number;
    about: string;
    message: string;
    userEmail: string
}