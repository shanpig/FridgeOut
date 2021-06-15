import { combine } from './recipes';
import { create, all } from 'mathjs';
const math = create(all);

const combineTests = [
  [
    { ingredient_name: 'a', ingredient_unit: 'g', ingredient_amount: '100' },
    { ingredient_name: 'a', ingredient_unit: '克', ingredient_amount: '25' },
    {
      ingredient_name: 'a',
      ingredient_unit: 'g',
      ingredient_amount: math.fraction(125),
    },
  ],
];

it('test combine', () => {
  combineTests.forEach(([a, b, expectedValue]) => {
    expect(combine(a, b)).toStrictEqual(expectedValue);
  });
});
