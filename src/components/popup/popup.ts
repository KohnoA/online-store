import './popup.scss';
import * as utils from '../../utils/index';

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

    title.textContent = 'Credit card details';
    cardNumber.setAttribute('placeholder', 'Card number');
    cardValid.setAttribute('placeholder', 'Valid Thru');
    cardValidLabel.textContent = 'Valid: ';
    cardCvv.setAttribute('placeholder', 'Code');
    cardCvvLabel.textContent = 'CVV: ';

    cardValidLabel.append(cardValid);
    cardCvvLabel.append(cardCvv);
    wrapper.append(cardValidLabel, cardCvvLabel);
    card.append(cardNumber, wrapper);
    careditCardDetails.append(title, card);

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
