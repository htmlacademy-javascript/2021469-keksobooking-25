
function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if ((max < 0) || (min < 0)) {
    // eslint-disable-next-line no-console
    console.log('В диапозоне присутствуют отрицательные числа, это недопустимо');
    return undefined;
  } else if (max >= min ) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
}

function getRandomFraction (min, max, rate) {
  let result;
  if ((max < 0) || (min < 0)) {
    // eslint-disable-next-line no-console
    console.log('В диапозоне присутствуют отрицательные числа, это недопустимо');
    return undefined;
  } else if (max >= min ) {
    result = +((Math.random() * (max - min + 0.1)) + min).toFixed(rate);
    if (result >= max) {
      return max;
    } else {
      return result;
    }
  } else {
    result = +((Math.random() * (min - max + 0.1)) + max).toFixed(rate);
    if (result >= min) {
      return min;
    } else {
      return result;
    }
  }
}

getRandomInt();
getRandomFraction();

