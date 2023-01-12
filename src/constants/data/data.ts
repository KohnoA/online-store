import { Product, PromoCodes } from 'constants/types/types';

export const sortValues: Array<string> = [
    'default',
    'price ASC',
    'price DESC',
    'rating ASC',
    'rating DESC',
    'dicount ASC',
    'dicount DESC',
];

export const gridValues: Array<string> = ['3', '4'];

export const cartArray: Array<Product> = [];

export const activePromoCodes: Array<string> = [];

export const promoCodes: PromoCodes = {
    RS: 'Rolling Scopes School - 10%',
    EPM: 'EPAM Systems - 10%',
};

export const enum Pages {
    main = '',
    cart = '#cart',
    product = '#product-details/',
}

export const categories = ['category', 'brand', 'price', 'stock', 'sort', 'search', 'show'];

export const enum PaySystems {
    visa = '4',
    mastercard = '5',
    maestro = '6',
}
