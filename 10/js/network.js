import {unblockSubmitButton, resetForms} from './offer-form.js';
import {getErrorMessage, getSuccessMessage, getErrorDownloadMessage} from './result-message.js';
import {activateMap} from './map.js';

export function getData () {
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
      getErrorDownloadMessage();
      activateMap([]);
    });
}

export function sendData (body) {
  fetch('https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        unblockSubmitButton();
        getSuccessMessage();
        resetForms();
      } else {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    })
    .catch(() => {
      getErrorMessage();
      unblockSubmitButton();
    });
}
