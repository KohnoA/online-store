import productsJson from '../../../constants/products.json';
import languageJson from '../../../constants/language.json';
import * as func from '../../../utils/index';
import { Product, URL } from 'constants/types/types';
import { createPriceAndStockSlider, coloredSlider } from './slider';
import { showProductsList } from '../catalog/products';
import './filters.scss';

const checkboxes = ['Category', 'Brand'];
const sliders = ['Price', 'Stock'];

export function createAsideBar() {
    const aside = func.createElement('aside', 'aside');
    const container = func.createElement('container', 'aside-container');

    const h1 = func.createElement('h1', 'aside__title');
    h1.textContent = 'Filters';

    const containerBtn = createButtons();

    const ul = func.createElement('ul', 'aside-list');
    createFilters(ul);

    ul.addEventListener('click', showFilters);

    container.append(h1, containerBtn, ul);
    aside.append(container);
    return aside;
}

function createButtons() {
    const container = func.createElement('div', 'aside-container-btns');

    const btnAmount = 2;
    const classes = ['reset', 'copy'];
    const texts = ['Reset', 'Copy link'];

    for (let i = 0; i < btnAmount; i++) {
        const btn = func.createElement('button', 'aside-container__btn', `aside__${classes[i]}`);
        btn.textContent = texts[i];
        container.append(btn);
    }

    return container;
}

function createFilters(ul: HTMLElement) {
    createCheckboxes(ul);
    createSliders(ul);
    return ul;
}

function createCheckboxes(ul: HTMLElement) {
    checkboxes.forEach((category) => {
        const li = func.createElement('li', 'aside-list__item', 'aside-product');
        const productsList = createProductsList(category);

        const div = func.createElement('div', 'aside-product-container');

        const spanText = func.createElement('span', 'aside-product__text');
        spanText.textContent = category;

        div.append(spanText, func.createElement('span', 'aside-product__img', 'aside-product__img_no-active'));

        li.append(div, productsList);
        ul.append(li);
    });

    return ul;
}

function createSliders(ul: HTMLElement) {
    sliders.forEach((category) => {
        const li = func.createElement('li', 'aside-list__item', 'aside-product');
        const productsList = createProductsList(category);

        const div = func.createElement('div', 'aside-product-container');

        const spanText = func.createElement('span', 'aside-product__text');
        spanText.textContent = category;

        div.append(spanText);

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

    const containerElements = func.createElement(
        'div',
        'aside-product-form-container',
        'aside-product-form-container_hidden'
    );
    createProductsListElements(categoryArr, containerElements);

    if (category === 'Price' || category === 'Stock') {
        createPriceAndStockSlider(form, category.toLowerCase());
    } else {
        const button = func.createElement('button', 'aside-product-form__button');
        button.textContent = languageJson['ru']['button-showAll'];
        !filtersContainer ? form.append(containerElements, button) : form.append(filtersContainer, button);
    }

    return form;
}

function createProductsListElements(map: Map<string, number>, container: HTMLElement, objectURL?: URL, category?) {
    container.innerHTML = '';

    for (const product of map) {
        const label = func.createElement('label', 'aside-product-form__label');

        const checkbox = func.createElement('input', 'aside-product-form__checkbox') as HTMLInputElement;
        checkbox.type = 'checkbox';
        if (objectURL && objectURL[category] !== null) setCheckedToCheckbox(objectURL, category, checkbox, product);

        const a = func.createElement('a', 'aside-product-form__hash') as HTMLAnchorElement;
        a.href = `${product[0]}`;
        a.textContent = product[0][0].toLocaleUpperCase() + product[0].slice(1);

        const span = func.createElement('span', 'aside-product-form__amount');
        span.textContent = `(${product[1]}/${product[1]})`;

        label.append(checkbox, a, span);
        container.append(label);
    }

    return container;
}

function setCheckedToCheckbox(objectURL: URL, category: string, checkbox: HTMLInputElement, value: [string, number]) {
    objectURL[category].forEach((elem: string) => {
        if (elem === value[0].toLowerCase()) checkbox.setAttribute('checked', 'true');
    });
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

    if (!target.closest('.aside-product-container')) return;

    const currentTarget = target.closest('.aside-product') as HTMLDivElement;
    const span = currentTarget.querySelector('.aside-product__img') as HTMLElement;

    span.classList.toggle('aside-product__img_no-active');
    span.classList.toggle('aside-product__img_active');

    const form = currentTarget.querySelector('.aside-product-form') as HTMLElement;
    form.classList.toggle('aside-product-form_hidden');
}

export function showAllFilters(e: Event) {
    const target = e.target as HTMLElement;

    if (!target.closest('.aside-product-form__button')) return;
    e.preventDefault();
    const form = target.parentElement as HTMLElement;
    const input = form.querySelector('.aside-product-form__search') as HTMLInputElement;
    const containerElements = form.querySelector('.aside-product-form-container') as HTMLDivElement;

    input.classList.toggle('aside-product-form_hidden');
    input.value = '';
    const textBtn =
        target.textContent === languageJson['ru']['button-hiddenAll']
            ? languageJson['ru']['button-showAll']
            : languageJson['ru']['button-hiddenAll'];
    target.textContent = textBtn;

    containerElements.classList.toggle('aside-product-form-container_hidden');
}

export function filterArrOfProducts(e: Event) {
    const target = e.target as HTMLInputElement;

    if (!target.closest('.aside-product-form__search')) return;

    const form = target.parentElement as HTMLElement;
    const li = form.parentElement as HTMLElement;
    const category = li.querySelector('.aside-product__text')?.textContent?.toLowerCase() as string;

    const arr = Array.from(createArrOfProducts(productsJson.products, category));

    const value = target.value.trim().toLowerCase();
    const map = Object(arr.filter((item) => item[0].startsWith(value)));

    const div = document.querySelector('.aside-product-form-container') as HTMLElement;
    const container = createProductsListElements(map, div);
    container.classList.remove('aside-product-form-container_hidden');
    container.children.length
        ? (form.children[1].innerHTML = container.innerHTML)
        : (form.children[1].innerHTML = 'Элемент не найден');
}

function changeCheckboxes(e: Event) {
    const target = e.target as HTMLElement;

    if (!target.closest('.aside-product-form__checkbox')) return;

    const label = target.parentElement as HTMLElement;
    const value = (label.children[1].textContent as string).toLowerCase();

    const container = label.parentElement as HTMLDivElement;
    const form = container.parentElement as HTMLElement;
    const li = form.parentElement as HTMLElement;
    const category = (li.querySelector('.aside-product__text') as HTMLElement).textContent?.toLowerCase() as string;

    setURLFiltersKey(category, value);
}

function setURLFiltersKey(category: string, value: string): void {
    const url = new URL(window.location.href);

    if (!url.search) {
        url.searchParams.set(category, value);
    } else if (url.searchParams.has(category) && url.searchParams.get(category)?.includes(value)) {
        const arr: string[] = (url.searchParams.get(category) as string).split('↕');
        const URL = arr.filter((item) => item !== value);
        URL.length ? url.searchParams.set(category, `${URL.join('↕')}`) : url.searchParams.delete(category);
    } else if (url.searchParams.has(category) && !url.searchParams.get(category)?.includes(value)) {
        url.searchParams.set(category, `${url.searchParams.get(category) as string}↕${value}`);
    } else {
        url.searchParams.append(category, value);
    }

    window.history.pushState(null, '', url);

    showProductsList();
}

function changeDualInput(e: Event) {
    const target = e.target as HTMLInputElement;

    if (!target.closest('.aside-slider')) return;

    const container = target.parentElement as HTMLElement;
    const minInput = container.children[0] as HTMLInputElement;
    const maxInput = container.children[1] as HTMLInputElement;

    func.setURLKey(container.id, `${minInput.value}↕${maxInput.value}`, '');
}

export function changesFilters(e: Event) {
    const target = e.target as HTMLInputElement;

    if (target.closest('.aside-slider')) changeDualInput(e);

    if (target.closest('.aside-product-form__checkbox')) changeCheckboxes(e);
}

export function isCheck(objectURL: URL) {
    for (let i = checkboxes.length - 1; i >= 0; i--) {
        const containers = document.querySelectorAll('.aside-product-form-container') as NodeListOf<HTMLElement>;
        containers[i].innerHTML = '';

        const categoryArr = createArrOfProducts(productsJson.products, checkboxes[i].toLowerCase());

        createProductsListElements(categoryArr, containers[i], objectURL, checkboxes[i].toLowerCase());
        setValueToDualSlider(objectURL);
    }
}

function setValueToDualSlider(objectURL: URL) {
    const blocks = document.querySelectorAll('.aside-slider') as NodeListOf<HTMLDivElement>;

    sliders.forEach((category, i) => {
        const min = Math.min(...objectURL[category.toLocaleLowerCase()].map((item) => Number(item)));
        const max = Math.max(...objectURL[category.toLocaleLowerCase()].map((item) => Number(item)));

        const minInput = blocks[i].querySelector(`#inputMin${category.toLowerCase()}`) as HTMLInputElement;
        const maxInput = blocks[i].querySelector(`#inputMax${category.toLowerCase()}`) as HTMLInputElement;
        const form = blocks[i].parentElement as HTMLFormElement;
        const formControlMin = form.querySelector('.aside-slider-control__num_min') as HTMLInputElement;
        const formControlMax = form.querySelector('.aside-slider-control__num_max') as HTMLInputElement;

        coloredSlider(minInput, maxInput, category.toLowerCase());

        minInput.value = `${min}`;
        formControlMin.value = `${min}`;
        maxInput.value = `${max}`;
        formControlMax.value = `${max}`;
    });
}

export function resetFilters(e: Event) {
    const target = e.target as HTMLElement;

    if (!target.closest('.aside__reset')) return;

    localStorage.removeItem('url');

    const url = window.location.href.split('?')[0];
    window.history.pushState(null, '', url);

    showProductsList();
}
