import products from '../../../constants/products.json';
import { Product } from 'constants/types/types';
import * as utils from '../../../utils/index';
import defaultProductImage from '../../../assets/icons/rsschool-logo.svg';
import { cartArray } from '../../../constants/data/data';

export function showProductsList(inputValue?: string): void {
    const catalogMain = document.querySelector('.catalog__main') as HTMLElement;
    let productList: Array<Product> = products.products;

    catalogMain.innerHTML = '';

    if (inputValue) {
        productList = productList.filter((item) => {
            const productTitle = item.title.toLowerCase();
            const value = inputValue.toLowerCase();

            return productTitle.startsWith(value);
        });
    }

    for (const item of productList) {
        const productNode = createProductCard(item);

        if (cartArray.includes(item)) {
            const productButton = productNode.querySelector('.product__button') as HTMLElement;
            setButtonInCart(productButton);
        }

        catalogMain?.append(productNode);
    }

    numberOfProductsInCatalog();
}

function createProductCard(item: Product): HTMLElement {
    const productItem = utils.createElement('a', 'product');
    const productImage = utils.createElement('div', 'product__image');
    const productButton = utils.createElement('button', 'product__button');
    const productTitle = utils.createElement('span', 'product__title');
    const productDiscountNode = utils.createElement('div', 'product__discount');
    const roundedDiscount = Math.round(item.discountPercentage);
    const productPrice = createProductPrice(item.price, item.discountPercentage);

    setProductImage(productImage, item.thumbnail);
    productButton.textContent = 'add to cart';
    productButton.setAttribute('type', 'button');
    productItem.setAttribute('href', `product-details/${item.id}`);
    productTitle.textContent = item.title;
    productDiscountNode.textContent = `-${roundedDiscount}%`;

    productItem.append(productImage);
    productItem.append(productTitle);
    productItem.append(productPrice);
    productItem.append(productButton);
    productItem.append(productDiscountNode);

    productButton.addEventListener('click', productButtonEvent);

    return productItem;
}

function createProductPrice(price: number, discount: number): HTMLElement {
    const productPrice = utils.createElement('p', 'product__price');
    const productCurrentPrice = utils.createElement('span', 'product__current-price');
    const productPriceWithoutDiscount = utils.createElement('span', 'product__price-without-discount');
    const priceWithoutDiscount = price + Math.round((price / 100) * discount);

    productCurrentPrice.textContent = `${price}€`;
    productPriceWithoutDiscount.textContent = `${priceWithoutDiscount}€`;

    productPrice.append(productCurrentPrice);
    productPrice.append(' / ');
    productPrice.append(productPriceWithoutDiscount);

    return productPrice;
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

    const targetProductTitle = target.parentElement?.querySelector('.product__title')?.textContent;
    const targetProductPrice = target.parentElement
        ?.querySelector('.product__current-price')
        ?.textContent?.slice(0, -1) as string;
    const productList: Array<Product> = products.products;
    const addProduct = productList.find((item) => item.title === targetProductTitle);

    if (addProduct) cartArray.push(addProduct);

    setButtonInCart(target);
    setCashAndCartItems(targetProductPrice);

    event.preventDefault();
}

export function setCashAndCartItems(addCash: string): void {
    const totalCashNode = document.getElementById('total-cash') as HTMLElement;
    const cartItems = document.getElementById('count-purchases') as HTMLElement;
    const currentTotalCash = totalCashNode.textContent as string;
    const result = +currentTotalCash + +addCash;

    cartItems.textContent = String(cartArray.length);

    totalCashNode.textContent = String(result);
}

export function numberOfProductsInCatalog(): void {
    const foundProducts = document.querySelector('.catalog__products-int') as HTMLElement;
    const numberOfProducts = document.querySelectorAll('.catalog .product').length;

    foundProducts.textContent = String(numberOfProducts);
}

function setButtonInCart(element: HTMLElement): void {
    element.classList.toggle('product__button_active');
    element.textContent = 'In Cart';
    element.setAttribute('disabled', '');
}
