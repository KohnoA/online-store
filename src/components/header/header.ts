import './header.scss';

const body = document.querySelector('.body') as HTMLElement;

export function createPageHeader(): void {
    const header: HTMLElement = document.createElement('header');
    const container: HTMLElement = document.createElement('div');

    header.classList.add('header');
    container.classList.add('container');

    header.append(container);
    body.append(header);

    createLogo();
    createNavigation();
}

function createLogo(): void {
    const logo: HTMLElement = document.createElement('a');

    logo.textContent = 'Online Store';
    logo.setAttribute('href', '#');

    logo.classList.add('logo');

    body.querySelector('.header .container')?.append(logo);
}

function createNavigation(): void {
    const ul: HTMLElement = document.createElement('ul');
    const liTotalCash: HTMLElement = document.createElement('li');
    const liBasket: Node = liTotalCash.cloneNode(true);
    const p: HTMLElement = document.createElement('p');
    const a: HTMLElement = document.createElement('a');
    const span: HTMLElement = document.createElement('span');
    const basketImage: HTMLElement = document.createElement('span');
    const basketCount: HTMLElement = document.createElement('span');

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
    a.setAttribute('href', '#');

    a.append(basketImage);
    a.append(basketCount);

    if (liBasket instanceof HTMLElement) {
        liBasket.append(a);
        liBasket.classList.add('navigation__item');
    }

    p.prepend(span);
    liTotalCash.append(p);
    ul.append(liTotalCash);
    ul.append(liBasket);
    body.querySelector('.header .container')?.append(ul);
}
