import './styles/index.scss';
import { createApp } from './pages/app/createApp';
import { createFilterPage } from './pages/main/main';
import { create404page } from './pages/404/404';
import { createCart } from './pages/cart/cart';

createApp();

export function routing() {
    const hash = window.location.hash.slice(1);
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    if (hash === '') createFilterPage();
    else if (hash === 'cart') createCart();
    else create404page();
}

window.addEventListener('DOMContentLoaded', routing);
window.addEventListener('hashchange', routing);
