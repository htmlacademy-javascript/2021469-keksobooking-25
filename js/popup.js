const buildingInRusLang = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

export function declOfNum (number, textForms) {
  number = Math.abs(number) % 1000;
  if (number > 1 && number < 5) {
    return textForms[1];
  }
  if (number === 1) {
    return textForms[0];
  }
  return '';
}

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

export const getNewCard = (newCard) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = newCard.offer.title;
  card.querySelector('.popup__text--address').textContent = newCard.offer.address;
  card.querySelector('.popup__text--price').textContent = `${newCard.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = buildingInRusLang[newCard.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${newCard.offer.rooms}
    комнат${declOfNum(newCard.offer.rooms, ['а', 'ы'])} для
    ${newCard.offer.guests} ${(newCard.offer.guests === 1)? 'гостя': 'гостей'}`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${newCard.offer.checkin}, выезд до ${newCard.offer.checkout}`;

  const featuresContainer = card.querySelector('.popup__features');
  if (newCard.offer.features.length) {
    const  featuresListFragment = document.createDocumentFragment();
    newCard.offer.features.forEach((feature) => {
      const necessaryFeature = document.createElement('li');
      necessaryFeature.classList.add('popup__feature', `popup__feature--${feature}`);
      necessaryFeature.textContent = feature;
      featuresListFragment.append(necessaryFeature);
    });
    featuresContainer.innerHTML = '';
    featuresContainer.append(featuresListFragment);
  } else {
    featuresContainer.classList.add('hidden');
  }

  card.querySelector('.popup__description').textContent = newCard.offer.description;

  const photosContainer =  card.querySelector('.popup__photos');
  if (newCard.offer.photos.length) {
    const  photosListFragment = document.createDocumentFragment();
    newCard.offer.photos.forEach((photo) => {
      let necessaryPhoto = photosContainer.querySelector('.popup__photo');
      necessaryPhoto.src = photo;
      necessaryPhoto = necessaryPhoto.cloneNode(false);
      photosListFragment.append(necessaryPhoto);
    });
    photosContainer.innerHTML = '';
    photosContainer.append(photosListFragment);
  } else {
    photosContainer.classList.add('hidden');
  }

  card.querySelector('.popup__avatar').src = newCard.author.avatar;
  return card;
};
