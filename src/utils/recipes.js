import { create, all } from 'mathjs';
import _ from 'lodash';
import units from './unit_converter.json';
import { getFractionFromTCAmount } from './math';
const math = create(all);

function compareAmount(a, b) {
  let { ingredient_unit: unitA, ingredient_amount: amountA } = a;
  let { ingredient_unit: unitB, ingredient_amount: amountB } = b;

  let basisA = units[unitA];
  let basisB = units[unitB];
  amountA = math.fraction(amountA);
  amountB = math.fraction(amountB);

  if (!(basisA && basisB)) return 0;
  if (basisA.type !== basisB.type) return 0;

  const result = amountA * basisA.to_basis - amountB * basisB.to_basis;
  if (result > 0) return 1;
  else if (result === 0) return 0;
  else if (result < 0) return -1;
}

function isCombinable(a, b) {
  const { ingredient_name: nameA, ingredient_unit: unitA } = a;
  const { ingredient_name: nameB, ingredient_unit: unitB } = b;
  let basisA = units[unitA];
  let basisB = units[unitB];

  if (!unitA || !unitB) return false;
  if ((basisA && !basisB) || (!basisA && basisB)) return false;
  if (!basisA && !basisB) return true;
  if (basisA.type === basisB.type) return true;

  return false;
}

function combine(a, b) {
  let {
    ingredient_name: nameA,
    ingredient_unit: unitA,
    ingredient_amount: amountA,
  } = a;
  let {
    ingredient_name: nameB,
    ingredient_unit: unitB,
    ingredient_amount: amountB,
  } = b;

  if (nameA !== nameB)
    throw new Error(`ingredients ${nameA}, ${nameB} are different!`);
  let basisA = units[unitA];
  let basisB = units[unitB];
  amountA = math.fraction(amountA);
  amountB = math.fraction(amountB);
  // known bug: if combine same ingredient with different unit type(weight v.s. volume) might return falsy amount
  let amount;
  if (!(basisA && basisB)) amount = math.add(amountA, amountB);
  else
    amount = math.add(amountA, (amountB * basisB.to_basis) / basisA.to_basis);

  return {
    ingredient_name: nameA,
    ingredient_amount: amount,
    ingredient_unit: unitA,
  };
}

function subtract(a, b) {
  let minusB = {
    ...b,
    ingredient_amount: -b.ingredient_amount,
  };

  return combine(a, minusB);
}

function gatherIngredientsFromRecipes(_recipes) {
  let recipes = _.cloneDeep(_recipes);
  let gatheredIngredients = [];
  const ingredientsGroup = recipes.map((recipe) => [...recipe.ingredients]);

  ingredientsGroup.forEach((group) => {
    group.forEach((ingredient) => {
      let {
        ingredient_name: name,
        ingredient_amount: amount,
        ingredient_unit: unit,
      } = ingredient;

      if (amount) {
        amount = getFractionFromTCAmount(amount);
        amount = math.fraction(amount);

        const index = gatheredIngredients.findIndex(
          (ingr) => ingr.ingredient_name === name
        );

        if (
          index >= 0 &&
          isCombinable(gatheredIngredients[index], ingredient)
        ) {
          gatheredIngredients[index] = combine(
            gatheredIngredients[index],
            ingredient
          );
        } else {
          gatheredIngredients.push(ingredient);
        }
      } else {
        const index = gatheredIngredients.findIndex(
          (ingr) => ingr.ingredient_name === name
        );
        if (index < 0) {
          gatheredIngredients.push(ingredient);
        }
      }
    });
  });

  return gatheredIngredients;
}

function assessIngredientsUsage(_onHand, _required) {
  let onHand = _.cloneDeep(_onHand);
  let required = _.cloneDeep(_required);

  let used = [];
  let needed = [];

  required.forEach((ingredient) => {
    let {
      ingredient_name: name,
      ingredient_amount: amount,
      ingredient_unit: unit,
    } = { ...ingredient };

    if (amount) {
      amount = getFractionFromTCAmount(amount);
      amount = math.fraction(amount);

      let index = onHand.findIndex((ingr) => ingr.ingredient_name === name);

      if (index >= 0 && isCombinable(onHand[index], ingredient)) {
        const targetAmount = onHand[index].ingredient_amount;

        const ingredientLeft = subtract(
          onHand[index],
          ingredient
        ).ingredient_amount;

        if (ingredientLeft >= 0) {
          used.push({ ...ingredient });
        } else if (ingredientLeft < 0) {
          used.push({
            ...ingredient,
            ingredient_amount: targetAmount,
          });
          needed.push({
            ...ingredient,
            ingredient_amount: -ingredientLeft,
          });
        }
      } else {
        needed.push(ingredient);
      }
    } else {
      let index = onHand.findIndex((ingr) => ingr.ingredient_name === name);
      if (index >= 0) used.push(ingredient);
      else needed.push(ingredient);
    }
  });

  used.forEach((ingredient) => {
    let {
      ingredient_name: name,
      ingredient_amount: amount,
      ingredient_unit: unit,
    } = { ...ingredient };

    if (amount) {
      let index = onHand.findIndex((ingr) => ingr.ingredient_name === name);

      const ingredientLeft = subtract(onHand[index], ingredient);

      onHand[index] = ingredientLeft;
    }
  });

  return [onHand, needed];
}

export {
  compareAmount,
  combine,
  gatherIngredientsFromRecipes,
  assessIngredientsUsage,
};
