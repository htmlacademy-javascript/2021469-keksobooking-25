function getBuildingInRusLang (buildType) {
  switch(buildType) {
    case 'flat': return 'Квартира';
    case 'bungalow': return 'Бунгало';
    case 'house': return 'Дом';
    case 'palace': return 'Дворец';
    default: return 'Отель';
  }
}

function getRoomsInRusLang (number) {
  switch(number) {
    case 1: return 'комната для';
    case 2:
    case 3:
    case 4: return 'комнаты для';
    default: return 'комнат для';
  }
}

export const getNewCard = function(newCard) {
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = newCard.offer.title;
  card.querySelector('.popup__text--address').textContent = newCard.offer.address;
  card.querySelector('.popup__text--price').textContent = `${newCard.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = getBuildingInRusLang(newCard.offer.type);
  card.querySelector('.popup__text--capacity').textContent = `${newCard.offer.rooms} ${getRoomsInRusLang(newCard.offer.rooms)}
  ${newCard.offer.guests} ${(newCard.offer.guests === 1)? 'гостя': 'гостей'}`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${newCard.offer.checkin}, выезд до ${newCard.offer.checkout}`;

  const featuresContainer = card.querySelector('.popup__features');
  const  featuresListFragment = document.createDocumentFragment();
  newCard.offer.features.forEach((feature) => {
    const necessaryFeature = featuresContainer.querySelector(`.popup__feature--${feature}`);
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
