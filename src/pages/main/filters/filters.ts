import productsJson from '../../../constants/products.json';
import * as func from '../../../utils/index';
import { createCatalog } from '../catalog/catalog';
import { Product } from 'constants/types/types';
import { createPriceAndStockSlider } from './slider';
import './filters.scss';

const asideBar = ['Category', 'Brand', 'Price', 'Stock'];
const maxLengthToShow = 7;

export function createFilterPage() {
    const container = func.createElement('container', 'main-container', 'container');

    const aside = createAsideBar();
    const article = createCatalog();

    container.append(aside, article);
    document.querySelector('.main')?.append(container);
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

    asideBar.forEach((category) => {
        const li = func.createElement('li', 'aside-list__item', 'aside-product');
        const productsList = createProductsList(category);

        const div = func.createElement('div', 'aside-product-container');

        const spanText = func.createElement('span', 'aside-product__text');
        spanText.textContent = category;

        if (category !== 'Price' && category !== 'Stock') {
            div.append(spanText, func.createElement('span', 'aside-product__img', 'aside-product__img_no-active'));
        } else {
            div.append(spanText);
        }

        li.append(div, productsList);
        ul.append(li);
    });

    return ul;
}

function createProductsList(category: string) {
    const categoryArr = createArrOfProducts(productsJson.products, category.toLowerCase(), maxLengthToShow);
    let form: HTMLElement;

    if (category !== 'Price' && category !== 'Stock') {
        form = func.createElement('form', 'aside-product-form', 'aside-product-form_hidden');
    } else {
        form = func.createElement('form', 'aside-product-form');
    }

    for (const product of categoryArr) {
        const label = func.createElement('label', 'aside-product-form__label');

        const checkbox = func.createElement('input', 'aside-product-form__checkbox') as HTMLInputElement;
        checkbox.type = 'checkbox';

        const a = func.createElement('a', 'aside-product-form__hash');
        a.setAttribute('href', `${product[0]}`);
        a.textContent = product[0][0].toLocaleUpperCase() + product[0].slice(1);

        const span = func.createElement('span', 'aside-product-form__amount');
        span.textContent = `(${product[1]}/${product[1]})`;

        label.append(checkbox, a, span);
        form.append(label);
    }

    if (category === 'Price' || category === 'Stock') {
        createPriceAndStockSlider(form, category.toLowerCase());
    }

    return form;
}

function createArrOfProducts(products: Product[], category: string, length?: number) {
    const map: Map<string, number> = new Map();

    products.forEach((product) => {
        if (typeof product[category] === 'string') {
            let num = 1;

            if (map.has(product[category])) {
                num = (map.get(product[category]) as number) + 1;
            }

            map.set(product[category], num);

            if (length && map.size > length) {
                map.delete(product[category]);
                return;
            }
        }
    });

    return map;
}

function showFilters(e: Event) {
    const target = e.target as HTMLElement;

    if (target.closest('.aside-product-form')) setUrlHash(e);

    if (!target.closest('.aside-product-container')) return;

    const currentTarget = target.closest('.aside-product') as HTMLDivElement;
    const span = currentTarget.querySelector('.aside-product__img') as HTMLElement;

    span.classList.toggle('aside-product__img_no-active');
    span.classList.toggle('aside-product__img_active');

    const form = currentTarget.querySelector('.aside-product-form') as HTMLElement;
    form.classList.toggle('aside-product-form_hidden');
}

function setUrlHash(e: Event) {
    const currentTarget = (e.target as HTMLElement).closest('.aside-product-form__label');

    if (!currentTarget) return;

    const a = currentTarget.querySelector('.aside-product-form__hash') as HTMLLinkElement;
    const hash = a.getAttribute('href') as string;
    window.location.hash = hash;
    return hash;
}
