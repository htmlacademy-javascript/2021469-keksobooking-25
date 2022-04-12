import {unblockSubmitButton, resetForms} from './offer-form.js';
import {showErrorMessage, showSuccessMessage, showErrorDownloadMessage} from './result-message.js';
import {activateMap} from './map.js';
import {deactivateMapFiltersForm,} from './map-filters-form.js';

export const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return  response.json();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showErrorDownloadMessage();
      activateMap([]);
      deactivateMapFiltersForm();
    });
};

export const sendData = (body) => {
  fetch('https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        unblockSubmitButton();
        showSuccessMessage();
        resetForms();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .catch(() => {
      showErrorMessage();
      unblockSubmitButton();
    });
};
