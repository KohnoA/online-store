import './cart.scss';
import * as utils from '../../utils/index';
import { createCartList } from './cartList/cartList';
import { createSummary } from './summary/summary';
import { cartArray } from '../../constants/data/data';

export function createCart(): void {
    const main = document.querySelector('.main') as HTMLElement;
    const container = utils.createElement('div', 'container', 'cart-container');

    if (!cartArray.length) {
        const emptyCart = createEmptyCart();

        container.append(emptyCart);
    } else {
        const summaryNode = createSummary();
        const cartListNode = createCartList();

        container.append(cartListNode, summaryNode);
    }

    main.append(container);
}

function createEmptyCart(): HTMLElement {
    const p = utils.createElement('p', 'empty-cart');
    p.textContent = 'Cart is Empty';

    return p;
}
