import './catalog.scss';
import * as utils from '../../../utils/index';
import { sortValues, gridValues } from '../../../constants/data/data';

export function createCatalog(): HTMLElement {
    const catalog = utils.createElement('section', 'catalog');
    const h1 = utils.createElement('h1', 'catalog__title');
    const catalogHeader = createCatalogHeader();
    const catalogMain = utils.createElement('div', 'catalog__main', 'catalog__main_three-columns');

    h1.textContent = 'Catalog';

    catalog.append(h1, catalogHeader, catalogMain);

    return catalog;
}

function createCatalogHeader(): HTMLElement {
    const catalogHeader = utils.createElement('div', 'catalog__header');
    const sortSelection = createSortSelection();
    const foundProducts = createNumberOfProducts();
    const searchInput = createSearchProduct();
    const gridSelection = createSelectGrid();

    catalogHeader.append(sortSelection, foundProducts, searchInput, gridSelection);

    return catalogHeader;
}

function createSortSelection(): HTMLElement {
    const container = utils.createElement('div', 'catalog__sort');
    const sortSelection = utils.createElement('select', 'catalog__sort-selection', 'selection') as HTMLSelectElement;
    const sortDescription = utils.createElement('span', 'catalog__sort-description');

    utils.createSelectOptions(sortValues, sortSelection);

    sortDescription.textContent = 'Sort by ';

    sortSelection.addEventListener('change', () =>
        utils.setURLKey('sort', String(sortValues.indexOf(sortValues[sortSelection.selectedIndex])), 'default')
    );

    container.append(sortDescription, sortSelection);

    return container;
}

function createNumberOfProducts(): HTMLElement {
    const p = utils.createElement('p', 'catalog__found-products');
    const span = utils.createElement('span', 'catalog__products-int');

    p.textContent = 'Found: ';
    span.textContent = '0';

    p.append(span);

    return p;
}

function createSearchProduct(): HTMLElement {
    const input = utils.createElement('input', 'catalog__search-product') as HTMLInputElement;

    input.setAttribute('id', 'search-product');
    input.setAttribute('placeholder', 'Search product');
    input.setAttribute('type', 'text');

    input.addEventListener('input', () => utils.setURLKey('search', input.value, ''));

    return input;
}

function createSelectGrid(): HTMLElement {
    const container = utils.createElement('div', 'catalog__grid');
    const gridDescription = utils.createElement('span', 'catalog__grid-Description');
    const gridSelection = utils.createElement('select', 'catalog__grid-selection', 'selection') as HTMLSelectElement;

    utils.createSelectOptions(gridValues, gridSelection);

    gridDescription.textContent = 'Show by ';

    container.append(gridDescription);
    container.append(gridSelection);

    gridSelection.addEventListener('change', () =>
        utils.setURLKey('show', String(!!gridSelection.selectedIndex), 'false')
    );

    return container;
}

export function setGridSelection(value: string | null) {
    const catalogMain = document.querySelector('.catalog__main') as HTMLElement;
    const select = document.querySelector('.catalog__grid-selection') as HTMLSelectElement;

    if (select) {
        value === 'true' ? (select.selectedIndex = 1) : (select.selectedIndex = 0);

        if (value === 'false') {
            catalogMain.classList.remove('catalog__main_four-columns');
            catalogMain.classList.add('catalog__main_three-columns');
        } else if (value === 'true') {
            catalogMain.classList.add('catalog__main_four-columns');
            catalogMain.classList.remove('catalog__main_three-columns');
        }
    }
}
