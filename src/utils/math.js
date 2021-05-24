import { create, all } from 'mathjs';

const math = create(all);

function getFractionFromTCAmount(Amount) {
  const [integer, fraction] = Amount.split('又');

  return math.add(integer, math.fraction(fraction));
}

function fractionStringToTC(fractionString) {
  const fraction = math.fraction(fractionString);
  const { n, d } = fraction;
  const integer = Math.floor(n / d);
  const dividend = n % d;

  if (integer === 0) {
    return `${dividend}/${d}`;
  } else if (dividend === 0) return integer;
  else return `${integer}又${dividend}/${d}`;
}

export { getFractionFromTCAmount, fractionStringToTC };
