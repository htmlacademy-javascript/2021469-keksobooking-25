import {sendData} from './network.js';
import {setCenterMarker} from './map.js';

const offerForm = document.querySelector('.ad-form');
const roomsField = offerForm.querySelector('[name="rooms"]');
const guestsField = offerForm.querySelector('[name="capacity"]');
const priceField = offerForm.querySelector('#price');
const buildingTypeField = offerForm.querySelector('[name="type"]');
const timeField = offerForm.querySelector('.ad-form__element--time');
const checkInField = timeField.querySelector('[name="timein"]');
const checkOutField = timeField.querySelector('[name="timeout"]');
const liveFormChildren = offerForm.querySelectorAll('fieldset');
const sliderElement = offerForm.querySelector('.ad-form__slider');
const submitButton = offerForm.querySelector('.ad-form__submit');
const resetButton = offerForm.querySelector('.ad-form__reset');
const mapFiltersForm = document.querySelector('.map__filters');
const buildingPhotoChooser = offerForm.querySelector('.ad-form__upload input[type="file"]');
const buildingPhotoPreview = offerForm. querySelector('.ad-form__photo');
const avatarChooser = offerForm.querySelector('.ad-form__field input[type="file"]');
const avatarPreview = offerForm. querySelector('.ad-form-header__preview');

const PHOTO_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const priceOption = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000'
};

const pristine = new Pristine(offerForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
}, false);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const buttonSubmitHandler = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(formData);
  }
};

const addPhotos = (fileChooser, preview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = PHOTO_FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    if (preview.firstChild) {
      preview.firstChild.src = URL.createObjectURL(file);
    } else {
      const photo = document.createElement('img');
      photo.src = URL.createObjectURL(file);
      preview.appendChild(photo);
    }
  }
};

const validateChecking = (evt) => {
  if (evt.target.matches('select[name="timein"]')) {
    checkOutField.value = evt.target.value;
  } else {
    checkInField.value = evt.target.value;
  }
};

export const deactivateOfferForm = () => {
  offerForm.classList.add('ad-form--disabled');
  for (const child of liveFormChildren) {
    child.setAttribute('disabled', true);
  }
  offerForm.removeEventListener('submit', buttonSubmitHandler);
  timeField.removeEventListener('change', validateChecking);
  priceField.removeEventListener('keyup', syncSlider);
};

export const activateOfferForm = () => {
  offerForm.classList.remove('ad-form--disabled');
  for (const child of liveFormChildren) {
    child.removeAttribute('disabled');
  }
  offerForm.addEventListener('submit', buttonSubmitHandler);
  timeField.addEventListener('change', validateChecking);
  priceField.addEventListener('keyup', syncSlider);
};

export const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export const resetForms = () => {
  offerForm.reset();
  mapFiltersForm.reset();
  setCenterMarker();
  sliderElement.noUiSlider.set(0);
  priceField.placeholder = '1000';
  buildingPhotoPreview.removeChild(buildingPhotoPreview.firstChild);
  avatarPreview.firstChild.src = 'img/muffin-grey.svg';
};

function syncSlider () {
  sliderElement.noUiSlider.set(priceField.value);
}

export const validateForm = () => {

  const onBuildingTypeChange = () => {
    priceField.placeholder = priceOption[buildingTypeField.value];
    sliderElement.noUiSlider.set(priceOption[buildingTypeField.value]);
    pristine.validate(priceField);
  };

  offerForm
    .querySelectorAll('[name="type"]')
    .forEach((item) => item.addEventListener('change', onBuildingTypeChange));

  const validatePrice = (value) => {
    sliderElement.noUiSlider.set(value);
    return parseInt(value, 10) > priceOption[buildingTypeField.value];
  };

  const getPriceErrorMessage = () => `Внимание! Минимальная цена за ночь - ${priceOption[buildingTypeField.value]} руб.`;

  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 1000,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });

  priceField.addEventListener('keyup', syncSlider);

  sliderElement.noUiSlider.on('slide', () =>{
    priceField.value = sliderElement.noUiSlider.get();
  });

  const validateCapacity = () => {
    if (roomsField.value === '100' && guestsField.value === '0') {
      return true;
    } else if ((roomsField.value === '100') || (guestsField.value === '0')) {
      return false;
    } else if (roomsField.value >= guestsField.value) {
      return true;
    }
    return false;
  };

  const getCapacityErrorMessage = () => ` Внимание! ${roomsField.options[roomsField.selectedIndex].text} не подходит под вариант:
     ${guestsField.options[guestsField.selectedIndex].text}`;

  pristine.addValidator(guestsField, validateCapacity, getCapacityErrorMessage);

  timeField.addEventListener('change', validateChecking);
  buildingPhotoChooser.addEventListener('change', () => addPhotos(buildingPhotoChooser, buildingPhotoPreview));
  avatarChooser.addEventListener('change', () => addPhotos(avatarChooser, avatarPreview));

  offerForm.addEventListener('submit', buttonSubmitHandler);
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForms();
  });
};
