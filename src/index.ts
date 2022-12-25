import './styles/index.scss';
import { createApp } from './pages/app/createApp';
import { createFilterPage } from './pages/main/index';
import { showProductsList } from './pages/main/catalog/products';

createApp();
createFilterPage();
showProductsList();
