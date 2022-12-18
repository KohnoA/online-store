import productsJson from '../../constants/products.json';
import * as func from '../../utils/index';
import { createCatalog } from './catalog/catalog';
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
    const target = (e.target as HTMLElement).closest('.product');

    if (!target) return;

    const divContainer = target.querySelector('.product-container') as HTMLElement;
    const span = divContainer.querySelector('.product__img') as HTMLElement;

    span.classList.toggle('product__img_no-active');
    span.classList.toggle('product__img_active');

    const form = target.querySelector('.product-form') as HTMLElement;
    form.classList.toggle('product-form_hidden');
}

function createProductsList(category: string) {
    const form = func.createElement('form', 'product-form', 'product-form_hidden');
    const categoryArr = createArrOfProducts(productsJson.products, category.toLowerCase());

    categoryArr.forEach((product) => {
        const label = func.createElement('label', 'product-form__item');

        const checkbox = func.createElement('input', 'product-form__checkbox') as HTMLInputElement;
        checkbox.type = 'checkbox';

        const span = func.createElement('span', 'product-form__text');
        span.textContent = product;

        label.append(checkbox, span);
        form.append(label);
    });

    return form;
}

function createArrOfProducts(products: Products[], category: string): Set<string> {
    const set: Set<string> = new Set();

    products.forEach((product) => {
        if (typeof product[category] === 'string') {
            set.add(product[category]);
        }
    });

    return set;
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
