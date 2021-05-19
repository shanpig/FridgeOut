import {
  selected_left_overs as leftovers,
  selected_recipes as recipes,
} from '../../../mockData/state/state.json';

function recipesReducer(state = recipes, action) {
  let newSelectedRecipes = state.slice();

  switch (action.type) {
    case 'select/add/recipe': {
      const newSelectedRecipesId = newSelectedRecipes.map((r) => r.id);
      if (!newSelectedRecipesId.includes(action.payload.id))
        newSelectedRecipes.push(action.payload);
      return newSelectedRecipes;
    }
    case 'select/remove/recipe': {
      return newSelectedRecipes.filter(
        (recipe) => recipe.id !== action.payload
      );
    }
    default:
      return newSelectedRecipes;
  }
}

function leftoversReducer(state = leftovers, action) {
  let newSelectedLeftovers = state.slice();

  switch (action.type) {
    case 'select/add/leftover': {
      const {
        ingredient_name: name,
        ingredient_amount: amount,
        ingredient_unit: unit,
      } = action.payload;
      const indexOfIngredient = newSelectedLeftovers.findIndex(
        (k) => k.ingredient_name === name && k.ingredient_unit === unit
      );
      if (indexOfIngredient < 0) {
        newSelectedLeftovers.push(action.payload);
      } else {
        console.log(indexOfIngredient);
        newSelectedLeftovers[indexOfIngredient].ingredient_amount += amount;
      }

      return newSelectedLeftovers;
    }

    case 'select/remove/leftover': {
      const {
        ingredient_name: name,
        ingredient_amount: amount,
        ingredient_unit: unit,
      } = action.payload;
      const indexOfIngredient = newSelectedLeftovers.findIndex(
        (k) => k.ingredient_name === name
      );
      if (indexOfIngredient >= 0)
        newSelectedLeftovers = [
          ...newSelectedLeftovers.slice(0, indexOfIngredient),
          ...newSelectedLeftovers.slice(indexOfIngredient + 1),
        ];
      return newSelectedLeftovers;
    }
    default:
      return newSelectedLeftovers;
  }
}

export { recipesReducer, leftoversReducer };
