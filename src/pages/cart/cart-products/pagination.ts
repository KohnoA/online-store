import * as utils from '../../../utils/index';
import { cartArray } from '../../../constants/data/data';
import { createCartProducts } from './cart-products';

export function createCartPagination(): HTMLElement {
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
    limitInput.value = '3';
    limitInput.min = '1';
    limitInput.max = String(cartArray.length);
    pages.textContent = 'Page: ';
    currentPage.textContent = '1';
    currentPage.id = 'current-page-cart';
    pagePrev.setAttribute('type', 'button');
    pageNext.setAttribute('type', 'button');

    pages.append(pagePrev, currentPage, pageNext);
    limit.append(limitInput);
    headerList.append(title, limit, pages);

    pagePrev.addEventListener('click', prevPage);
    pageNext.addEventListener('click', nextPage);
    const limitItemsInPageInstance = limitItemsInPage();
    limitInput.addEventListener('input', limitItemsInPageInstance);

    return headerList;
}

export function limitItemsInPage(int?: number): () => void {
    return () => {
        const cartList = document.querySelector('.in-cart') as HTMLElement;
        const mainList = document.querySelector('.in-cart__main') as HTMLElement;
        const limitInput = document.getElementById('limit-input') as HTMLInputElement;
        const value = Number(limitInput.value);

        if (value && value > 0 && value <= cartArray.length) {
            const from = int ? value * int - value + 1 : value - value;
            const to = int ? value * int : value;

            mainList.remove();
            cartList.append(createCartProducts(from, to));
        }
    };
}

function nextPage(): void {
    const currentPage = document.getElementById('current-page-cart') as HTMLElement;
    const nextPageNumber = Number(currentPage.textContent) + 1;
    const limitInput = document.getElementById('limit-input') as HTMLInputElement;
    const value = Number(limitInput.value);
    const maxPage = Math.ceil(cartArray.length / value);

    if (nextPageNumber > maxPage) return;

    currentPage.textContent = String(nextPageNumber);
    const limitItemsInPageInstance = limitItemsInPage(nextPageNumber);
    limitItemsInPageInstance();
}

export function prevPage(): void {
    const currentPage = document.getElementById('current-page-cart') as HTMLElement;
    const prevPageNumber = Number(currentPage.textContent) - 1;

    if (prevPageNumber < 1) return;

    currentPage.textContent = String(prevPageNumber);
    const limitItemsInPageInstance = limitItemsInPage(prevPageNumber);
    limitItemsInPageInstance();
}

export function recreateProductsInPage(): void {
    const cartMain = document.querySelector('.in-cart__main') as HTMLElement;
    const currentPage = document.getElementById('current-page-cart') as HTMLElement;
    const currentPageNumber = Number(currentPage.textContent);
    const limitInput = document.getElementById('limit-input') as HTMLInputElement;

    limitInput.max = String(cartArray.length);

    if (cartMain.innerHTML === '' && currentPageNumber !== 1) {
        prevPage();
    } else {
        const limitItemsInPageInstance = limitItemsInPage(currentPageNumber);
        limitItemsInPageInstance();
    }
}
