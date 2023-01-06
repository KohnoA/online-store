import { Product } from 'constants/types/types';

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

export const enum Pages {
    main = '',
    cart = '#cart',
    product = '#product-details/',
}
