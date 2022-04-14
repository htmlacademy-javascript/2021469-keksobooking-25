import {similarMarkerGroup, createSimilarMarker} from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const formChildren = mapFiltersForm.querySelectorAll('fieldset, select');
const typeField = mapFiltersForm.querySelector('#housing-type');
const priceField = mapFiltersForm.querySelector('#housing-price');
const roomsField = mapFiltersForm.querySelector('#housing-rooms');
const guestsField = mapFiltersForm.querySelector('#housing-guests');
const filterFields = mapFiltersForm.querySelectorAll('select, input');
const inputFields = mapFiltersForm.querySelectorAll('input');

const SIMILAR_OFFER_COUNT = 10;
const LOW_PRICE_FOR_NIGHT = 10000;
const HIGH_PRICE_FOR_NIGHT = 50000;

export const deactivateMapFiltersForm = () => {
  mapFiltersForm.classList.add('map__filters--disabled');
  for (const child of formChildren) {
    child.setAttribute('disabled', 'disabled');
  }
};

export const activateMapFiltersForm = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  for (const child of formChildren) {
    child.removeAttribute ('disabled', 'disabled');
  }
};
export const setfilterFieldsClick = (callback) => {
  for (const field of filterFields) {
    field.addEventListener('change', () => {
      callback();
    });
  }
};

const getPriceOptions =  (price) => {
  if (LOW_PRICE_FOR_NIGHT <= price && price <= HIGH_PRICE_FOR_NIGHT) {
    return 'middle';
  }
  if (price < LOW_PRICE_FOR_NIGHT) {
    return 'low';
  }
  if (price > HIGH_PRICE_FOR_NIGHT) {
    return 'high';
  }
  return 'any';
};

const isFilteringPassed = (elem) => {
  if(typeField.value !== 'any' && elem.offer.type !== typeField.value) {
    return false;
  }
  if(priceField.value !== 'any' && getPriceOptions(elem.offer.price) !== priceField.value) {
    return false;
  }
  if(roomsField.value !== 'any' && elem.offer.rooms !== parseInt(roomsField.value, 10)) {
    return false;
  }
  if(guestsField.value !== 'any' && elem.offer.guests !== parseInt(guestsField.value, 10)) {
    return false;
  }
  for (const input of inputFields) {
    if (input.checked) {
      if(!elem.offer.features || !elem.offer.features.includes(input.value)) {
        return false;
      }
    }
  }
  return true;
};

export const beginToFilterOffers = (offers) => {
  const filteredOffers = [];
  let i = 0;
  while (filteredOffers.length < SIMILAR_OFFER_COUNT && i < offers.length) {
    if(isFilteringPassed(offers[i])) {
      filteredOffers.push(offers[i]);
    }
    i++;
  }
  similarMarkerGroup.clearLayers();
  filteredOffers.forEach((card) => {
    createSimilarMarker(card);
  });
};
