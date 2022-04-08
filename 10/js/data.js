import {getRandomInt, getRandomFraction, shuffle, getNonRepeatingNumber} from './util.js';

const BUILDING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const BUILDING_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const BUILDING_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const CHECKIN_CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const avatarExceptions =[];

export const createElement = () => {
  const avatarNumber =  getNonRepeatingNumber(avatarExceptions, 0, 10);
  const featuresArray = shuffle(BUILDING_FEATURES).slice(0, getRandomInt(0, BUILDING_FEATURES.length - 1));
  const photosArray = shuffle(BUILDING_PHOTOS).slice(0, getRandomInt(0, BUILDING_PHOTOS.length - 1));
  const lat = getRandomFraction(35.65000, 35.70000, 5);
  const lng = getRandomFraction(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: ((avatarNumber === 0) || (avatarNumber === 10)) ?
        `img/avatars/user${avatarNumber}.png` :
        `img/avatars/user0${avatarNumber}.png`
    },
    offer: {
      title: 'Hello World!',
      address: `${lat}, ${lng}`,
      price: getRandomInt(0, 10000) ,
      type: BUILDING_TYPES[getRandomInt(0, BUILDING_TYPES.length - 1)],
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 20),
      checkin: CHECKIN_CHECKOUT_TIME[getRandomInt(0, CHECKIN_CHECKOUT_TIME.length - 1)],
      checkout: CHECKIN_CHECKOUT_TIME[getRandomInt(0, CHECKIN_CHECKOUT_TIME.length - 1)],
      features: featuresArray,
      description: 'Comfortable apartments only for you!',
      photos: photosArray,
    },
    location: {
      lat: lat,
      lng: lng,
    },
  };
};
