import products from '../../../constants/products.json';
import { Product } from 'constants/types/types';
import * as utils from '../../../utils/index';
import defaultProductImage from '../../../assets/icons/rsschool-logo.svg';
import { sortValues, cartArray } from '../../../constants/data/data';

export function showProductsList(searchValue?: string, sortBy?: string): void {
    const catalogMain = document.querySelector('.catalog__main') as HTMLElement;
    const noProductsFound = utils.createElement('p', 'catalog__not-found');
    let productList: Array<Product> = [...products.products];

    catalogMain.innerHTML = '';

    if (searchValue) productList = getProductsBySearchInput(productList, searchValue);
    if (sortBy && sortBy !== 'default') productList = sortProductsArray(productList, sortBy);

    if (productList.length === 0) {
        noProductsFound.textContent = 'No products found :(';
        catalogMain.append(noProductsFound);
    } else {
        productList.forEach((item) => {
            const productNode = createProductCard(item);

            if (cartArray.includes(item)) {
                const productButton = productNode.querySelector('.product__button') as HTMLElement;
                setButtonInCart(productButton);
            }

            catalogMain?.append(productNode);
        });
    }

    catalogMain.addEventListener('click', utils.switchOnProductPage);

    numberOfProductsInCatalog();
}

function createProductCard(item: Product): HTMLElement {
    const productItem = utils.createElement('a', 'product');
    const productImage = utils.createElement('div', 'product__image');
    const productButton = utils.createElement('button', 'product__button');
    const productTitle = utils.createElement('span', 'product__title');
    const productDiscountNode = utils.createElement('div', 'product__discount');
    const productId = utils.createElement('span', 'product__id');
    const roundedDiscount = Math.round(item.discountPercentage);
    const productPrice = createProductPrice(item.price, item.discountPercentage);

    setProductImage(productImage, item.thumbnail);
    productButton.textContent = 'add to cart';
    productButton.setAttribute('type', 'button');
    productItem.setAttribute('href', `/`);
    productTitle.textContent = item.title;
    productDiscountNode.textContent = `-${roundedDiscount}%`;
    productId.textContent = `${item.id}`;

    productItem.append(productId, productImage, productTitle, productPrice, productButton, productDiscountNode);

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

    productPrice.append(productCurrentPrice, ' / ', productPriceWithoutDiscount);

    return productPrice;
}

export function setProductImage(product: HTMLElement, url: string): void {
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
    const productList: Array<Product> = products.products;
    const addProduct = productList.find((item) => item.title === targetProductTitle);

    if (addProduct) cartArray.push(addProduct);

    setButtonInCart(target);
    setCashAndCartItems();

    event.preventDefault();
}

export function setCashAndCartItems(): void {
    const totalCashInCart = document.getElementById('total-cash') as HTMLElement;
    const countItemsInCart = document.getElementById('count-purchases') as HTMLElement;

    countItemsInCart.textContent = String(
        cartArray.reduce((acc, next) => {
            if (next.count) return acc + next.count;
            else return acc + 1;
        }, 0)
    );
    totalCashInCart.textContent = String(
        cartArray.reduce((acc, next) => {
            if (next.count) return acc + next.price * next.count;
            else return acc + next.price;
        }, 0)
    );
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

function sortProductsArray(originArr: Array<Product>, sortBy: string): Array<Product> {
    if (sortBy === sortValues[1]) originArr.sort((a, b) => a.price - b.price);
    else if (sortBy === sortValues[2]) originArr.sort((a, b) => b.price - a.price);
    else if (sortBy === sortValues[3]) originArr.sort((a, b) => a.rating - b.rating);
    else if (sortBy === sortValues[4]) originArr.sort((a, b) => b.rating - a.rating);
    else if (sortBy === sortValues[5]) originArr.sort((a, b) => a.discountPercentage - b.discountPercentage);
    else if (sortBy === sortValues[6]) originArr.sort((a, b) => b.discountPercentage - a.discountPercentage);

    return originArr;
}

function getProductsBySearchInput(originArr: Array<Product>, searchValue: string): Array<Product> {
    const ignoredKeys = ['id', 'thumbnail', 'images'];
    searchValue = searchValue.trim().toLowerCase();

    return originArr.filter((item) => {
        for (const key in item) {
            if (!ignoredKeys.includes(key)) {
                const keyValue = String(item[key]).toLowerCase();

                if (keyValue.startsWith(searchValue)) return item;
            }
        }
    });
}
