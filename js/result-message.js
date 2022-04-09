const body = document.querySelector('body');
const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const successMessage = successTemplate.cloneNode(true);

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const errorMessage = errorTemplate.cloneNode(true);
const buttonSubmitError = errorMessage.querySelector('.error__button');

const hideMessage = (evt) => {
  if (evt.type === 'click' || evt.keyCode === 27) {
    body.removeChild(body.lastChild);
  }
  body.removeEventListener('click', hideMessage);
  body.removeEventListener('keydown', hideMessage);
};

export const showSuccessMessage = () => {
  body.appendChild(successMessage);
  body.addEventListener('click', hideMessage);
  body.addEventListener('keydown', hideMessage);
};

export const showErrorMessage = () => {
  buttonSubmitError.addEventListener('click', hideMessage);
  body.appendChild(errorMessage);
  body.addEventListener('click', hideMessage);
  body.addEventListener('keydown', hideMessage);
};

const errorDownloadMessage = errorTemplate.cloneNode(true);
const textDownloadError = errorDownloadMessage.querySelector('p');
const buttonClickDownloadError = errorDownloadMessage.querySelector('button');
export const showErrorDownloadMessage = () => {
  textDownloadError.textContent = 'Не удалось загрузить объявления других пользователей';
  buttonClickDownloadError.textContent = 'Очень жаль...';
  buttonClickDownloadError.addEventListener('click', hideMessage);
  body.appendChild(errorDownloadMessage);
  body.addEventListener('click', hideMessage);
  body.addEventListener('keydown', hideMessage);
};
