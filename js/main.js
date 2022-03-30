import {createElement} from './data.js';
import { validateForm, setInactiveСondition, setActiveСondition} from './form.js';
import {getNewCard} from './popup.js';

const offerForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
setInactiveСondition(mapFiltersForm, mapFiltersForm.classList[0]);
setInactiveСondition(offerForm, offerForm.classList[0]);

const SIMILAR_OFFER_COUNT = 10;
const offersArray = Array.from({length: SIMILAR_OFFER_COUNT}, createElement);
document.querySelector('#map-canvas').append(getNewCard(offersArray[0]));

validateForm();
setActiveСondition(mapFiltersForm, mapFiltersForm.classList[0]);
setActiveСondition(offerForm, offerForm.classList[0]);
