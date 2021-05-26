import { create, all } from 'mathjs';

const math = create(all);

function getFractionFromTCAmount(amount) {
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

export { getFractionFromTCAmount, fractionStringToTC };
