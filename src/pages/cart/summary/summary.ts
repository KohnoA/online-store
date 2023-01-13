import './summary.scss';
import * as utils from '../../../utils/index';
import { promoCodes, activePromoCodes } from '../../../constants/data/data';
import { showPopUp } from '../../../components/popup/popup';
import { Promo } from 'constants/types/types';

export function createSummary(): HTMLElement {
    const summary = utils.createElement('section', 'summary');
    const title = utils.createElement('h2', 'summary__title');
    const productsAmount = utils.createElement('p', 'summary__product-amount');
    const productsAmountInt = utils.createElement('span', 'summary__amount-int');
    const totalCash = utils.createElement('p', 'summary__total-cash');
    const totalCashInt = utils.createElement('span', 'summary__cash-int');
    const inputPromoCode = utils.createElement('input', 'summary__promo-code');
    const promoCodeDescription = utils.createElement('p', 'summary__code-description');
    const buyButton = utils.createElement('button', 'summary__buy-now');

    title.textContent = 'Summary';
    productsAmount.textContent = 'Products: ';
    totalCash.textContent = 'Total: ';
    inputPromoCode.setAttribute('type', 'text');
    inputPromoCode.setAttribute('placeholder', 'Enter promo code');
    inputPromoCode.id = 'promo-code';
    promoCodeDescription.textContent = `Promo for test: 'RS', 'EPM'`;
    buyButton.textContent = 'Buy Now';
    buyButton.setAttribute('type', 'button');

    productsAmount.append(productsAmountInt);
    totalCash.append(totalCashInt, '€');
    summary.append(title, productsAmount, totalCash, inputPromoCode, promoCodeDescription, buyButton);

    buyButton.addEventListener('click', showPopUp);
    inputPromoCode.addEventListener('input', followPromoCode);

    return summary;
}

export function followPromoCode(): void {
    const input = document.querySelector('.summary__promo-code') as HTMLInputElement;
    const value = input.value.trim().toUpperCase();

    if (value in promoCodes) {
        createPromoCodeItem(input, promoCodes[value as Promo]);
    } else {
        document.querySelector('.summary__promo-code_current')?.remove();
    }
}

function createPromoCodeItem(input: HTMLInputElement, value: string): void {
    const p = utils.createElement('p', 'summary__promo-code_current');
    const addButton = utils.createElement('button', 'summary__add-promo-code');

    p.textContent = value;
    addButton.textContent = 'add';

    if (!activePromoCodes.includes(value)) p.append(addButton);
    input.after(p);

    const addPromoCodeInstance = addPromoCode(input, value);
    addButton.addEventListener('click', addPromoCodeInstance);
}

function addPromoCode(input: HTMLInputElement, value: string): (event: Event) => void {
    return (event: Event) => {
        if (!(event.target instanceof HTMLElement) || !event.target) return;
        const target = event.target;
        const currentPromoCode = target.parentElement as HTMLElement;
        const activePromoCode = currentPromoCode?.cloneNode(true) as HTMLElement;
        const dropButton = activePromoCode.querySelector('.summary__add-promo-code') as HTMLElement;

        dropButton.textContent = 'drop';
        dropButton.classList.remove('summary__add-promo-code');
        dropButton.classList.add('summary__drop-promo-code');
        activePromoCode.classList.remove('summary__promo-code_current');
        activePromoCode.classList.add('summary__promo-code_active');
        currentPromoCode.remove();

        activePromoCodes.push(value);

        input.before(activePromoCode);
        input.value = '';

        recalculationTotalCash();

        const delPromoCodeInstance = delPromoCode(activePromoCode, value);
        dropButton.addEventListener('click', delPromoCodeInstance);
    };
}

function delPromoCode(activePromoCode: HTMLElement, value: string): () => void {
    return () => {
        const delCodeIndex = activePromoCodes.findIndex((item) => item === value);

        activePromoCode.remove();
        activePromoCodes.splice(delCodeIndex, 1);

        recalculationTotalCash();
    };
}

export function recalculationTotalCash(): void {
    document.querySelector('.summary__total-cash_new')?.remove();

    const cashInt = document.querySelector('.summary__cash-int') as HTMLElement;
    const cashParent = cashInt.parentElement as HTMLElement;
    const cashCloneParent = cashParent.cloneNode(true) as HTMLElement;
    const cashCloneInt = cashCloneParent.querySelector('.summary__cash-int') as HTMLElement;
    const cashNum = Number(cashInt.textContent);
    const discountPercentage = activePromoCodes.length * 10;
    const discountAmount = (cashNum * discountPercentage) / 100;
    const cashWithDiscount = Math.floor(cashNum - discountAmount);

    if (cashParent.classList.contains('summary__total-cash_cross')) {
        cashCloneParent.classList.remove('summary__total-cash_cross');
    }
    cashCloneParent.classList.remove('summary__total-cash');
    cashCloneParent.classList.add('summary__total-cash_new');
    cashParent.classList.add('summary__total-cash_cross');

    cashCloneInt.textContent = `${cashWithDiscount}`;

    if (activePromoCodes.length === 0) {
        cashParent.classList.remove('summary__total-cash_cross');
    } else {
        cashParent.after(cashCloneParent);
    }
}

export function clearPromoCodes(): void {
    while (activePromoCodes.length !== 0) {
        activePromoCodes.pop();
    }
}

export function reCreatePromoCode(value: string): void {
    const input = document.querySelector('.summary__promo-code') as HTMLInputElement;
    const p = utils.createElement('p', 'summary__promo-code_active');
    const dropButton = utils.createElement('button', 'summary__drop-promo-code');

    p.textContent = value;
    dropButton.textContent = 'drop';

    p.append(dropButton);
    input.before(p);

    recalculationTotalCash();

    const delPromoCodeInstance = delPromoCode(p, value);
    dropButton.addEventListener('click', delPromoCodeInstance);
}
