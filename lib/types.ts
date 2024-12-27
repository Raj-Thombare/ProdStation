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