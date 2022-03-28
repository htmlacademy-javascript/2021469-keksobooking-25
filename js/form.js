const form = document.querySelector('.ad-form');

export function validateForm () {
  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextParent: 'ad-form__element',
    errorTextTag: 'p',
    errorTextClass: 'form__error'
  }, false);

  function validateTitle (value) {
    return value.length >= 30 && value.length <=100;
  }

  pristine.addValidator(
    form.querySelector('#title'),
    validateTitle,
    'От 30 до 100 символов'
  );

  function validatePrice (value) {
    return value.length && parseInt(value, 10) <= 100000;
  }

  pristine.addValidator(
    form.querySelector('#price'),
    validatePrice,
    'Максимальное значение - 100 000'
  );

  const RoomsField = form.querySelector('[name="rooms"]');
  const GuestsField = form.querySelector('[name="capacity"]');
  const capacityOption = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  function validateCapacity () {
    return  capacityOption[RoomsField.value].includes(GuestsField.value);
  }

  function getCapacityErrorMessage () {
    return `${RoomsField.options[RoomsField.selectedIndex].text} не подходит для варианта:
      ${GuestsField.options[GuestsField.selectedIndex].text}`;
  }

  pristine.addValidator(GuestsField, validateCapacity, getCapacityErrorMessage);

  return pristine.validate();
}
