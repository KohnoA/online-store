import './styles/index.scss';
import { createApp } from './components/createApp';
import { createFilterPage } from './pages/main/index';
import { showProductsList } from './pages/main/catalog/showProducts';

createApp();
createFilterPage();
showProductsList(); //Потом перенести в main/index.ts
