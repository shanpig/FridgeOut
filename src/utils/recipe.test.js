import { combine } from './recipes';
import { create, all } from 'mathjs';
const math = create(all);

describe('Test for combine()', () => {
  it('should combine different units of same ingredient', () => {
    const a = {
      ingredient_name: 'a',
      ingredient_unit: 'g',
      ingredient_amount: '100',
    };

    const b = {
      ingredient_name: 'a',
      ingredient_unit: '克',
      ingredient_amount: '25',
    };

    const expectedValue = {
      ingredient_name: 'a',
      ingredient_unit: 'g',
      ingredient_amount: math.fraction(125),
    };

    expect(combine(a, b)).toStrictEqual(expectedValue);
  });
});
