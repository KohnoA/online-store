import './styles/index.scss';
import { createApp } from './pages/app/createApp';
import { createFilterPage } from './pages/main/index';
import { showProductsList } from './pages/main/catalog/products';
// import { create404page } from './pages/404/404';

createApp();
createFilterPage();
showProductsList();
// create404page();
