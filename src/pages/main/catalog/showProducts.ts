import products from '../../../constants/products.json';
import { Product } from 'constants/types/types';
import * as utils from '../../../utils/index';
import defaultProductImage from '../../../assets/icons/rsschool-logo.svg';

//этой функции можно добавить аргумент фильтра
export async function showProductsList(): Promise<void> {
    const catalogMain = document.querySelector('.catalog__main');
    const productList: Array<Product> = products.products;
    // const response = await fetch('https://dummyjson.com/products?limit=100');
    // const json = await response.json();
    // const productList = json.products;

    for (const item of productList) {
        const productNode = createProductCard(item);

        catalogMain?.append(productNode);
    }
}

function createProductCard(item: Product): HTMLElement {
    const productItem = utils.createElement('div', 'product');
    const productImage = utils.createElement('div', 'product__image');
    const productButton = utils.createElement('button', 'product__button');
    const productTitle = utils.createElement('span', 'product__title');
    const productPrice = utils.createElement('span', 'product__price');

    setProductImage(productImage, item.thumbnail);
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

function setProductImage(product: HTMLElement, url: string): void {
    const img = new Image();

    product.style.backgroundImage = `url('${defaultProductImage}')`;
    img.src = url;

    img.onload = () => {
        product.style.backgroundImage = `url('${img.src}')`;
    };

    img.onerror = () => {
        product.style.backgroundImage = `url('${defaultProductImage}')`;
    };
}
