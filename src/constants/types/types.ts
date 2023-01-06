export interface Product {
    brand: string;
    category: string;
    description: string;
    discountPercentage: number;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
    count?: number;
}

export type ArgsDecInc = [HTMLElement, HTMLElement, HTMLElement, Product, number];

export type ArgsCreateNumberControl = [number, number, number, HTMLElement, number | undefined];
