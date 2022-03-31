import {createElement} from './data.js';
import {validateForm, deactivateOfferForm, activateOfferForm} from './offer-form.js';
import {deactivateMapFiltersForm, activateMapFiltersForm} from './map-filters-form.js';
import {getNewCard} from './popup.js';

deactivateOfferForm();
deactivateMapFiltersForm();

const SIMILAR_OFFER_COUNT = 10;
const offersArray = Array.from({length: SIMILAR_OFFER_COUNT}, createElement);
document.querySelector('#map-canvas').append(getNewCard(offersArray[0]));
activateOfferForm();
activateMapFiltersForm();

validateForm();
