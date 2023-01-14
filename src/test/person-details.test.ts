/**
 * @jest-environment jsdom
*/

import { checkEmail, checkPhone, checkNameAndAddress } from '../components/popup/check-form';

describe('Checking the validation of the phone number field', () => {
    it('Should return false with an invalid value', () => {
        [   
            '1u721676127361',
            '829189389181',
            '375296680426',
            'Hello, what are you want?'
        ].forEach((value) => {
            document.body.innerHTML = `
                <input class='personal-details__phone' value='${value}'>
            `;
            expect(checkPhone()).toBe(false);
        });
    });
    it('Should return true with an valid value', () => {
        [   
            '+1234567890',
            '+234611910235',
            '    +375442369812',
            '+728600432649    '
        ].forEach((value) => {
            document.body.innerHTML = `
                <input class='personal-details__phone' value='${value}'>
            `;
            expect(checkPhone()).toBe(true);
        });
    });
});

describe('Checking the validation of the email field', () => {
    it('Should return false with an invalid value', () => {
        [   
            '1u721676127361',
            'Yahooo',
            'unitility-123@mailru',
            'PeteAbegelegmail.com'
        ].forEach((value) => {
            document.body.innerHTML = `
                <input class='personal-details__email' value='${value}'>
            `;
            expect(checkEmail()).toBe(false);
        });
    });
    it('Should return true with an valid value', () => {
        [   
            ' piedpiper@hooli.com',
            'ferz2003@gmail.com',
            'markus-ed@yandex.ru ',
            'IvanIvanov@splice.net'
        ].forEach((value) => {
            document.body.innerHTML = `
                <input class='personal-details__email' value='${value}'>
            `;
            expect(checkEmail()).toBe(true);
        });
    });
});

describe('Checking the validation of the name field', () => {
    const wordNumber = 2;
    const wordLength = 3;
    const checkName = checkNameAndAddress('.personal-details__name', wordNumber, wordLength);

    it('Should return false with an invalid name value', () => {
        [   
            'hdwjehfuwbfuwebfwb',
            'Igorev I.',
            'Jack',
            'Another class of functions that is often considered difficult to test is code.'
        ].forEach((value) => {
            document.body.innerHTML = `
                <input class='personal-details__name' value='${value}'>
            `;
            expect(checkName()).toBe(false);
        });
    });
    it('Should return true with an valid name value', () => {
        [   
            'Jack Trawolta Nickolson',
            'Jon Snow',
            'Gomer Simpson  ',
            '       Ivan Ivanov'
        ].forEach((value) => {
            document.body.innerHTML = `
                <input class='personal-details__name' value='${value}'>
            `;
            expect(checkName()).toBe(true);
        });
    });
});

describe('Checking the validation of the address field', () => {
    const wordNumber = 3;
    const wordLength = 5;
    const checkAddress = checkNameAndAddress('.personal-details__address', wordNumber, wordLength);

    it('Should return false with an invalid address value', () => {
        [   
            'Cedar Avenue',
            'Paper St.',
            '45 Arbour Roads',
            'North Los Robles'
        ].forEach((value) => {
            document.body.innerHTML = `
                <input class='personal-details__address' value='${value}'>
            `;
            expect(checkAddress()).toBe(false);
        });
    });
    it('Should return true with an valid address value', () => {
        [   
            'Cedar Avenue Wilmington',
            'Paper Steet Oregon',
            'North Los-Robles Avenue California  ',
            '       Arbour Roads North London'
        ].forEach((value) => {
            document.body.innerHTML = `
                <input class='personal-details__address' value='${value}'>
            `;
            expect(checkAddress()).toBe(true);
        });
    });
});