export interface ProductType {
    id: number;
    name: string;
    price: number;
    image: string;
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