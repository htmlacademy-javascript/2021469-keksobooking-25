import {createElement} from './data.js';
import { validateForm, setInactiveСondition, setActiveСondition} from './form.js';
import {getNewCard} from './popup.js';

const formsCollection = document.querySelectorAll('form');
setInactiveСondition(formsCollection);

const SIMILAR_OFFER_COUNT = 10;
const offersArray = Array.from({length: SIMILAR_OFFER_COUNT}, createElement);
document.querySelector('#map-canvas').append(getNewCard(offersArray[0]));

setActiveСondition(formsCollection);

validateForm();
