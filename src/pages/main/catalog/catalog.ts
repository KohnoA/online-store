import * as utils from '../../../utils/index';
import './catalog.scss';

export function createCatalog(): HTMLElement {
    const catalog = utils.createElement('section', 'catalog');
    const h1 = utils.createElement('h1', 'catalog__title');
    const catalogHeader = createCatalogHeader();
    const catalogContainder = utils.createElement('div', 'catalog__main');

    h1.textContent = 'Catalog';

    catalog.append(h1);
    catalog.append(catalogHeader);
    catalog.append(catalogContainder);

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

    const sortValues: Array<string> = [
        'default',
        'price ASC',
        'price DESC',
        'rating ASC',
        'rating DESC',
        'dicount ASC',
        'dicount DESC',
    ];

    sortValues.forEach((item) => {
        const option = document.createElement('option');

        option.setAttribute('value', item);
        option.textContent = item;

        sortSelection.append(option);
    });

    sortDescription.textContent = 'sort by ';

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

    const gridValues: Array<string> = ['4', '5'];

    gridValues.forEach((item) => {
        const option = document.createElement('option');

        option.setAttribute('value', item);
        option.textContent = item;

        gridSelection.append(option);
    });

    gridDescription.textContent = 'show by ';

    container.append(gridDescription);
    container.append(gridSelection);

    return container;
}
