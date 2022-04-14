import {validateForm, deactivateOfferForm} from './offer-form.js';
import {getData} from './network.js';
import {deactivateMapFiltersForm, beginToFilterOffers, setfilterFieldsClick} from './map-filters-form.js';
import {debounce} from './util.js';
import {activateMap} from './map.js';

const RERENDER_DELAY = 500;

deactivateOfferForm();
deactivateMapFiltersForm();

getData((offers) => {
  activateMap(offers);
  setfilterFieldsClick(debounce(
    () => beginToFilterOffers(offers),
    RERENDER_DELAY));
});

validateForm();
