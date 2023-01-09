import { routing } from '../pages/app/createApp';
import { Pages, cartArray } from '../constants/data/data';
import { showProductsList } from '../pages/main/catalog/products';
import { Product, URL } from 'constants/types/types';

const categories = ['category', 'brand', 'price', 'stock', 'sort', 'search', 'show'];

export function createElement(element: string, className: string, anotherClass?: string): HTMLElement {
    const elem = document.createElement(element);

    if (anotherClass) {
        elem.classList.add(className, anotherClass);
    } else {
        elem.classList.add(className);
    }

    return elem;
}

export function createSelectOptions(arrValues: Array<string>, instert: HTMLElement): void {
    arrValues.forEach((item) => {
        const option = document.createElement('option');

        option.setAttribute('value', item);
        option.textContent = item;

        instert.append(option);
    });
}

export function setURLKey(name: string, value: string, valueToDelete: string) {
    const url = new URL(window.location.href);

    if (value !== valueToDelete) {
        url.searchParams.set(name, value);
    } else {
        url.searchParams.delete(name);
    }

    window.history.pushState(null, '', url);

    showProductsList();
}

export function switchOnProductPage(event: Event): void {
    if (event.target && event.target instanceof HTMLElement) {
        let target = event.target;
        const canSwitchFromCart = target.closest('.cart-product__info') || target.closest('.cart-product__image');
        const canSwitchFromMain =
            target.closest('.product') && !target.closest('.cart-product') && !target.closest('.product__button');

        if (canSwitchFromCart || canSwitchFromMain) {
            while (!target.classList.contains('product')) {
                target = target.parentElement as HTMLElement;
            }

            const id = target.querySelector('.product__id')?.textContent;

            window.history.pushState({}, '', `/${Pages.product}${id}`);
            routing();
        }
    }

    event.preventDefault();
}

export function setSumAndQuantityInCart<T>(cashNode: T, quantityNode: T): void {
    if (!cashNode && !quantityNode) return;
    if (!(cashNode instanceof HTMLElement) || !(quantityNode instanceof HTMLElement)) return;

    quantityNode.textContent = String(
        cartArray.reduce((acc, next) => {
            if (next.count) return acc + next.count;
            else return acc + 1;
        }, 0)
    );

    cashNode.textContent = String(
        cartArray.reduce((acc, next) => {
            if (next.count) return acc + next.price * next.count;
            else return acc + next.price;
        }, 0)
    );
}

export function getURLStringAsObj() {
    const url = new URL(window.location.href);

    const URLKeys = categories.reduce((acc, curr) => {
        if (curr === 'show') acc[curr] = url.searchParams.get(curr) || 'false';
        else if (curr === 'sort') acc[curr] = url.searchParams.get(curr) || '0';
        else if (curr === 'price')
            acc[curr] = url.searchParams.get(curr) ? (url.searchParams.get(curr) as string).split('↕') : ['10', '1749'];
        else if (curr === 'stock')
            acc[curr] = url.searchParams.get(curr) ? (url.searchParams.get(curr) as string).split('↕') : ['2', '150'];
        else acc[curr] = url.searchParams.get(curr) ? (url.searchParams.get(curr) as string).split('↕') : null;
        return acc;
    }, {});

    return URLKeys as URL;
}

export function setFiltersToLocalStorage(e: Event) {
    const target = e.target;

    if (target !== document.querySelector('.aside__copy')) return;

    const objectURL = getURLStringAsObj();

    for (const key in objectURL) {
        if (objectURL[key] !== null) {
            localStorage.setItem(key, JSON.stringify(objectURL[key]));
        }
    }

    localStorage.setItem('url', window.location.search);
}

export function getProductsByValues(arr: Array<Product>, objectURL: URL) {
    return sortPriceAndStockValue(selectCategoryAndBrand(arr, objectURL), objectURL);
}

function sortPriceAndStockValue(arr: Array<Product>, objectURL: URL) {
    const productsArr = [...arr];
    const price = objectURL['price'].map((item) => Number(item));
    const stock = objectURL['stock'].map((item) => Number(item));

    return productsArr.filter((product) => {
        if (product.price >= price[0] && product.price <= price[1]) {
            if (product.stock >= stock[0] && product.stock <= stock[1]) return product;
        }
    });
}

function selectCategoryAndBrand(arr: Array<Product>, objectURL: URL) {
    const categories = objectURL['category'];
    const brands = objectURL['brand'];
    const productsArr = [...arr];

    if (categories && !brands) return myFilter(productsArr, categories, 'category');
    else if (!categories && brands) return myFilter(productsArr, brands, 'brand');
    else if (categories && brands) return myFilter(myFilter(productsArr, brands, 'brand'), categories, 'category');
    else return productsArr;
}

function myFilter(productsArr: Product[], categories: string[], category: string) {
    return productsArr.filter((product) => {
        if (categories && categories.includes(product[category].toLowerCase())) return product;
    });
}
