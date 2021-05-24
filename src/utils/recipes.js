import { create, all } from 'mathjs';
import _ from 'lodash';
const math = create(all);

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

      amount = math.fraction(amount);

      const index = gatheredIngredients.findIndex(
        (ingr) => ingr.ingredient_name === name && ingr.ingredient_unit === unit
      );

      if (index >= 0) {
        gatheredIngredients[index].ingredient_amount = math.add(
          gatheredIngredients[index].ingredient_amount,
          amount
        );
      } else {
        gatheredIngredients.push(ingredient);
      }
    });
  });
  console.log(gatheredIngredients);
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

    amount = math.fraction(amount);

    let index = onHand.findIndex(
      (ingr) => ingr.ingredient_name === name && ingr.ingredient_unit === unit
    );

    if (index >= 0) {
      const targetAmount = amount;
      const ingredientLeft = math.subtract(targetAmount, amount);

      if (ingredientLeft >= 0) {
        used.push({
          ...ingredient,
          ingredient_amount: targetAmount,
        });
      } else if (ingredientLeft < 0) {
        needed.push({
          ...ingredient,
          ingredient_amount: -ingredientLeft,
        });
      }
    } else {
      needed.push(ingredient);
    }
  });
  console.log('used, ', used);

  used.forEach((ingredient) => {
    let {
      ingredient_name: name,
      ingredient_amount: amount,
      ingredient_unit: unit,
    } = { ...ingredient };

    let index = onHand.findIndex(
      (ingr) => ingr.ingredient_name === name && ingr.ingredient_unit === unit
    );

    const ingredientLeft = math.subtract(
      onHand[index].ingredient_amount,
      amount
    );

    onHand[index] = {
      ...ingredient,
      ingredient_amount: ingredientLeft,
    };
  });
  console.log('onHand, ', onHand);
  // console.log('after recipes made, ingredients left: ', left);
  // console.log('after recipes made, ingredients needed: ', needed);

  return [onHand, needed];
}

export { gatherIngredientsFromRecipes, assessIngredientsUsage };
