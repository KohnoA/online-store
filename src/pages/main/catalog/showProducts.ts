import products from '../../../constants/products.json';
import { Product } from 'constants/types/types';
import * as utils from '../../../utils/index';
import defaultProductImage from '../../../assets/icons/rsschool-logo.svg';

//этой функции можно добавить аргумент фильтра
export function showProductsList(): void {
    const catalogMain = document.querySelector('.catalog__main');
    const productList: Array<Product> = products.products;

    for (const item of productList) {
        const productNode = createProductCard(item);

        catalogMain?.append(productNode);
    }
}

function createProductCard(item: Product): HTMLElement {
    const productItem = utils.createElement('div', 'product');
    const productImage = utils.createElement('img', 'product__image') as HTMLImageElement;
    const productButton = utils.createElement('button', 'product__button');
    const productTitle = utils.createElement('span', 'product__title');
    const productPrice = utils.createElement('span', 'product__price');
    const urlImage: string = item.thumbnail;

    productImage.src = defaultProductImage;

    productImage.onload = () => {
        productImage.src = urlImage;
    };

    productImage.onerror = () => {
        productImage.src = defaultProductImage;
    };

    productImage.setAttribute('alt', item.title);
    productButton.textContent = 'add to cart';
    productButton.setAttribute('type', 'button');
    productTitle.textContent = item.title;
    productPrice.textContent = `${item.price}€`;

    productItem.append(productImage);
    productItem.append(productTitle);
    productItem.append(productPrice);
    productItem.append(productButton);

    return productItem;
}
