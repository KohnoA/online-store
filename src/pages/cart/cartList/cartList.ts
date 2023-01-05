import './cartList.scss';
import * as utils from '../../../utils/index';
import { cartArray } from '../../../constants/data/data';
import { Product } from 'constants/types/types';
import { setProductImage } from '../../main/catalog/products';

export function createCartList(): HTMLElement {
    const cartList = utils.createElement('section', 'in-cart');
    const headerList = createHeaderCartList();
    const mainList = createMainCartList();

    cartList.append(headerList, mainList);

    mainList.addEventListener('click', utils.switchOnProductPage);

    return cartList;
}

function createHeaderCartList(): HTMLElement {
    const headerList = utils.createElement('div', 'in-cart__header');
    const title = utils.createElement('h2', 'in-cart__title');
    const limit = utils.createElement('label', 'in-cart__limit');
    const limitInput = utils.createElement('input', 'in-cart__limit-input') as HTMLInputElement;
    const pages = utils.createElement('div', 'in-cart__pages');
    const pagePrev = utils.createElement('button', 'in-cart__page-prev');
    const pageNext = utils.createElement('button', 'in-cart__page-next');
    const currentPage = utils.createElement('span', 'in-cart__current-page');

    title.textContent = 'Products In Cart';
    limit.textContent = 'Limit:';
    limitInput.setAttribute('type', 'number');
    limitInput.id = 'limit-input';
    limitInput.value = '1';
    pages.textContent = 'Page: ';
    currentPage.textContent = '1';
    currentPage.id = 'current-page-cart';
    pagePrev.setAttribute('type', 'button');
    pageNext.setAttribute('type', 'button');

    pages.append(pagePrev, currentPage, pageNext);
    limit.append(limitInput);
    headerList.append(title, limit, pages);

    return headerList;
}

function createMainCartList(): HTMLElement {
    const mainList = utils.createElement('div', 'in-cart__main');
    cartArray.forEach((item, index) => {
        mainList.append(createProductCard(item, index, item.id));
    });

    return mainList;
}

function createProductCard(item: Product, index: number, itemId: number): HTMLElement {
    const card = utils.createElement('a', 'cart-product', 'product');
    const productNumber = utils.createElement('div', 'cart-product__number');
    const productImage = utils.createElement('div', 'cart-product__image');
    const productInfo = createProductCartInfo(item.title, item.description, item.rating, item.discountPercentage);
    const numberControl = createProductCartNumberControl(item.stock, item.price);
    const productId = utils.createElement('span', 'product__id');

    productNumber.textContent = `${index + 1}`;
    setProductImage(productImage, item.thumbnail);
    productId.textContent = `${itemId}`;

    card.append(productId, productNumber, productImage, productInfo, numberControl);

    return card;
}

function createProductCartInfo(title: string, desc: string, rating: number, discount: number): HTMLElement {
    const productInfo = utils.createElement('div', 'cart-product__info');
    const productTitle = utils.createElement('p', 'cart-product__title');
    const productDescription = utils.createElement('p', 'cart-product__description');
    const ratingDiscountWrapper = utils.createElement('div', 'cart-product__wrapper');
    const productRating = utils.createElement('span', 'cart-product__rating');
    const productDiscount = utils.createElement('span', 'cart-product__discount');

    productTitle.textContent = title;
    productDescription.textContent = desc;
    productRating.textContent = `Rating: ${rating}`;
    productDiscount.textContent = `Discount: -${discount}%`;

    ratingDiscountWrapper.append(productRating, productDiscount);
    productInfo.append(productTitle, productDescription, ratingDiscountWrapper);

    return productInfo;
}

function createProductCartNumberControl(stock: number, price: number): HTMLElement {
    const numberControl = utils.createElement('div', 'cart-product__number-control');
    const productStock = utils.createElement('p', 'cart-product__stock');
    const productPrice = utils.createElement('p', 'cart-product__price');
    const controls = utils.createElement('div', 'number-controls');
    const count = utils.createElement('span', 'number-controls__count');
    const dec = utils.createElement('button', 'number-controls__dec');
    const inc = utils.createElement('button', 'number-controls__inc');

    productStock.textContent = `Stock: ${stock}`;
    productPrice.textContent = `${price}€`;
    count.textContent = '1';
    dec.textContent = '+';
    dec.setAttribute('type', 'button');
    inc.textContent = '-';
    inc.setAttribute('type', 'button');

    const decIncInstance = decIncNumberOfProduct(price);
    controls.addEventListener('click', decIncInstance);

    controls.append(dec, count, inc);
    numberControl.append(productStock, controls, productPrice);

    return numberControl;
}

function decIncNumberOfProduct(originPrice: number): (event: Event) => void {
    return (event: Event) => {
        if (event.target && event.target instanceof HTMLElement) {
            const target = event.target;
            const countNode = target.parentElement?.querySelector('.number-controls__count') as HTMLElement;
            const priceNode = target.parentElement?.nextElementSibling as HTMLElement;

            if (target.closest('.number-controls__dec')) decEvent(countNode, priceNode, target, originPrice);
            else if (target.closest('.number-controls__inc')) incEvent(countNode, priceNode, originPrice);
        }
    };
}

function decEvent(countNode: HTMLElement, priceNode: HTMLElement, targetElem: HTMLElement, originPrice: number): void {
    const stockNode = targetElem.parentElement?.previousElementSibling as HTMLElement;
    const stockNum = Number(stockNode.textContent?.slice(-2));
    const resultCount = Number(countNode.textContent) + 1;

    if (resultCount > stockNum) return;

    priceNode.textContent = `${originPrice * resultCount}€`;
    countNode.textContent = String(resultCount);
}

function incEvent(countNode: HTMLElement, priceNode: HTMLElement, originPrice: number): void {
    const resultCount = Number(countNode.textContent) - 1;
    const currentPrice = Number(priceNode.textContent?.slice(0, -1));

    if (resultCount < 1) return;

    priceNode.textContent = `${currentPrice - originPrice}€`;
    countNode.textContent = String(resultCount);
}
