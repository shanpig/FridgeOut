import { selected_recipes as recipes } from '../../../mockData/state/state.json';

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

export default recipesReducer;
