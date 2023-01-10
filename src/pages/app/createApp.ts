import * as utils from '../../utils/index';
import { createPageHeader } from '../../components/header/header';
import { createFooter } from '../../components/footer/footer';
import { createFilterPage } from '../main/main';
import { create404page } from '../404/404';
import { createCart } from '../cart/cart';
import { createProductPage } from '../product/product';
import { Pages } from '../../constants/data/data';

export function createApp(): void {
    const body = document.querySelector('.body') as HTMLElement;
    const header = createPageHeader();
    const main = utils.createElement('main', 'main');
    const footer = createFooter();

    body.append(header);
    body.append(main);
    body.append(footer);

    routing();
    window.addEventListener('hashchange', routing);
    window.addEventListener('DOMContentLoaded', routing);
}

export function routing() {
    const hash = window.location.hash;
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';

    if (hash === Pages.main) createFilterPage();
    else if (hash === Pages.cart) createCart();
    else if (hash.startsWith(Pages.product)) createProductPage();
    else create404page();
}
