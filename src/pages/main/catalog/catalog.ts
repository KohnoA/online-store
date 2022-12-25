import * as utils from '../../../utils/index';
import './catalog.scss';
import { sortValues, gridValues } from '../../../constants/data/data';

export function createCatalog(): HTMLElement {
    const catalog = utils.createElement('section', 'catalog');
    const h1 = utils.createElement('h1', 'catalog__title');
    const catalogHeader = createCatalogHeader();
    const catalogMain = utils.createElement('div', 'catalog__main', 'catalog__main_three-columns');

    h1.textContent = 'Catalog';

    catalog.append(h1);
    catalog.append(catalogHeader);
    catalog.append(catalogMain);

    return catalog;
}

function createCatalogHeader(): HTMLElement {
    const catalogHeader = utils.createElement('div', 'catalog__header');
    const sortSelection = createSortSelection();
    const foundProducts = createNumberOfProducts();
    const searchInput = createSearchProduct();
    const gridSelection = createSelectGrid();

    catalogHeader.append(sortSelection);
    catalogHeader.append(foundProducts);
    catalogHeader.append(searchInput);
    catalogHeader.append(gridSelection);

    return catalogHeader;
}

function createSortSelection(): HTMLElement {
    const container = utils.createElement('div', 'catalog__sort');
    const sortSelection = utils.createElement('select', 'catalog__sort-selection', 'selection');
    const sortDescription = utils.createElement('span', 'catalog__sort-description');

    utils.createSelectOptions(sortValues, sortSelection);

    sortDescription.textContent = 'Sort by ';

    container.append(sortDescription);
    container.append(sortSelection);

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
    const input = utils.createElement('input', 'catalog__search-product');

    input.setAttribute('id', 'search-product');
    input.setAttribute('placeholder', 'Search product');
    input.setAttribute('type', 'text');

    return input;
}

function createSelectGrid(): HTMLElement {
    const container = utils.createElement('div', 'catalog__grid');
    const gridDescription = utils.createElement('span', 'catalog__grid-Description');
    const gridSelection = utils.createElement('select', 'catalog__grid-selection', 'selection');

    utils.createSelectOptions(gridValues, gridSelection);

    gridDescription.textContent = 'Show by ';

    container.append(gridDescription);
    container.append(gridSelection);

    gridSelection.addEventListener('change', setGridSelection);

    return container;
}

function setGridSelection(event: Event): void {
    const catalogMain = document.querySelector('.catalog__main') as HTMLElement;
    const select = event.target;

    if (select && select instanceof HTMLSelectElement) {
        const currentValue = select.selectedIndex;

        if (currentValue === 0) {
            catalogMain.classList.remove('catalog__main_four-columns');
            catalogMain.classList.add('catalog__main_three-columns');
        } else if (currentValue === 1) {
            catalogMain.classList.add('catalog__main_four-columns');
            catalogMain.classList.remove('catalog__main_three-columns');
        }
    }
}
