import * as utils from '../../utils/index';
import { PaySystems } from '../../constants/data/data';

function showError(): HTMLElement {
    const error = utils.createElement('div', 'error-massage');
    error.textContent = 'error';

    return error;
}

export function checkPhone(): boolean {
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

export function checkEmail(): boolean {
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

export function checkNameAndAddress(className: string, words: number, wordLength: number): () => boolean {
    return (): boolean => {
        const input = document.querySelector(className) as HTMLInputElement;
        const error = input.previousElementSibling;
        const valueArr = input.value.trim().split(' ');

        if (valueArr.length >= words) {
            let count = 0;

            valueArr.forEach((item) => {
                if (item.length >= wordLength) count += 1;
            });

            if (valueArr.length === count) {
                if (error) error.remove();
                input.classList.remove('error');

                return true;
            }
        }

        input.classList.add('error');
        if (!error) input.before(showError());

        return false;
    };
}

export function checkCvv(): boolean {
    const cvv = document.querySelector('.card__cvv') as HTMLInputElement;
    const error = cvv.previousElementSibling;
    const value = cvv.value;

    cvv.value = value.replace(/\D/, '');

    if (value.length >= 3) {
        cvv.value = value.slice(0, 3);
        if (error) error.remove();
        cvv.classList.remove('error-card');

        return true;
    }

    cvv.classList.add('error-card');
    if (!error) cvv.before(showError());

    return false;
}

export function checkValid(): boolean {
    const valid = document.querySelector('.card__valid') as HTMLInputElement;
    const error = valid.previousElementSibling;
    const value = valid.value;

    if (value.length >= 5) {
        valid.value = value.slice(0, 5);
        const valueArr = valid.value.split('/');
        const month = Number(valueArr[0]);
        const day = Number(valueArr[1]);

        if (!isNaN(month) && !isNaN(day)) {
            if (month <= 12 && month > 0 && day <= 31 && day > 0) {
                valid.classList.remove('error-card');
                if (error) error.remove();

                return true;
            }
        }
    }

    if (value.length === 2) {
        valid.value = `${value}/`;
    }

    valid.onkeydown = (keyboardEvent) => {
        if (keyboardEvent.key === 'Backspace' && value.length === 3) {
            valid.value = value.replace(/\//, '');
        }
    };

    valid.classList.add('error-card');
    if (!error) valid.before(showError());

    return false;
}

export function checkCardNumber(): boolean {
    const cardNumber = document.querySelector('.card__number') as HTMLInputElement;
    const system = document.querySelector('.card__system') as HTMLElement;
    const error = cardNumber.nextElementSibling;
    const value = cardNumber.value;

    cardNumber.value = value.replace(/\D/, '');

    if (value[0] === PaySystems.visa) {
        system.style.backgroundImage = `url('https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png')`;
        system.style.backgroundSize = '70%';
    } else if (value[0] === PaySystems.mastercard) {
        system.style.backgroundImage = `url('https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg')`;
        system.style.backgroundSize = '65%';
    } else if (value[0] === PaySystems.maestro) {
        system.style.backgroundImage = `url('https://brand.mastercard.com/content/dam/mccom/brandcenter/thumbnails/mcbc_dla_maestro-vrt-pos_60px.png')`;
        system.style.backgroundSize = '65%';
    } else {
        system.style.backgroundImage = `url('https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71')`;
        system.style.backgroundSize = 'cover';
    }

    if (value.length >= 16) {
        cardNumber.value = value.slice(0, 16);
        cardNumber.classList.remove('error-card');
        if (error) error.remove();

        return true;
    }

    cardNumber.classList.add('error-card');
    if (!error) cardNumber.after(showError());

    return false;
}
