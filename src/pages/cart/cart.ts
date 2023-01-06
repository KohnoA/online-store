import './cart.scss';
import * as utils from '../../utils/index';
import { createCartProducts } from './cart-products/cart-products';
import { createSummary } from './summary/summary';
import { cartArray } from '../../constants/data/data';
import { createCartPagination } from './cart-products/pagination';

export function createCart(): void {
    const main = document.querySelector('.main') as HTMLElement;
    const container = utils.createElement('div', 'container', 'cart-container');

    if (cartArray.length === 0) {
        const emptyCart = createEmptyCart();

        container.append(emptyCart);
    } else {
        const summaryNode = createSummary();
        const cartListNode = createCartProductList();

        container.append(cartListNode, summaryNode);
    }

    main.append(container);

    utils.setSumAndQuantityInCart(
        document.querySelector('.summary__amount-int'),
        document.querySelector('.summary__cash-int')
    );
}

function createCartProductList(): HTMLElement {
    const cartList = utils.createElement('section', 'in-cart');
    const headerList = createCartPagination();
    const mainList = createCartProducts();

    cartList.append(headerList, mainList);

    mainList.addEventListener('click', utils.switchOnProductPage);

    return cartList;
}

function createEmptyCart(): HTMLElement {
    const p = utils.createElement('p', 'empty-cart');
    p.textContent = 'Cart is Empty';

    return p;
}

export function cartIsEmpty() {
    const container = document.querySelector('.cart-container');

    if (container) {
        container.innerHTML = '';
        container.append(createEmptyCart());
    }
}
