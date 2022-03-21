import {createElement} from './data.js';
import {getNewCard} from './popup.js';

document.querySelector('#map-canvas').append(getNewCard());
Array.from({length: 10}, createElement);
