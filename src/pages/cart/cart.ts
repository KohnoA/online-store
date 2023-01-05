import './cart.scss';
import * as utils from '../../utils/index';
import { createCartList } from './cartList/cartList';
import { createSummary } from './summary/summary';
import { cartArray } from '../../constants/data/data';

export function createCart(): void {
    const main = document.querySelector('.main') as HTMLElement;
    const container = utils.createElement('div', 'container', 'cart-container');

    if (cartArray.length === 0) {
        const emptyCart = createEmptyCart();

        container.append(emptyCart);
    } else {
        const summaryNode = createSummary();
        const cartListNode = createCartList();

        container.append(cartListNode, summaryNode);
    }

    main.append(container);

    setCashAndCartItemsInCart();
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

export function setCashAndCartItemsInCart(): void {
    const productsAmountInt = document.querySelector('.summary__amount-int');
    const totalCashInt = document.querySelector('.summary__cash-int');

    if (productsAmountInt && totalCashInt) {
        productsAmountInt.textContent = String(
            cartArray.reduce((acc, next) => {
                if (next.count) return acc + next.count;
                else return acc + 1;
            }, 0)
        );
        totalCashInt.textContent = `${cartArray.reduce((acc, next) => {
            if (next.count) return acc + next.price * next.count;
            else return acc + next.price;
        }, 0)}€`;
    }
}
