import './styles/index.scss';
import { createApp } from './pages/app/createApp';
import { createFilterPage } from './pages/main/filters/filters';
import { showProductsList } from './pages/main/catalog/products';

createApp();
createFilterPage();
showProductsList();
