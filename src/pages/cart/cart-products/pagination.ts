import * as utils from '../../../utils/index';

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

export function showPopUp(): void {
    console.log('popup!');
}
