import './cart-products.scss';
import * as utils from '../../../utils/index';
import { cartArray } from '../../../constants/data/data';
import { Product, ArgsDecInc, ArgsCreateNumberControl } from 'constants/types/types';
import { setProductImage } from '../../main/catalog/products';
import { cartIsEmpty } from '../cart';
import { recalculationTotalCash, clearPromoCodes } from '../summary/summary';
import { prevPage, limitItemsInPage } from './pagination';

export function createCartProducts(from = 1, to = 3): HTMLElement {
    const mainList = utils.createElement('div', 'in-cart__main');
    cartArray.forEach((item, index) => {
        const itemNumber = index + 1;

        if (itemNumber >= from && itemNumber <= to) {
            mainList.append(createProductCard(item, index));
        }
    });

    return mainList;
}

function createProductCard(item: Product, index: number): HTMLElement {
    const card = utils.createElement('a', 'cart-product', 'product');
    const productNumber = utils.createElement('div', 'cart-product__number');
    const productImage = utils.createElement('div', 'cart-product__image');
    const productId = utils.createElement('span', 'product__id');
    const productInfo = createProductInfo(item.title, item.description, item.rating, item.discountPercentage);
    const numberControl = createNumberControl(item.stock, item.price, item.id, card, item.count);

    productNumber.textContent = `${index + 1}`;
    productId.textContent = `${item.id}`;
    setProductImage(productImage, item.thumbnail);

    card.append(productId, productNumber, productImage, productInfo, numberControl);

    return card;
}

function createProductInfo(title: string, desc: string, rating: number, discount: number): HTMLElement {
    const productInfo = utils.createElement('div', 'cart-product__info');
    const productTitle = utils.createElement('p', 'cart-product__title');
    const productDescription = utils.createElement('p', 'cart-product__description');
    const ratingDiscountWrapper = utils.createElement('div', 'cart-product__wrapper');
    const productRating = utils.createElement('span', 'cart-product__rating');
    const productDiscount = utils.createElement('span', 'cart-product__discount');

    productTitle.textContent = title;
    productDescription.textContent = desc;
    productRating.textContent = `Rating: ${rating}`;
    productDiscount.textContent = `Discount: -${discount}%`;

    ratingDiscountWrapper.append(productRating, productDiscount);
    productInfo.append(productTitle, productDescription, ratingDiscountWrapper);

    return productInfo;
}

function createNumberControl(...args: ArgsCreateNumberControl): HTMLElement {
    const numberControl = utils.createElement('div', 'cart-product__number-control');
    const productStock = utils.createElement('p', 'cart-product__stock');
    const productPrice = utils.createElement('p', 'cart-product__price');
    const controls = utils.createElement('div', 'number-controls');
    const count = utils.createElement('span', 'number-controls__count');
    const dec = utils.createElement('button', 'number-controls__dec');
    const inc = utils.createElement('button', 'number-controls__inc');
    const [stock, price, id, card, itemCount] = args;

    productStock.textContent = `Stock: ${stock}`;
    count.textContent = itemCount ? String(itemCount) : '1';
    productPrice.textContent = itemCount ? `${price * itemCount}€` : `${price}€`;
    dec.textContent = '+';
    dec.setAttribute('type', 'button');
    inc.textContent = '-';
    inc.setAttribute('type', 'button');

    const decIncInstance = decIncNumberOfProduct(price, id, card);
    controls.addEventListener('click', decIncInstance);

    controls.append(dec, count, inc);
    numberControl.append(productStock, controls, productPrice);

    return numberControl;
}

function decIncNumberOfProduct(originPrice: number, id: number, card: HTMLElement): (event: Event) => void {
    return (event: Event) => {
        if (event.target && event.target instanceof HTMLElement) {
            const target = event.target;
            const countNode = card.querySelector('.number-controls__count') as HTMLElement;
            const priceNode = card.querySelector('.cart-product__price') as HTMLElement;
            const currentProduct = cartArray.find((item) => item.id === id) as Product;
            const argsDecInc: ArgsDecInc = [card, countNode, priceNode, currentProduct, originPrice];

            if (target.closest('.number-controls__dec')) decNumberOfProduct(argsDecInc);
            else if (target.closest('.number-controls__inc')) incNumberOfProduct(argsDecInc);

            utils.setSumAndQuantityInCart(
                document.getElementById('total-cash'),
                document.getElementById('count-purchases')
            );
            utils.setSumAndQuantityInCart(
                document.querySelector('.summary__cash-int'),
                document.querySelector('.summary__amount-int')
            );

            if (cartArray.length === 0) {
                cartIsEmpty();
                clearPromoCodes();
            } else recalculationTotalCash();
        }
    };
}

function decNumberOfProduct(args: ArgsDecInc): void {
    const [card, countNode, priceNode, currentProduct, originPrice] = args;
    const stockNode = card.querySelector('.cart-product__stock') as HTMLElement;
    const stockNum = Number(stockNode.textContent?.slice(-2));
    const resultCount = Number(countNode.textContent) + 1;

    if (resultCount > stockNum) return;

    if (cartArray.includes(currentProduct)) {
        cartArray.forEach((item) => {
            if (item === currentProduct) {
                item.count ? (item.count += 1) : (item.count = 2);
            }
        });
    }

    priceNode.textContent = `${originPrice * resultCount}€`;
    countNode.textContent = String(resultCount);
}

function incNumberOfProduct(args: ArgsDecInc): void {
    const [card, countNode, priceNode, currentProduct, originPrice] = args;
    const resultCount = Number(countNode.textContent) - 1;
    const currentPrice = Number(priceNode.textContent?.slice(0, -1));
    const cartMain = document.querySelector('.in-cart__main') as HTMLElement;
    const currentPage = document.getElementById('current-page-cart') as HTMLElement;
    const currentPageNumber = Number(currentPage.textContent);

    cartArray.forEach((item, index, array) => {
        if (item === currentProduct) {
            if (!item.count || item.count <= 1) {
                array.splice(index, 1);
                card.remove();

                if (cartMain.innerHTML === '' && currentPageNumber !== 1) {
                    prevPage();
                } else {
                    const limitItemsInPageInstance = limitItemsInPage(currentPageNumber);
                    limitItemsInPageInstance();
                }
            } else item.count -= 1;
        }
    });

    priceNode.textContent = `${currentPrice - originPrice}€`;
    countNode.textContent = String(resultCount);
}
