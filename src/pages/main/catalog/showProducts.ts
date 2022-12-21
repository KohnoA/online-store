import products from '../../../constants/products.json';
import { Product } from 'constants/types/types';
import * as utils from '../../../utils/index';
import defaultProductImage from '../../../assets/icons/rsschool-logo.svg';

export function showProductsList(): void {
    const catalogMainFull = utils.createElement('div', 'catalog__main');
    const catalogMainEmpty = document.querySelector('.catalog__main');
    const productList: Array<Product> = products.products;

    for (const item of productList) {
        const productNode = createProductCard(item);

        catalogMainFull.append(productNode);
    }

    catalogMainEmpty?.replaceWith(catalogMainFull);
}

function createProductCard(item: Product): HTMLElement {
    const productItem = utils.createElement('div', 'product');
    const productImage = utils.createElement('img', 'product__image') as HTMLImageElement;
    const productButton = utils.createElement('button', 'product__button');
    const productTitle = utils.createElement('span', 'product__title');
    const urlImage: string = item.thumbnail;
    // const response: Response = await fetch(urlImage);

    productImage.src = defaultProductImage;

    fetch(urlImage)
        .then((res) => {
            productImage.src = res.url;
        })
        .catch((err) => console.log(err));

    productImage.setAttribute('alt', item.title);
    productButton.textContent = 'add to cart';
    productButton.setAttribute('type', 'button');
    productTitle.textContent = item.title;

    productItem.append(productImage);
    productItem.append(productTitle);
    productItem.append(productButton);

    return productItem;
}
