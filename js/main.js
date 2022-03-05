function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if ((max < 0) || (min < 0)) {
    throw RangeError('The argument must not be negative');
  }
  const a = Math.random();
  const result = (max >= min) ?
    (a * (max - min + 1)) + min :
    (a * (min - max + 1)) + max;
  return Math.floor(result);
}

function getRandomFraction (min, max, rate) {
  if ((max < 0) || (min < 0)) {
    throw RangeError('The argument must not be negative');
  }
  const a = Math.random();
  const result = (max >= min) ?
    ((a * (max - min)) + min).toFixed(rate) :
    ((a * (min - max)) + max).toFixed(rate);
  return parseFloat(result);
}

const BUILDING_TYPE = [
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

const exceptions = {
  avatar: [],
  features: [],
  photos: [],
};

function getNonRepeatingNumber (array, elem, min, max) {
  if (array.includes(elem) === false) {
    array.push(elem);
  } else {
    while(array.includes(elem)) {
      elem = getRandomInt(min, max);
    }
    array.push(elem);
  }
  return elem;
}

const createElement = () => {
  let avatarNumber = getNonRepeatingNumber(avatarExceptions, getRandomInt(0, 10), 0, 10);

  let featuresArray = [];
  for (let i = 0; i < getRandomInt(0, BUILDING_FEATURES.length -1); i++) {
    let featureIndex = getNonRepeatingNumber(exceptions.features, getRandomInt(0, BUILDING_FEATURES.length -1), 0, BUILDING_FEATURES.length -1);
    featuresArray.push(BUILDING_FEATURES[featureIndex]);
  }
  exceptions.features.length = 0;

  let photosArray =[];
  for(let i = 0; i < getRandomInt(0, BUILDING_PHOTOS.length -1); i++) {
    let photoIndex = getNonRepeatingNumber(exceptions.photos, getRandomInt(0, BUILDING_PHOTOS.length -1), 0, BUILDING_PHOTOS.length -1);
    photosArray.push(BUILDING_PHOTOS[photoIndex]);
  }
  exceptions.photos.length = 0;

  let lat = getRandomFraction(35.65000, 35.70000, 5);
  let lng = getRandomFraction(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: ((avatarNumber == 0) || (avatarNumber ==10)) ?
      `img/avatars/user${avatarNumber}.png` :
      `img/avatars/user0${avatarNumber}.png`
    },
    offer: {
      title: 'Hello World!',
      address: `${lat}, ${lng}`,
      price: getRandomInt(0,  10000) ,
      type: BUILDING_TYPE[getRandomInt(0, BUILDING_TYPE.length - 1)],
      rooms: getRandomInt(1, 10),
      guests: getRandomInt(1, 20),
      checkin: CHECKIN_TIME[getRandomInt(0, CHECKIN_TIME.length - 1)],
      checkout: CHECKIN_TIME[getRandomInt(0, CHECKIN_TIME.length - 1)],
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

const array = Array.from({length: 10}, createElement);

console.log(array);
