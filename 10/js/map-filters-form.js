const mapFiltersForm = document.querySelector('.map__filters');
const liveFormChildren = mapFiltersForm.querySelectorAll('fieldset, select');

export function deactivateMapFiltersForm () {
  mapFiltersForm.classList.add('map__filters--disabled');
  for (const child of liveFormChildren) {
    child.setAttribute('disabled', 'disabled');
  }
}

export function activateMapFiltersForm () {
  mapFiltersForm.classList.remove('map__filters--disabled');
  for (const child of liveFormChildren) {
    child.removeAttribute ('disabled', 'disabled');
  }
}
