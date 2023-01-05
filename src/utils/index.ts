import { routing } from '../pages/app/createApp';
import { Pages } from '../constants/data/data';

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

export function setURLKey(name: string, value: string, valueToDelete: string): void {
    const url = new URL(window.location.href);

    if (value !== valueToDelete) {
        url.searchParams.set(name, value);
    } else {
        url.searchParams.delete(name);
    }

    window.history.pushState(null, '', url);
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

            window.history.pushState({}, '', `${Pages.product}${id}`);
            routing();
        }
    }

    event.preventDefault();
}
