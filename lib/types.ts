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
    user: {
        image: string;
        name: string
    }
}

export type ProductType = Pick<ProductDetailsType, 'id' | 'title' | 'price' | 'imageUrl' | 'user'>

export interface AddProductType {
    title: string;
    category: string;
    description: string;
    price: number;
    about: string;
    message: string;
    userEmail: string
}