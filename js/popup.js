const buildingInRusLang = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

function declOfNum (n,textForms) {
  n = Math.abs(n) % 100;
  const n1 = n % 10;
  if (n1 > 1 && n1 < 5) { return textForms[1]; }
  if (n1 === 1) { return textForms[0]; }
  return textForms[2];
}

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');
const card = cardTemplate.cloneNode(true);

export const getNewCard = function(newCard) {
  card.querySelector('.popup__title').textContent = newCard.offer.title;
  card.querySelector('.popup__text--address').textContent = newCard.offer.address;
  card.querySelector('.popup__text--price').textContent = `${newCard.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = buildingInRusLang[newCard.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${newCard.offer.rooms}
    ${declOfNum(newCard.offer.rooms, ['комната для', 'комнаты для', 'комнат для'])}
    ${newCard.offer.guests} ${(newCard.offer.guests === 1)? 'гостя': 'гостей'}`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${newCard.offer.checkin}, выезд до ${newCard.offer.checkout}`;

  const featuresContainer = card.querySelector('.popup__features');
  const  featuresListFragment = document.createDocumentFragment();
  newCard.offer.features.forEach((feature) => {
    const necessaryFeature = document.createElement('li');
    necessaryFeature.classList.add('popup__feature', `popup__feature--${feature}`);
    necessaryFeature.textContent = feature;
    featuresListFragment.append(necessaryFeature);
  });
  featuresContainer.innerHTML = '';
  featuresContainer.append(featuresListFragment);

  card.querySelector('.popup__description').textContent = newCard.offer.description;

  const photosContainer =  card.querySelector('.popup__photos');
  const  photosListFragment = document.createDocumentFragment();
  newCard.offer.photos.forEach((photo) => {
    let necessaryPhoto = photosContainer.querySelector('.popup__photo');
    necessaryPhoto.src = photo;
    necessaryPhoto = necessaryPhoto.cloneNode(false);
    photosListFragment.append(necessaryPhoto);
  });
  photosContainer.innerHTML = '';
  photosContainer.append(photosListFragment);

  card.querySelector('.popup__avatar').src = newCard.author.avatar;
  return card;
};
