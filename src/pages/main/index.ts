//import products from '../../constants/products.json';
import * as func from '../../utils/index';
import './main.scss';

const asideBar = ['Category', 'Brand', 'Price', 'Stock'];

export function createMain(): void {
    const main = func.createElement('main', 'main');
    const container = func.createElement('container', 'main-container', 'container');

    const aside = createAsideBar();
    const article = createCatalog();

    container.append(aside, article);
    main.append(container);
    document.body.append(main);
}

function createAsideBar() {
    const aside = func.createElement('aside', 'aside');
    const container = func.createElement('container', 'aside-container');

    const h1 = func.createElement('h1', 'aside__title');
    h1.textContent = 'Filters';

    const ul = createFilters();
    ul.addEventListener('click', showFilters);

    container.append(h1, ul);
    aside.append(container);
    return aside;
}

function createFilters() {
    const ul = func.createElement('ul', 'aside-list');

    asideBar.forEach((item) => {
        const li = func.createElement('li', 'aside-list__item');

        const spanText = func.createElement('span', 'aside-list__text');
        spanText.textContent = item;

        li.append(spanText, func.createElement('span', 'aside-list__img', 'aside-list__img_no-active'));
        ul.append(li);
    });

    return ul;
}

function createCatalog() {
    const article = func.createElement('article', 'article');
    const h1 = func.createElement('h1', 'main__title');
    h1.textContent = 'Catalog';
    article.append(h1);
    return article;
}

function showFilters(e: Event) {
    const target = e.target as HTMLElement;

    if (!target.closest('.aside-list__item')) return;

    const li = target.closest('.aside-list__item') as HTMLElement;
    const span = li.querySelector('.aside-list__img') as HTMLElement;

    span.classList.toggle('aside-list__img_no-active');
    span.classList.toggle('aside-list__img_active');
}
