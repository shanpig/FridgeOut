import { search_keywords as keywords } from '../../../mockData/state/state.json';

export default function keywordReducer(state = keywords, action) {
  let newState = state.slice();

  switch (action.type) {
    case 'keyword/addInput': {
      const {
        ingredient_name: name,
        ingredient_amount: amount,
        ingredient_unit: unit,
      } = action.payload;
      const indexOfIngredient = newState.findIndex(
        (k) => k.ingredient_name === name && k.ingredient_unit === unit
      );
      if (indexOfIngredient < 0) {
        newState.push(action.payload);
      } else {
        console.log(indexOfIngredient);
        newState[indexOfIngredient].ingredient_amount += amount;
      }

      return newState;
    }

    case 'keyword/removeInput': {
      const {
        ingredient_name: name,
        ingredient_amount: amount,
        ingredient_unit: unit,
      } = action.payload;
      const indexOfIngredient = newState.findIndex(
        (k) => k.ingredient_name === name
      );
      if (indexOfIngredient >= 0)
        newState = [
          ...newState.slice(0, indexOfIngredient),
          ...newState.slice(indexOfIngredient + 1),
        ];
      return newState;
    }

    default:
      return state;
  }
}
