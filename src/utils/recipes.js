import _ from 'lodash';
import { create, all } from 'mathjs';
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

  if (nameA !== nameB) return false;
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
      let { ingredient_name: name, ingredient_amount: amount } = ingredient;

      if (amount) {
        amount = getFractionFromTCAmount(amount);
        const formattedIngredient = {
          ...ingredient,
          ingredient_amount: amount,
        };

        const index = gatheredIngredients.findIndex(
          (ingr) => ingr.ingredient_name === name
        );

        if (
          index >= 0 &&
          isCombinable(gatheredIngredients[index], formattedIngredient)
        ) {
          gatheredIngredients[index] = combine(
            gatheredIngredients[index],
            formattedIngredient
          );
        } else {
          gatheredIngredients.push(formattedIngredient);
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

  required.forEach((requiredIngredient) => {
    let { ingredient_name: name, ingredient_amount: amount } = {
      ...requiredIngredient,
    };

    if (amount) {
      amount = getFractionFromTCAmount(amount);
      amount = math.fraction(amount);

      let index = onHand.findIndex(
        (onHandIngredient) => onHandIngredient.ingredient_name === name
      );

      if (index >= 0 && isCombinable(onHand[index], requiredIngredient)) {
        const onHandTargetAmount = onHand[index].ingredient_amount;

        const remainAmount = subtract(
          onHand[index],
          requiredIngredient
        ).ingredient_amount;

        if (remainAmount >= 0) {
          used.push({ ...requiredIngredient });
        } else if (remainAmount < 0) {
          used.push({
            ...requiredIngredient,
            ingredient_amount: onHandTargetAmount,
          });
          needed.push({
            ...requiredIngredient,
            ingredient_amount: -remainAmount,
          });
        }
      } else {
        needed.push(requiredIngredient);
      }
    } else {
      let index = onHand.findIndex(
        (onHandIngredient) => onHandIngredient.ingredient_name === name
      );
      if (index >= 0) used.push(requiredIngredient);
      else needed.push(requiredIngredient);
    }
  });

  used.forEach((ingredient) => {
    let { ingredient_name: name, ingredient_amount: amount } = {
      ...ingredient,
    };

    if (amount) {
      let index = onHand.findIndex(
        (onHandIngredient) => onHandIngredient.ingredient_name === name
      );

      const remain = subtract(onHand[index], ingredient);

      onHand[index] = remain;
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
