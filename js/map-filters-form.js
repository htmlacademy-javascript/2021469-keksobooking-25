import {similarMarkerGroup, createSimilarMarker} from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');
const formChildren = mapFiltersForm.querySelectorAll('fieldset, select');
const typeField = mapFiltersForm.querySelector('#housing-type');
const priceField = mapFiltersForm.querySelector('#housing-price');
const roomsField = mapFiltersForm.querySelector('#housing-rooms');
const guestsField = mapFiltersForm.querySelector('#housing-guests');
const filterFields = mapFiltersForm.querySelectorAll('select, input');
const inputFields = mapFiltersForm.querySelectorAll('input');

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
    field.addEventListener('click', () => {
      callback();
    });
  }
};

function f (price)  {
  if (10000 <= price && price <= 50000) {
    return 'middle';
  }
  if (price < 10000) {
    return 'low';
  }
  if (price > 50000) {
    return 'high';
  }
  return 'any';
}

export const beginToFilterOffers = (offers) => {
  const array = offers.slice();
  const myPromise = new Promise((resolve) => {
    resolve(array);
  });
  myPromise.then((cards) => {
    if (typeField.value !== 'any') {
      const filteredOffers = cards.filter((elem) => elem.offer.type === typeField.value);
      return filteredOffers;
    } else {
      return cards;
    }
  })
    .then((cards) => {
      if (priceField.value !== 'any') {
        const filteredOffers = cards.filter((elem) => f(elem.offer.price) === priceField.value);
        return filteredOffers;
      } else {
        return cards;
      }
    })
    .then((cards) => {
      if (roomsField.value !== 'any') {
        const filteredOffers = cards.filter((elem) => elem.offer.rooms === parseInt(roomsField.value, 10));
        return filteredOffers;
      } else {
        return cards;
      }
    })
    .then((cards) => {
      if (guestsField.value !== 'any') {
        const filteredOffers = cards.filter((elem) => elem.offer.guests === parseInt(guestsField.value, 10));
        return filteredOffers;
      } else {
        return cards;
      }
    })
    .then((cards) => {
      let filteredOffers = cards.slice();
      for (const input of inputFields) {
        if (input.checked) {
          filteredOffers = filteredOffers.filter((elem) => elem.offer.features && elem.offer.features.includes(input.value));
        }
      }
      return filteredOffers;
    })
    .then((cards) => {
      similarMarkerGroup.clearLayers();
      cards.slice(0,10)
        .forEach((card) => {
          createSimilarMarker(card);
        });
    });
};
