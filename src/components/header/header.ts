import './header.scss';
import { routing } from '../../pages/app/createApp';
import { Pages } from '../../constants/data/data';

export function createPageHeader(): HTMLElement {
    const header = document.createElement('header');
    const container = document.createElement('div');
    const navigation = createNavigation();
    const logo = createLogo();

    header.classList.add('header');
    container.classList.add('container');

    container.append(logo);
    container.append(navigation);
    header.append(container);
    createLogo();

    return header;
}

function createLogo(): HTMLElement {
    const logo = document.createElement('a');

    logo.textContent = 'Online Store';
    logo.setAttribute('href', '/');
    logo.classList.add('logo');
    logo.addEventListener('click', headerEvent);

    return logo;
}

function createNavigation(): HTMLElement {
    const ul = document.createElement('ul');
    const liTotalCash = document.createElement('li');
    const liBasket: Node = liTotalCash.cloneNode(true);
    const p = document.createElement('p');
    const a = document.createElement('a');
    const span = document.createElement('span');
    const basketImage = document.createElement('span');
    const basketCount = document.createElement('span');

    ul.classList.add('navigaion');
    liTotalCash.classList.add('navigaion__item');
    span.classList.add('navigation__total-cash');
    a.classList.add('basket');
    basketImage.classList.add('basket__image');
    basketCount.classList.add('basket__count');

    span.id = 'total-cash';
    basketCount.id = 'count-purchases';
    p.textContent = '€';
    span.textContent = '0';
    basketCount.textContent = '0';
    a.setAttribute('href', 'cart');
    a.addEventListener('click', headerEvent);

    a.append(basketImage, basketCount);

    if (liBasket instanceof HTMLElement) {
        liBasket.append(a);
        liBasket.classList.add('navigation__item');
    }

    p.prepend(span);
    liTotalCash.append(p);
    ul.append(liTotalCash, liBasket);

    return ul;
}

function headerEvent(event: Event): void {
    const target = event.target;

    if (target && target instanceof HTMLElement) {
        if (target.closest('.basket')) window.history.pushState({}, '', Pages.cart);
        else if (target.closest('.logo')) window.history.pushState({}, '', Pages.main);
    }

    routing();
    event.preventDefault();
}
