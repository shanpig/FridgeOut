import { create, all } from 'mathjs';
// const math = require('mathjs');

const math = create(all);

function getFractionFromTCAmount(amount) {
  if (!amount) return '';
  amount = amount.toString();
  if (amount.includes('又')) {
    const [integer, fraction] = amount.split('又');

    return math.add(integer, math.fraction(fraction));
  } else return math.fraction(amount);
}

function fractionStringToTC(fractionString) {
  if (!fractionString) return '';
  const fraction = math.fraction(fractionString);
  const { n, d } = fraction;
  const integer = Math.floor(n / d);
  const dividend = n % d;

  if (integer === 0) {
    if (dividend !== 0) return `${dividend}/${d}`;
    else return '0';
  } else if (dividend === 0) return integer;
  else return `${integer}又${dividend}/${d}`;
}

function isValidNumberString(string) {
  console.log('checking ', string);
  try {
    fractionStringToTC(string);
    return true;
  } catch {
    return false;
  }
}

function timeDifference(previous) {
  const current = new Date();

  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerWeek = msPerDay * 7;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' 秒前';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' 分鐘前';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' 小時前';
  } else if (elapsed < msPerWeek) {
    return Math.round(elapsed / msPerDay) + ' 天前';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerWeek) + ' 周前';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' 個月前';
  } else {
    return Math.round(elapsed / msPerYear) + ' 年前';
  }
}
// let a = getFractionFromTCAmount('1/4');
// console.log(isValidNumberString(a));
export {
  getFractionFromTCAmount,
  fractionStringToTC,
  isValidNumberString,
  timeDifference,
};
