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

function removeMessage (evt) {
  if (evt.type === 'click' || evt.keyCode === 27) {
    body.removeChild(body.lastChild);
  }
  body.removeEventListener('click', removeMessage);
  body.removeEventListener('keydown', removeMessage);
}

export function getSuccessMessage () {
  body.appendChild(successMessage);
  body.addEventListener('click', removeMessage);
  body.addEventListener('keydown', removeMessage);
}

export function getErrorMessage () {
  buttonSubmitError.addEventListener('click', removeMessage);
  body.appendChild(errorMessage);
  body.addEventListener('click', removeMessage);
  body.addEventListener('keydown', removeMessage);
}

const errorDownloadMessage = errorTemplate.cloneNode(true);
const textDownloadError = errorDownloadMessage.querySelector('p');
const buttonClickDownloadError = errorDownloadMessage.querySelector('button');
export function getErrorDownloadMessage () {
  textDownloadError.textContent = 'Не удалось загрузить объявления других пользователей';
  buttonClickDownloadError.textContent = 'Очень жаль...';
  buttonClickDownloadError.addEventListener('click', removeMessage);
  body.appendChild(errorDownloadMessage);
  body.addEventListener('click', removeMessage);
  body.addEventListener('keydown', removeMessage);
}
