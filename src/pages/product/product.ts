import './product.scss';
import * as utils from '../../utils/index';
import products from '../../constants/products.json';
import { Product } from 'constants/types/types';
import { setProductImage, setButtonInCart } from '../main/catalog/products';
import { showPopUp } from '../../components/popup/popup';
import { cartArray } from '../../constants/data/data';
import { routing } from '../app/createApp';

export function createProductPage(): void {
    const productId = Number(window.location.hash.split('/')[1]) - 1;
    const productObj: Product = products.products[productId];
    const main = document.querySelector('.main') as HTMLElement;
    const container = utils.createElement('div', 'container', 'product-page-container');

    const breadCrumbs = createBreadCrumbs(productObj);
    const productInfo = createDescription(productObj);

    container.append(breadCrumbs, productInfo);
    main.append(container);
}

function createBreadCrumbs(productObj: Product): HTMLElement {
    const breadCrumbs = utils.createElement('div', 'bread-crumbs');
    let i = 1;

    while (i <= 4) {
        const item = utils.createElement('a', 'bread-crumbs__item');
        item.setAttribute('href', '#');

        if (i === 1) item.textContent = 'Store';
        if (i === 2) item.textContent = `${productObj.category}`;
        if (i === 3) item.textContent = `${productObj.brand}`;
        if (i === 4) item.textContent = `${productObj.title}`;

        if (i !== 4) breadCrumbs.append(item, '>>');
        else breadCrumbs.append(item);
        i += 1;
    }

    breadCrumbs.addEventListener('click', (event: Event) => {
        const target = event.target;
        if (target && target instanceof HTMLElement && target.textContent !== 'Store') {
            event.preventDefault();
        }
    });
    return breadCrumbs;
}

function createDescription(productObj: Product): HTMLElement {
    const productInfo = utils.createElement('div', 'product-info');
    const title = utils.createElement('h3', 'product-info__title');
    const wrapper = utils.createElement('div', 'product-info__wrapper');
    const productPhoto = utils.createElement('div', 'product-photo');
    const slidesWrap = utils.createElement('div', 'slides');
    const grandPhoto = utils.createElement('div', 'grand-photo') as HTMLImageElement;
    const description = createDesc(productObj);
    const price = utils.createElement('div', 'product-price-buttons');
    const addButton = utils.createElement('button', 'product__button');
    const buyNow = utils.createElement('button', 'summary__buy-now');
    const priceItem = utils.createElement('div', 'product-page-price');

    setProductImagesNoDublicates(productObj.images, slidesWrap);

    priceItem.textContent = `${productObj.price}€`;
    addButton.setAttribute('type', 'button');
    buyNow.setAttribute('type', 'button');
    addButton.textContent = 'Add to cart';
    buyNow.textContent = 'Buy now';
    setProductImage(grandPhoto, productObj.thumbnail);
    title.textContent = productObj.title;

    if (cartArray.some((item) => item.id === productObj.id)) {
        setButtonInCart(addButton);
    }

    price.append(priceItem, addButton, buyNow);
    productPhoto.append(slidesWrap, grandPhoto);
    wrapper.append(productPhoto, description, price);
    productInfo.append(title, wrapper);

    slidesWrap.addEventListener('click', changePhoto);
    buyNow.addEventListener('click', () => {
        if (!cartArray.some((item) => item.id === productObj.id)) cartArray.push(productObj);
        window.history.pushState({}, '', '#cart');
        routing();
        showPopUp();
        utils.setSumAndQuantityInCart(
            document.getElementById('total-cash'),
            document.getElementById('count-purchases')
        );
    });
    addButton.addEventListener('click', () => {
        setButtonInCart(addButton);

        utils.dropOrSetItemInCart(productObj);
        utils.setSumAndQuantityInCart(
            document.getElementById('total-cash'),
            document.getElementById('count-purchases')
        );
    });

    return productInfo;
}

async function setProductImagesNoDublicates(arr: Array<string>, container: HTMLElement): Promise<void> {
    const sizeImages: Array<number> = [];

    for (const src of arr) {
        const image = utils.createElement('div', 'slide');

        const res = await fetch(src);
        const size = (await res.blob()).size;

        if (!sizeImages.includes(size)) {
            setProductImage(image, src);
            container.append(image);
        }

        sizeImages.push(size);
    }
}

function changePhoto(event: Event): void {
    const grandPhoto = document.querySelector('.grand-photo') as HTMLElement;
    const target = event.target;
    if (!(target instanceof HTMLElement) || !target) return;
    const currentImage = target.getAttribute('style');

    if (currentImage) grandPhoto.setAttribute('style', currentImage);
}

function createDesc(productObj: Product): HTMLElement {
    const description = utils.createElement('div', 'product-page-desc');
    let i = 1;

    while (i <= 6) {
        const item = utils.createElement('div', 'desc-item');
        const itemName = utils.createElement('h4', 'desc-name');
        const itemText = utils.createElement('p', 'desc-text');

        if (i === 1) {
            itemName.textContent = 'Description:';
            itemText.textContent = productObj.description;
        } else if (i === 2) {
            itemName.textContent = 'Discount Percentage:';
            itemText.textContent = String(productObj.discountPercentage);
        } else if (i === 3) {
            itemName.textContent = 'Rating:';
            itemText.textContent = String(productObj.rating);
        } else if (i === 4) {
            itemName.textContent = 'Stock:';
            itemText.textContent = String(productObj.stock);
        } else if (i === 5) {
            itemName.textContent = 'Brand:';
            itemText.textContent = productObj.brand;
        } else if (i === 6) {
            itemName.textContent = 'Brand:';
            itemText.textContent = productObj.category;
        }

        item.append(itemName, itemText);
        description.append(item);
        i += 1;
    }

    return description;
}
