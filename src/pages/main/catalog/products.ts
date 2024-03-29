import products from '../../../constants/products.json';
import { Product, C } from 'constants/types/types';
import * as utils from '../../../utils/index';
import defaultProductImage from '../../../assets/icons/rsschool-logo.svg';
import { sortValues, cartArray } from '../../../constants/data/data';
import { getProductsByValues } from '../../../utils/index';
import { isCheck, calculateFiltersValue } from '../filters/filters';
import { setGridSelection } from './catalog';

export function showProductsList() {
    const catalogMain = document.querySelector('.catalog__main') as HTMLElement;
    const noProductsFound = utils.createElement('p', 'catalog__not-found');
    let productList: Array<Product> = [...products.products];

    catalogMain.innerHTML = '';

    productList = catalogHeaderEvents(productList);

    if (productList.length === 0) {
        noProductsFound.textContent = 'No products found :(';
        catalogMain.append(noProductsFound);
    } else {
        productList.forEach((item) => {
            const productNode = createProductCard(item);

            if (cartArray.some((cartItem) => item.id === cartItem.id)) {
                const productButton = productNode.querySelector('.product__button') as HTMLElement;
                setButtonInCart(productButton);
            }

            catalogMain?.append(productNode);
        });
    }

    catalogMain.addEventListener('click', utils.switchOnProductPage);

    numberOfProductsInCatalog();

    return productList;
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

    if (addProduct) utils.dropOrSetItemInCart(addProduct);

    setButtonInCart(target);
    utils.setSumAndQuantityInCart(document.getElementById('total-cash'), document.getElementById('count-purchases'));

    event.preventDefault();
}

export function numberOfProductsInCatalog(): void {
    const foundProducts = document.querySelector('.catalog__products-int') as HTMLElement;
    const numberOfProducts = document.querySelectorAll('.catalog .product').length;

    foundProducts.textContent = String(numberOfProducts);
}

export function setButtonInCart(element: HTMLElement): void {
    element.classList.toggle('product__button_active');
    if (element.classList.contains('product__button_active')) {
        element.textContent = 'Drop';
    } else {
        element.textContent = 'Add to cart';
    }
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

    if (!searchValue) return originArr;

    searchValue = searchValue.trim().toLowerCase();

    return originArr.filter((item) => {
        for (const key in item) {
            if (!ignoredKeys.includes(key)) {
                const keyValue = String(item[key as C]).toLowerCase();

                if (keyValue.startsWith(searchValue)) return item;
            }
        }
    });
}

function catalogHeaderEvents(arr: Array<Product>) {
    let result = [...arr];
    const objectURL = utils.getURLStringAsObj();

    const searchInput = document.getElementById('search-product') as HTMLInputElement;
    objectURL.search ? (searchInput.value = objectURL.search.join('')) : (searchInput.value = '');

    const selectSortBy = document.querySelector('.catalog__sort-selection') as HTMLSelectElement;
    selectSortBy.selectedIndex = Number(objectURL.sort);

    isCheck(objectURL);
    setGridSelection(objectURL.show);

    result = sortProductsArray(
        getProductsBySearchInput(getProductsByValues(result, objectURL), searchInput.value),
        sortValues[selectSortBy.selectedIndex]
    );

    calculateFiltersValue(result);

    return result;
}
