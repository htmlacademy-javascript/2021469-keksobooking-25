const form = document.querySelector('.ad-form');
const roomsField = form.querySelector('[name="rooms"]');
const guestsField = form.querySelector('[name="capacity"]');
const priceField = form.querySelector('#price');
const buildingTypeField = form.querySelector('[name="type"]');

export function validateForm () {
  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'p',
    errorTextClass: 'form__error'
  }, false);

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

  form
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

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      form.submit();
    }
  });
}
