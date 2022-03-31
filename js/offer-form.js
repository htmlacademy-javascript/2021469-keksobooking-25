const offerForm = document.querySelector('.ad-form');
const roomsField = offerForm.querySelector('[name="rooms"]');
const guestsField = offerForm.querySelector('[name="capacity"]');
const priceField = offerForm.querySelector('#price');
const buildingTypeField = offerForm.querySelector('[name="type"]');
const timeField = offerForm.querySelector('.ad-form__element--time');
const checkInField = timeField.querySelector('[name="timein"]');
const checkOutField = timeField.querySelector('[name="timeout"]');
const liveFormChildren = offerForm.querySelectorAll('fieldset');

export function deactivateOfferForm () {
  offerForm.classList.add('ad-form--disabled');
  for (const child of liveFormChildren) {
    child.setAttribute('disabled', 'disabled');
  }
  offerForm.removeEventListener('submit', buttonSubmitHandler);
  timeField.removeEventListener('change', validateChecking);
}

export function activateOfferForm () {
  offerForm.classList.remove('ad-form--disabled');
  for (const child of liveFormChildren) {
    child.removeAttribute ('disabled', 'disabled');
  }
  offerForm.addEventListener('submit', buttonSubmitHandler);
  timeField.addEventListener('change', validateChecking);
}

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, false);

function buttonSubmitHandler (evt) {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    offerForm.submit();
  }
}
function validateChecking(evt) {
  if (evt.target.matches('select[name="timein"]')) {
    checkOutField.value = evt.target.value;
  } else {
    checkInField.value = evt.target.value;
  }
}
export function validateForm () {
  const priceOption = {
    'bungalow': '0',
    'flat': '1000',
    'hotel': '3000',
    'house': '5000',
    'palace': '10000'
  };

  function onBuildingTypeChange () {
    priceField.placeholder = priceOption[buildingTypeField.value];
    pristine.validate(priceField);
  }

  offerForm
    .querySelectorAll('[name="type"]')
    .forEach((item) => item.addEventListener('change', onBuildingTypeChange));

  function validatePrice (value) {
    return parseInt(value, 10) > priceOption[buildingTypeField.value];
  }

  function getPriceErrorMessage () {
    return `Внимание! Минимальная цена за ночь - ${priceOption[buildingTypeField.value]} руб.`;
  }

  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

  function validateCapacity () {
    if (roomsField.value === '100' && guestsField.value === '0') {
      return true;
    } else if ((roomsField.value === '100') || (guestsField.value === '0')) {
      return false;
    } else if (roomsField.value >= guestsField.value) {
      return true;
    }
    return false;
  }

  function getCapacityErrorMessage () {
    return ` Внимание! ${roomsField.options[roomsField.selectedIndex].text} не подходит под вариант:
      ${guestsField.options[guestsField.selectedIndex].text}`;
  }

  pristine.addValidator(guestsField, validateCapacity, getCapacityErrorMessage);

  timeField.addEventListener('change', validateChecking);

  offerForm.addEventListener('submit', buttonSubmitHandler);
}
