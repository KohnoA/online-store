import productsJson from '../../../constants/products.json';
import * as func from '../../../utils/index';
import { Product } from 'constants/types/types';

export function createPriceAndStockSlider(form: HTMLElement, category: string) {
    const slidersControl = func.createElement('div', 'aside-product-form-slider', 'aside-slider');

    const formControl = func.createElement('div', 'aside-product-form-control', 'aside-control');
    const inputMin = createInputDualSlider(category, 'min', `inputMin${category}`);
    const inputMax = createInputDualSlider(category, 'max', `inputMax${category}`);

    const formControlMin = createDualSliderControls('min', inputMin);
    const arrow = func.createElement('span', 'aside-slider-control__arrow');
    arrow.textContent = '⟷';
    const formControlMax = createDualSliderControls('max', inputMax);

    formControl.append(formControlMin, arrow, formControlMax);
    slidersControl.append(inputMin, inputMax);

    form.append(formControl, slidersControl);
    window.addEventListener('input', (e) =>
        setValueInput(inputMin, formControlMin, inputMax, formControlMax, e, category)
    );
}

function setValueInput(
    inputMin: HTMLInputElement,
    formControlMin: HTMLInputElement,
    inputMax: HTMLInputElement,
    formControlMax: HTMLInputElement,
    e: Event,
    category: string
) {
    if (!(e.target as HTMLElement).closest('.aside-slider__input')) return;

    const [min, max] = getValueInput(inputMin, inputMax);
    // if (formControlMin.value === formControlMax.value) {
    //     const container = document.querySelector('.aside-control') as HTMLElement;
    //     container.innerHTML = '';
    // }
    if (Number(min) <= Number(max)) {
        formControlMin.value = min;
        inputMin.setAttribute('value', min);
        formControlMax.value = max;
        inputMax.setAttribute('value', max);
    } else {
        formControlMin.value = max;
        inputMin.setAttribute('value', max);
        formControlMax.value = min;
        inputMax.setAttribute('value', min);
    }
    setZIndex(e, inputMin, inputMax);
    coloredSlider(inputMin, inputMax, category);
}

function getValueInput(inputMin: HTMLInputElement, inputMax: HTMLInputElement) {
    const min = inputMin.value;
    const max = inputMax.value;
    return [min, max];
}

function setZIndex(e: Event, inputMin: HTMLInputElement, inputMax: HTMLInputElement) {
    const target = e.target as HTMLInputElement;
    if (target === inputMin) {
        inputMin.classList.add('aside-slider__input_active');
        inputMax.classList.remove('aside-slider__input_active');
    } else if (target === inputMax) {
        inputMin.classList.remove('aside-slider__input_active');
        inputMax.classList.add('aside-slider__input_active');
    }
}

function coloredSlider(inputMin: HTMLInputElement, inputMax: HTMLInputElement, category: string) {
    const min = Number(inputMin.min);
    const max = Number(inputMin.max);
    const length = max - min;
    const start = Number(inputMin.value) - min;
    const end = Number(inputMax.value) - min;

    const slider = document.querySelector(`#inputMin${category}`) as HTMLInputElement;
    const from = start <= end ? start : end;
    const to = start <= end ? end : start;

    slider.style.background = `linear-gradient(
        to right,
        #f2f2f2 0%,
        #f2f2f2 ${(from / length) * 100}%,
        #c4bebe ${(from / length) * 100}%,
        #c4bebe ${(to / length) * 100}%,
        #f2f2f2 ${(to / length) * 100}%,
        #f2f2f2 100%)`;
}

function createInputDualSlider(category: string, minMax: string, id: string) {
    const input = func.createElement('input', 'aside-slider__input') as HTMLInputElement;
    input.id = id;
    input.type = 'range';
    input.min = getMinMaxPriceOrStock(productsJson.products, category, 'min');
    input.max = getMinMaxPriceOrStock(productsJson.products, category, 'max');
    input.setAttribute('value', input[minMax]);
    return input;
}

function createDualSliderControls(maxMin: string, input: HTMLInputElement) {
    const control = func.createElement(
        'input',
        'aside-slider-control__num',
        `aside-slider-control__num_${maxMin}`
    ) as HTMLInputElement;
    control.type = 'number';
    control.value = input.value;
    return control;
}

function getMinMaxPriceOrStock(jsonArr: Product[], category: string, maxMin: string) {
    let value: string | undefined;

    jsonArr.forEach((elem) => {
        if (maxMin === 'min') {
            if (!value || elem[category] < value) value = elem[category];
        } else if (maxMin === 'max') {
            if (!value || elem[category] > value) value = elem[category];
        }
    });

    return typeof value !== 'undefined' ? value.toString() : '';
}
