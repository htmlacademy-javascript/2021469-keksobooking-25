import {validateForm, deactivateOfferForm} from './offer-form.js';
import {deactivateMapFiltersForm} from './map-filters-form.js';
import {activateMap} from './map.js';

deactivateOfferForm();
deactivateMapFiltersForm();
activateMap();

validateForm();
