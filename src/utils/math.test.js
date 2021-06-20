import { fractionStringToTC, getFractionFromTCAmount } from './math';
import { create, all } from 'mathjs';

const math = create(all);

describe('Testing fractionStringToTC()', () => {
  it('should convert fraction to string', () => {
    const testData = { s: 1, n: 1, d: 2 };
    const expectedValue = '1/2';
    expect(fractionStringToTC(testData)).toBe(expectedValue);
  });

  it('should convert mixed number to string', () => {
    const testData = { s: 1, n: 10, d: 3 };
    const expectedValue = '3又1/3';
    expect(fractionStringToTC(testData)).toBe(expectedValue);
  });

  it('should return empty string when input undefined', () => {
    const testData = undefined;
    const expectedValue = '';
    expect(fractionStringToTC(testData)).toBe(expectedValue);
  });

  it('should convert decimal numbers to string', () => {
    const testData = '1.3';
    const expectedValue = '1又3/10';
    expect(fractionStringToTC(testData)).toBe(expectedValue);
  });

  it('should convert decimal strings to string', () => {
    const testData = 0.001;
    const expectedValue = '1/1000';
    expect(fractionStringToTC(testData)).toBe(expectedValue);
  });
});

describe('Testing getFractionFromTCAmount', () => {
  it('should convert fraction string to fraction object', () => {
    const testData = '1/2';
    const expectedValue = math.fraction(1 / 2);
    expect(getFractionFromTCAmount(testData)).toStrictEqual(expectedValue);
  });

  it('should convert mixed number string to fraction object', () => {
    const testData = '3又1/2';
    const expectedValue = math.fraction(7 / 2);
    expect(getFractionFromTCAmount(testData)).toStrictEqual(expectedValue);
  });

  it('should return empty string when input undefined', () => {
    const testData = undefined;
    const expectedValue = '';
    expect(getFractionFromTCAmount(testData)).toStrictEqual(expectedValue);
  });
});
