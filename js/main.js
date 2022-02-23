
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

getRandomInt(5, 10);
getRandomFraction(1.1, 1.2, 5);

