import './styles/style.css';
import image from './assets/images/gorila.jpg';

// const image = require('./assets/images/gorila.jpg');
// console.log(image);

const img = document.querySelector('.logo img') as HTMLImageElement;

img.src = image;
