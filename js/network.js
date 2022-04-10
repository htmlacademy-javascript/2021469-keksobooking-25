import {unblockSubmitButton, resetForms} from './offer-form.js';
import {showErrorMessage, showSuccessMessage, showErrorDownloadMessage} from './result-message.js';
import {activateMap} from './map.js';

export const getData = () => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .then((cards) => {
      activateMap(cards);
    })
    .catch(() => {
      showErrorDownloadMessage();
      activateMap([]);
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
