import {validateForm, deactivateOfferForm} from './offer-form.js';
import {deactivateMapFiltersForm} from './map-filters-form.js';
import {getData} from './network.js';

deactivateOfferForm();
deactivateMapFiltersForm();
getData();

validateForm();
