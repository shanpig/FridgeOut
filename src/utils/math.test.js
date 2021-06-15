import { fractionStringToTC, getFractionFromTCAmount } from './math';

const fractionStringToTCTests = [
  [{ s: 1, n: 1, d: 2 }, '1/2'],
  [{ s: 1, n: 10, d: 3 }, '3又1/3'],
  [undefined, ''],
  ['1.3', '1又3/10'],
  [0.001, '1/1000'],
];

it('fractionStringToTC', () => {
  fractionStringToTCTests.forEach(([testData, expectedValue]) =>
    expect(fractionStringToTC(testData)).toBe(expectedValue)
  );
});

const getFractionFromTCAmountTests = [['1/2', { s: 1, n: 1, d: 2 }]];

it('getFractionFromTCAmount', () => {
  getFractionFromTCAmountTests.forEach(([testData, expectedValue]) =>
    expect(getFractionFromTCAmount(testData)).toStrictEqual(expectedValue)
  );
});
