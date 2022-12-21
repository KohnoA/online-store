import products from '../../../constants/products.json';
import { Product } from 'constants/types/types';
import * as utils from '../../../utils/index';

export function showProductsList(): void {
    const catalogMain = document.querySelector('.catalog__main');
    const productList: Array<Product> = products.products;

    productList.forEach((item) => {
        catalogMain?.append(createProductCard(item));
    });
}

function createProductCard(item: Product): HTMLElement {
    const productItem = utils.createElement('div', 'product');
    const productImage = utils.createElement('img', 'product__image') as HTMLImageElement;
    const productButton = utils.createElement('button', 'product__button');
    const productTitle = utils.createElement('span', 'product__title');

    productImage.src = item.thumbnail;
    productImage.setAttribute('alt', item.title);
    productButton.textContent = 'add to cart';
    productButton.setAttribute('type', 'button');
    productTitle.textContent = item.title;

    productItem.append(productImage);
    productItem.append(productTitle);
    productItem.append(productButton);

    return productItem;
}
