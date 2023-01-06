import * as utils from '../../utils/index';
import { createCatalog } from './catalog/catalog';
import { createAsideBar, showAllFilters } from './filters/filters';
import { showProductsList } from './catalog/products';

export function createFilterPage() {
    const container = utils.createElement('container', 'main-container', 'container');

    const aside = createAsideBar();
    const catalog = createCatalog();

    container.append(aside, catalog);
    document.querySelector('.main')?.append(container);

    showProductsList();
}

document.addEventListener('click', (e) => showAllFilters(e));
