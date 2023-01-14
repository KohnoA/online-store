import './popup.scss';
import * as utils from '../../utils/index';
import * as form from './check-form';
import { cartArray } from '../../constants/data/data';

export function showPopUp(): void {
    const main = document.querySelector('.main') as HTMLElement;
    const overlay = utils.createElement('div', 'overlay');
    const popup = utils.createElement('form', 'popup');
    const personDetails = createPersonDetails();
    const creditCartDetails = createCreditCardDetails();
    const submit = utils.createElement('button', 'popup__submit');

    submit.setAttribute('type', 'submit');
    submit.textContent = 'Confirm';

    popup.append(personDetails, creditCartDetails, submit);
    main.append(popup, overlay);

    popup.addEventListener('submit', checkForm);
    overlay.addEventListener('click', closePopup);
}

function createPersonDetails(): HTMLElement {
    const personDetails = utils.createElement('div', 'personal-details');
    const title = utils.createElement('h2', 'personal-details__title');
    const name = utils.createElement('input', 'personal-details__name');
    const phone = utils.createElement('input', 'personal-details__phone');
    const address = utils.createElement('input', 'personal-details__address');
    const email = utils.createElement('input', 'personal-details__email');
    const personDetailsArr: Array<HTMLElement> = [name, phone, address, email];

    title.textContent = 'Personal details';
    name.setAttribute('placeholder', 'Name');
    phone.setAttribute('placeholder', 'Phone number');
    address.setAttribute('placeholder', 'Delivery address');
    email.setAttribute('placeholder', 'E-mail');

    personDetails.append(title);
    personDetailsArr.forEach((item) => {
        const wrapper = utils.createElement('div', 'personal-details__item');

        item.setAttribute('type', 'text');

        wrapper.append(item);
        personDetails.append(wrapper);
    });

    const checkName = form.checkNameAndAddress('.personal-details__name', 2, 3);
    const checkAddress = form.checkNameAndAddress('.personal-details__address', 3, 5);
    name.addEventListener('blur', checkName);
    phone.addEventListener('blur', form.checkPhone);
    address.addEventListener('blur', checkAddress);
    email.addEventListener('blur', form.checkEmail);

    return personDetails;
}

function createCreditCardDetails(): HTMLElement {
    const careditCardDetails = utils.createElement('div', 'credit-card');
    const title = utils.createElement('h2', 'credit-card__title');
    const card = utils.createElement('div', 'card');
    const cardNumber = utils.createElement('input', 'card__number');
    const wrapper = utils.createElement('div', 'card__other-data');
    const cardValid = utils.createElement('input', 'card__valid');
    const cardValidLabel = utils.createElement('div', 'card__valid-label');
    const cardCvv = utils.createElement('input', 'card__cvv');
    const cardCvvLabel = utils.createElement('div', 'card__cvv-label');
    const system = utils.createElement('div', 'card__system');
    const cardNumberWrapper = utils.createElement('div', 'card__number-wrapper');

    title.textContent = 'Credit card details';
    cardNumber.setAttribute('placeholder', 'Card number');
    cardValid.setAttribute('placeholder', 'Valid Thru');
    cardValidLabel.textContent = 'Valid: ';
    cardCvv.setAttribute('placeholder', 'Code');
    cardCvvLabel.textContent = 'CVV: ';

    cardNumberWrapper.append(system, cardNumber);
    cardValidLabel.append(cardValid);
    cardCvvLabel.append(cardCvv);
    wrapper.append(cardValidLabel, cardCvvLabel);
    card.append(cardNumberWrapper, wrapper);
    careditCardDetails.append(title, card);

    cardNumber.addEventListener('input', form.checkCardNumber);
    cardCvv.addEventListener('input', form.checkCvv);
    cardValid.addEventListener('input', form.checkValid);

    return careditCardDetails;
}

function closePopup(): void {
    const overlay = document.querySelector('.overlay');
    const popup = document.querySelector('.popup');

    if (overlay && popup) {
        overlay.remove();
        popup.remove();
    }
}

function checkForm(event: Event): void {
    const checkName = form.checkNameAndAddress('.personal-details__name', 2, 3);
    const checkAddress = form.checkNameAndAddress('.personal-details__address', 3, 5);
    const checkFunctions: Array<() => boolean> = [
        checkName,
        form.checkPhone,
        checkAddress,
        form.checkEmail,
        form.checkCardNumber,
        form.checkValid,
        form.checkCvv,
    ];
    const canSubmit: boolean = checkFunctions.map((item) => item()).every((item) => item);
    event.preventDefault();

    if (canSubmit) {
        const popup = document.querySelector('.popup') as HTMLElement;
        popup.innerHTML = '';

        cartArray.splice(0, cartArray.length);

        let count = 5;
        popup.classList.add('popup__secsecfull');
        popup.innerHTML = `Thanks for your order. Redirect to the store after ${count} sec.`;

        const intervalId = setInterval(() => {
            popup.innerHTML = `Thanks for your order. Redirect to the store after ${(count -= 1)} sec.`;
        }, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            window.location.replace('/');
        }, 5000);
    }
}
