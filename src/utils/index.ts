export function createElement(element: string, className: string, anotherClass?: string): HTMLElement {
    const elem = document.createElement(element);

    if (anotherClass) {
        elem.classList.add(className, anotherClass);
    } else {
        elem.classList.add(className);
    }

    return elem;
}

export function createSelectOptions(arrValues: Array<string>, instert: HTMLElement): void {
    arrValues.forEach((item) => {
        const option = document.createElement('option');

        option.setAttribute('value', item);
        option.textContent = item;

        instert.append(option);
    });
}
