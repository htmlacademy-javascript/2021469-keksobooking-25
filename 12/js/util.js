export const getRandomInt = (min, max) => {
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
};

export const getRandomFraction = (min, max, rate) => {
  if ((max < 0) || (min < 0)) {
    throw RangeError('The argument must not be negative');
  }
  const a = Math.random();
  const result = (max >= min) ?
    ((a * (max - min)) + min).toFixed(rate) :
    ((a * (min - max)) + max).toFixed(rate);
  return parseFloat(result);
};

export const shuffle = (oldArray) => {
  const newArray = oldArray.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const getNonRepeatingNumber = (array, min, max) => {
  const elem = getRandomInt(min, max);
  if (array.includes(elem) === false) {
    array.push(elem);
    return elem;
  } else {
    return getNonRepeatingNumber(array, min, max);
  }
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
