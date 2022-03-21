import {createElement} from './data.js';
import {getNewCard} from './popup.js';

const offersArray = Array.from({length: 10}, createElement);
document.querySelector('#map-canvas').append(getNewCard(offersArray[0]));

