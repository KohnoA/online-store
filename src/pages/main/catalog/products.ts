import products from '../../../constants/products.json';
import { Product } from 'constants/types/types';
import * as utils from '../../../utils/index';
import defaultProductImage from '../../../assets/icons/rsschool-logo.svg';
import { cartArray } from '../../../constants/data/data';

export function showProductsList(): void {
    const catalogMain = document.querySelector('.catalog__main');
    const productList: Array<Product> = products.products;

    for (const item of productList) {
        const productNode = createProductCard(item);

        catalogMain?.append(productNode);
    }
}

function createProductCard(item: Product): HTMLElement {
    const productItem = utils.createElement('a', 'product');
    const productImage = utils.createElement('div', 'product__image');
    const productButton = utils.createElement('button', 'product__button');
    const productTitle = utils.createElement('span', 'product__title');
    const productPrice = utils.createElement('span', 'product__price');

    setProductImage(productImage, item.thumbnail);
    productButton.textContent = 'add to cart';
    productButton.setAttribute('type', 'button');
    productItem.setAttribute('href', `product-details/${item.id}`);
    productTitle.textContent = item.title;
    productPrice.textContent = `${item.price}€`;

    productItem.append(productImage);
    productItem.append(productTitle);
    productItem.append(productPrice);
    productItem.append(productButton);

    productButton.addEventListener('click', productButtonEvent);

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

function productButtonEvent(event: Event): void {
    const target: EventTarget | null = event.target;
    if (!(target instanceof HTMLElement)) return;

    target.classList.toggle('product__button_active');
    target.textContent = 'In Cart';
    target.setAttribute('disabled', '');

    const targetProductTitle = target.parentElement?.querySelector('.product__title')?.textContent;
    const targetProductPrice = target.previousElementSibling?.textContent?.slice(0, -1) as string;
    const productList: Array<Product> = products.products;
    const addProduct = productList.find((item) => item.title === targetProductTitle);

    if (addProduct) cartArray.push(addProduct);

    setCashAndCartItems(targetProductPrice);

    event.preventDefault();
}

export function setCashAndCartItems(addCash: string): void {
    const totalCashNode = document.getElementById('total-cash') as HTMLElement;
    const currentTotalCash = totalCashNode.textContent as string;
    const result = +currentTotalCash + +addCash;

    (document.getElementById('count-purchases') as HTMLElement).textContent = String(cartArray.length);

    totalCashNode.textContent = String(result);
}