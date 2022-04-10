import {activateOfferForm} from './offer-form.js';
import {activateMapFiltersForm} from './map-filters-form.js';
import {getNewCard} from './popup.js';

const CENTER_TOKYO_LAT = 35.68333;
const CENTER_TOKYO_LNG = 139.73333;
const suiteAdress = document.querySelector('#address');
const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52,52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.68333,
    lng: 139.73333,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const similarPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const setCenterMarker = () => {
  map.setView({
    lat: CENTER_TOKYO_LAT,
    lng: CENTER_TOKYO_LNG,
  }, 13);

  mainMarker.setLatLng(
    {
      lat: CENTER_TOKYO_LAT,
      lng: CENTER_TOKYO_LNG,
    }
  );
  map.closePopup();
  suiteAdress.value = `${CENTER_TOKYO_LAT}, ${CENTER_TOKYO_LNG}`;
};

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

export const activateMap = (elements) => {
  map.on('load', () =>{
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

  mainMarker.addTo(map);

  suiteAdress.value = `${CENTER_TOKYO_LAT}, ${CENTER_TOKYO_LNG}`;

  mainMarker.on('moveend', (evt) => {
    suiteAdress.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}`;
  });

  elements.forEach((elem) => {
    createSimilarMarker(elem);
  });
};

