import * as utils from '../../utils/index';
import { createPageHeader } from '../../components/header/header';
import { createFooter } from '../../components/footer/footer';

export function createApp(): void {
    const body = document.querySelector('.body') as HTMLElement;
    const header = createPageHeader();
    const main = utils.createElement('main', 'main');
    const footer = createFooter();

    body.append(header);
    body.append(main);
    body.append(footer);
}