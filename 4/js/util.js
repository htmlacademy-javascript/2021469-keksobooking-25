export function getRandomInt (min, max) {
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

export function getRandomFraction (min, max, rate) {
  if ((max < 0) || (min < 0)) {
    throw RangeError('The argument must not be negative');
  }
  const a = Math.random();
  const result = (max >= min) ?
    ((a * (max - min)) + min).toFixed(rate) :
    ((a * (min - max)) + max).toFixed(rate);
  return parseFloat(result);
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function getNonRepeatingNumber (array, min, max) {
  const elem = getRandomInt(min, max);
  if (array.includes(elem) === false) {
    array.push(elem);
    return elem;
  } else {
    return getNonRepeatingNumber(array, min, max);
  }
}
