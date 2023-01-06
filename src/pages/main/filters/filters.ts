import productsJson from '../../../constants/products.json';
import languageJson from '../../../constants/language.json';
import * as func from '../../../utils/index';
import { Product } from 'constants/types/types';
import { createPriceAndStockSlider } from './slider';
import './filters.scss';

const asideBar = ['Category', 'Brand', 'Price', 'Stock'];

export function createAsideBar() {
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

function createProductsList(category: string, filtersContainer?: HTMLElement) {
    const categoryArr = createArrOfProducts(productsJson.products, category.toLowerCase());
    let form: HTMLElement;

    const input = func.createElement(
        'input',
        'aside-product-form__search',
        'aside-product-form_hidden'
    ) as HTMLInputElement;
    input.placeholder = languageJson['ru']['search-placeholder'];

    if (category !== 'Price' && category !== 'Stock') {
        form = func.createElement('form', 'aside-product-form', 'aside-product-form_hidden');
        form.append(input);
    } else {
        form = func.createElement('form', 'aside-product-form');
    }

    const containerElements = createProductsListElements(categoryArr);

    if (category === 'Price' || category === 'Stock') {
        createPriceAndStockSlider(form, category.toLowerCase());
    } else {
        const button = func.createElement('button', 'aside-product-form__button');
        button.textContent = languageJson['ru']['button-showAll'];
        !filtersContainer ? form.append(containerElements, button) : form.append(filtersContainer, button);
    }

    return form;
}

function createProductsListElements(map: Map<string, number>) {
    const container = func.createElement('div', 'aside-product-form-container', 'aside-product-form-container_hidden');
    container.innerHTML = '';

    for (const product of map) {
        const label = func.createElement('label', 'aside-product-form__label');

        const checkbox = func.createElement('input', 'aside-product-form__checkbox') as HTMLInputElement;
        checkbox.type = 'checkbox';

        const a = func.createElement('a', 'aside-product-form__hash');
        a.setAttribute('href', `${product[0]}`);
        a.textContent = product[0][0].toLocaleUpperCase() + product[0].slice(1);

        const span = func.createElement('span', 'aside-product-form__amount');
        span.textContent = `(${product[1]}/${product[1]})`;

        label.append(checkbox, a, span);
        container.append(label);
    }

    return container;
}

function createArrOfProducts(products: Product[], category: string) {
    const map: Map<string, number> = new Map();

    products.forEach((product) => {
        if (typeof product[category] === 'string') {
            let num = 1;

            if (map.has(product[category])) {
                num = (map.get(product[category]) as number) + 1;
            }

            map.set(product[category], num);
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

export function showAllFilters(e: Event) {
    const target = e.target as HTMLElement;

    if (!target.closest('.aside-product-form__button')) return;
    e.preventDefault();

    const form = target.parentElement as HTMLElement;
    const input = form.querySelector('.aside-product-form__search') as HTMLElement;
    const containerElements = form.querySelector('.aside-product-form-container') as HTMLDivElement;

    input.classList.toggle('aside-product-form_hidden');
    const textBtn =
        target.textContent === languageJson['ru']['button-hiddenAll']
            ? languageJson['ru']['button-showAll']
            : languageJson['ru']['button-hiddenAll'];
    target.textContent = textBtn;

    containerElements.classList.toggle('aside-product-form-container_hidden');
}

function filterArrOfProducts(e: Event) {
    const target = e.target as HTMLInputElement;

    if (!target.closest('.aside-product-form__search')) return;

    const form = target.parentElement as HTMLElement;
    const li = form.parentElement as HTMLElement;
    const category = li.querySelector('.aside-product__text')?.textContent?.toLowerCase() as string;

    const arr = Array.from(createArrOfProducts(productsJson.products, category));

    const value = target.value.trim().toLowerCase();
    const map = Object(arr.filter((item) => item[0].startsWith(value)));

    const container = createProductsListElements(map);
    container.classList.remove('aside-product-form-container_hidden');
    container.children.length
        ? (form.children[1].innerHTML = container.innerHTML)
        : (form.children[1].innerHTML = 'Элемент не найден');
}

function changeCheckboxes(e: Event) {
    const target = e.target as HTMLElement;

    if (!target.closest('.aside-product-form__label')) return;

    console.log(target);
}

document.addEventListener('change', changeCheckboxes);
document.addEventListener('input', (e) => filterArrOfProducts(e));
