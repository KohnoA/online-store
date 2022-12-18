import productsJson from '../../constants/products.json';
import * as func from '../../utils/index';
import { createCatalog } from './catalog/catalog';
import './main.scss';

const asideBar = ['Category', 'Brand', 'Price', 'Stock'];
const maxLengthToShow = 7;

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
        const li = func.createElement('li', 'aside-list__item', 'product');
        const productsList = createProductsList(item);

        const div = func.createElement('div', 'product-container');

        const spanText = func.createElement('span', 'product__text');
        spanText.textContent = item;

        div.append(spanText, func.createElement('span', 'product__img', 'product__img_no-active'));

        li.append(div, productsList);
        ul.append(li);
    });

    return ul;
}

function showFilters(e: Event) {
    const target = e.target as HTMLElement;

    if (target.closest('.product-form')) setUrlHash(e);

    if (!target.closest('.product-container')) return;

    const currentTarget = target.closest('.product') as HTMLDivElement;
    const span = currentTarget.querySelector('.product__img') as HTMLElement;

    span.classList.toggle('product__img_no-active');
    span.classList.toggle('product__img_active');

    const form = currentTarget.querySelector('.product-form') as HTMLElement;
    form.classList.toggle('product-form_hidden');
}

function createProductsList(category: string) {
    const form = func.createElement('form', 'product-form', 'product-form_hidden');
    const categoryArr = createArrOfProducts(productsJson.products, category.toLowerCase(), maxLengthToShow);

    categoryArr.forEach((product) => {
        const label = func.createElement('label', 'product-form__label');

        const checkbox = func.createElement('input', 'product-form__checkbox') as HTMLInputElement;
        checkbox.type = 'checkbox';

        const a = func.createElement('a', 'product-form__hash');
        a.setAttribute('href', `${product}`);
        a.textContent = product;

        label.append(checkbox, a);
        form.append(label);
    });

    return form;
}

function createArrOfProducts(products: Products[], category: string, length?: number): Set<string> {
    const set: Set<string> = new Set();

    products.forEach((product) => {
        if (typeof product[category] === 'string') {
            if (length && set.size < length) {
                set.add(product[category]);
            } else return;
        }
    });

    return set;
}

function setUrlHash(e: Event) {
    const currentTarget = (e.target as HTMLElement).closest('.product-form__label');
    const a = currentTarget?.querySelector('.product-form__hash') as HTMLLinkElement;
    const hash = a.getAttribute('href') as string;
    window.location.hash = hash;
    return hash;
}

interface Products {
    brand: string;
    category: string;
    description: string;
    discountPercentage: string;
    id: number;
    images: string[];
    price: number;
    rating: number;
    stock: number;
    thumbnail: string;
    title: string;
}
