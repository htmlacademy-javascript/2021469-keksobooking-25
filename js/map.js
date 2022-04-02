import {activateOfferForm} from './offer-form.js';
import {activateMapFiltersForm} from './map-filters-form.js';
import {getNewCard} from './popup.js';
import {createElement} from './data.js';

const SIMILAR_OFFER_COUNT = 10;
const offersArray = Array.from({length: SIMILAR_OFFER_COUNT}, createElement);

export function activateMap () {
  const map = L.map('map-canvas')
    .on('load', () =>{
      activateOfferForm();
      activateMapFiltersForm();
    })
    .setView({
      lat: 35.683333,
      lng: 139.733333,
    }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52,52],
    iconAnchor: [26, 52],
  });

  const similarPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainMarker = L.marker(
    {
      lat: 35.683333,
      lng: 139.733333,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    }
  ).addTo(map);

  const createSimilarMarker = (point) => {
    const {lat, lng} = point.location;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: similarPinIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(getNewCard(point));
  };

  const suiteAdress = document.querySelector('#address');
  suiteAdress.value = '35.683333, 139.733333';

  offersArray.forEach((point) => {
    createSimilarMarker(point);
  });

  mainMarker.on('moveend', (evt) => {
    suiteAdress.value = `${evt.target.getLatLng().lat}, ${evt.target.getLatLng().lng}`;
  });
}

