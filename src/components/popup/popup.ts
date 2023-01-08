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

    // const checkName = checkNameAndAddress('personal-details__name', 2, 3);
    // const checkAddress = checkNameAndAddress('personal-details__address', 3, 5);
    name.addEventListener('blur', checkName);
    phone.addEventListener('blur', checkPhone);
    address.addEventListener('blur', checkAddress);
    email.addEventListener('blur', checkEmail);

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

function checkForm(event: Event): void {
    // const checkName = checkNameAndAddress('personal-details__name', 2, 3);
    // const checkAddress = checkNameAndAddress('personal-details__address', 3, 5);
    const checkFunctions: Array<() => boolean> = [checkName, checkPhone, checkAddress, checkEmail];
    const canSubmit: boolean = checkFunctions.map((item) => item()).every((item) => item);
    event.preventDefault();

    if (canSubmit) window.location.replace('/');
}

function showError(): HTMLElement {
    const error = utils.createElement('div', 'error-massage');
    error.textContent = 'error';

    return error;
}

function checkName(): boolean {
    const name = document.querySelector('.personal-details__name') as HTMLInputElement;
    const error = name.previousElementSibling;
    const valueArr = name.value.trim().split(' ');

    if (valueArr.length >= 2) {
        let count = 0;

        valueArr.forEach((item) => {
            if (item.length >= 3) count += 1;
        });

        if (valueArr.length === count) {
            if (error) error.remove();
            name.classList.remove('error');

            return true;
        }
    }

    name.classList.add('error');
    if (!error) name.before(showError());

    return false;
}

function checkPhone(): boolean {
    const phone = document.querySelector('.personal-details__phone') as HTMLInputElement;
    const error = phone.previousElementSibling;
    const value = phone.value.trim();
    const regExp = new RegExp(/[0-9]/);

    if (value.length > 9 && value[0] === '+' && regExp.test(value)) {
        if (error) error.remove();
        phone.classList.remove('error');

        return true;
    }

    phone.classList.add('error');
    if (!error) phone.before(showError());

    return false;
}

function checkAddress(): boolean {
    const address = document.querySelector('.personal-details__address') as HTMLInputElement;
    const error = address.previousElementSibling;
    const valueArr = address.value.trim().split(' ');

    if (valueArr.length >= 3) {
        let count = 0;

        valueArr.forEach((item) => {
            if (item.length >= 5) count += 1;
        });

        if (valueArr.length === count) {
            if (error) error.remove();
            address.classList.remove('error');

            return true;
        }
    }

    address.classList.add('error');
    if (!error) address.before(showError());

    return false;
}

function checkEmail(): boolean {
    const email = document.querySelector('.personal-details__email') as HTMLInputElement;
    const error = email.previousElementSibling;
    const value = email.value.trim();
    const EMAIL_REGEXP = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i; // eslint-disable-line

    if (EMAIL_REGEXP.test(value)) {
        if (error) error.remove();
        email.classList.remove('error');

        return true;
    }

    email.classList.add('error');
    if (!error) email.before(showError());

    return false;
}

// function checkNameAndAddress(className: string, words: number, wordLength: number): () => boolean {
//     return (): boolean => {
//         const input = document.querySelector(className) as HTMLInputElement;
//         const error: Element | null = input.previousElementSibling;
//         const valueArr = input.value.trim().split(' ');

//         if (valueArr.length >= words) {
//             let count = 0;

//             valueArr.forEach((item) => {
//                 if (item.length >= wordLength) count += 1;
//             });

//             if (valueArr.length === count) {
//                 if (error) error.remove();
//                 input.classList.remove('error');

//                 return true;
//             }
//         }

//         input.classList.add('error');
//         if (!error) input.before(showError());

//         return false;
//     };
// }
