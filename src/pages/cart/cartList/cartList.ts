import './cartList.scss';
import * as utils from '../../../utils/index';

export function createCartList(): HTMLElement {
    const cartList = utils.createElement('section', 'in-cart');

    return cartList;
}
