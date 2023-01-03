import './summary.scss';
import * as utils from '../../../utils/index';
import { cartArray } from '../../../constants/data/data';

export function createSummary(): HTMLElement {
    const summary = utils.createElement('section', 'summary');
    const title = utils.createElement('h2', 'summary__title');
    const productsAmount = utils.createElement('p', 'summary__product-amount');
    const productsAmountInt = utils.createElement('span', 'summary__amount-int');
    const totalCash = utils.createElement('p', 'summary__total-cash');
    const totalCashInt = utils.createElement('span', 'summary__cash-int');
    const totalCashIntInHeader = document.getElementById('total-cash')?.textContent;
    const inputPromoCode = utils.createElement('input', 'summary__promo-code');
    const promoCodeDescription = utils.createElement('p', 'summary__code-description');
    const buyButton = utils.createElement('button', 'summary__buy-now');

    title.textContent = 'Summary';
    productsAmount.textContent = 'Products: ';
    productsAmountInt.textContent = String(cartArray.length);
    totalCash.textContent = 'Total: ';
    totalCashIntInHeader
        ? (totalCashInt.textContent = totalCashIntInHeader + '€')
        : (totalCashInt.textContent = '0' + '€');
    inputPromoCode.setAttribute('type', 'text');
    inputPromoCode.setAttribute('placeholder', 'Enter promo code');
    inputPromoCode.id = 'promo-code';
    promoCodeDescription.textContent = `Promo for test: 'RS', 'EPM'`;
    buyButton.textContent = 'Buy Now';
    buyButton.setAttribute('type', 'button');

    productsAmount.append(productsAmountInt);
    totalCash.append(totalCashInt);
    summary.append(title, productsAmount, totalCash, inputPromoCode, promoCodeDescription, buyButton);

    return summary;
}
