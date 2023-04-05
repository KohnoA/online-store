import './footer.scss';
import rssImageSrc from '../../assets/icons/rsschool-logo.svg';

export function createFooter(): HTMLElement {
    const footer = document.createElement('footer');
    const container = document.createElement('div');
    const logo = document.createElement('p');
    const rssContainer = createRss();
    const githubsContainer = createGitHubs();

    footer.classList.add('footer');
    container.classList.add('container');
    logo.classList.add('footer__logo');

    logo.textContent = 'Online Store';

    container.append(rssContainer);
    container.append(logo);
    container.append(githubsContainer);
    footer.append(container);

    return footer;
}

function createGitHubs(): HTMLElement {
    const githubLinks = document.createElement('p');
    const githubSqooa = document.createElement('a');
    const githubKohnoa = document.createElement('a');

    githubLinks.classList.add('footer__production');
    githubSqooa.classList.add('footer__aqooa');
    githubKohnoa.classList.add('footer__kohnoa');

    githubLinks.textContent = 'Production: ';
    githubSqooa.textContent = 'shamkolovich95';
    githubKohnoa.textContent = 'kohnoa';
    githubSqooa.setAttribute('href', 'https://github.com/shamkolovich95');
    githubKohnoa.setAttribute('href', 'https://github.com/KohnoA');

    githubLinks.append(githubSqooa);
    githubLinks.append(' / ');
    githubLinks.append(githubKohnoa);

    return githubLinks;
}

function createRss(): HTMLElement {
    const rssLink = document.createElement('a');
    const rssImage = document.createElement('img');

    rssLink.classList.add('rss');
    rssImage.classList.add('rss__image');

    rssImage.src = rssImageSrc;
    rssLink.setAttribute('href', 'https://rs.school/js/');
    rssImage.setAttribute('alt', 'Rsschool');

    rssLink.append(rssImage);

    return rssLink;
}
