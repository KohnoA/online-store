import './404.scss';
import * as utils from '../../utils/index';

export function create404page(): void {
    const main = document.querySelector('.main') as HTMLElement;
    const container = utils.createElement('div', 'container');
    const wrapper = utils.createElement('div', 'page-not-found');
    const code = utils.createElement('p', 'page-not-found__code');
    const description = utils.createElement('p', 'page-not-found__description');

    code.textContent = '404';
    description.textContent = 'Page not found';

    wrapper.append(code);
    wrapper.append(description);
    container.append(wrapper);
    main.append(container);
}
