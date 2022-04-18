import {activateOfferForm} from './offer-form.js';
import {activateMapFiltersForm} from './map-filters-form.js';
import {getNewCard} from './popup.js';
import { getData } from './network.js';

const CENTER_TOKYO_LAT = 35.68333;
const CENTER_TOKYO_LNG = 139.73333;
const SIMILAR_OFFER_COUNT = 10;
const MAP_SCALE = 13;
const MAIN_ICON_WIDTH = 52;
const MAIN_ICON_HIGTH = 52;
const MAIN_ANCHOR_WIDTH = 26;
const SIMILAR_ICON_WIDTH = 40;
const SIMILAR_ICON_HIGTH = 40;
const SIMILAR_ANCHOR_WIDTH = 20;
const adress = document.querySelector('#address');
const map = L.map('map-canvas');
export const similarMarkerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_ICON_WIDTH, MAIN_ICON_HIGTH],
  iconAnchor: [MAIN_ANCHOR_WIDTH, MAIN_ICON_HIGTH],
});

const mainMarker = L.marker(
  {
    lat: CENTER_TOKYO_LAT,
    lng: CENTER_TOKYO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

const similarPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [SIMILAR_ICON_WIDTH, SIMILAR_ICON_HIGTH],
  iconAnchor: [SIMILAR_ANCHOR_WIDTH, SIMILAR_ICON_HIGTH],
});

export const createSimilarMarker = (point) => {
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
    .addTo(similarMarkerGroup)
    .bindPopup(getNewCard(point));
};

export const setCenterMarker = () => {
  similarMarkerGroup.clearLayers();
  getData((offers) => {
    offers
      .slice(0, SIMILAR_OFFER_COUNT)
      .forEach((card) => {
        createSimilarMarker(card);
      });
  });

  map.setView({
    lat: CENTER_TOKYO_LAT,
    lng: CENTER_TOKYO_LNG,
  }, MAP_SCALE);

  mainMarker.setLatLng(
    {
      lat: CENTER_TOKYO_LAT,
      lng: CENTER_TOKYO_LNG,
    }
  );
  map.closePopup();
  adress.value = `${CENTER_TOKYO_LAT}, ${CENTER_TOKYO_LNG}`;
};

export const activateMap = (offers) => {
  map.on('load', () =>{
    activateOfferForm();
    activateMapFiltersForm();
  })
    .setView({
      lat: CENTER_TOKYO_LAT,
      lng: CENTER_TOKYO_LNG,
    }, MAP_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
    },
  ).addTo(map);

  mainMarker.addTo(map);

  adress.value = `${CENTER_TOKYO_LAT}, ${CENTER_TOKYO_LNG}`;

  mainMarker.on('moveend', (evt) => {
    adress.value = `${(evt.target.getLatLng().lat).toFixed(5)}, ${(evt.target.getLatLng().lng).toFixed(5)}`;
  });

  const offersArray = offers.slice(0, SIMILAR_OFFER_COUNT);
  offersArray.forEach((offer) => {
    createSimilarMarker(offer);
  });
};

