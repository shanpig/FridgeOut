import { user_info } from '../../../mockData/state/state.json';

export default function userReducer(state = user_info, action) {
  switch (action.type) {
    case 'user/set/all': {
      return action.payload;
    }

    case 'user/set/leftOvers': {
      return {
        ...state,
        left_overs: action.payload,
      };
    }

    case 'user/set/leftOver': {
      let newIngredient = action.payload;
      let newLeftOvers = state.left_overs.map((left) => {
        if (left.ingredient_name === newIngredient.ingredient_name) {
          return newIngredient;
        } else return left;
      });

      return {
        ...state,
        left_overs: newLeftOvers,
      };
    }

    case 'user/add/favorite': {
      let recipe = action.payload;
      let { my_favorites } = state;
      let hasFavorite = my_favorites.find(
        (favorite) => favorite.id === recipe.id
      );
      if (hasFavorite) return state;
      else
        return {
          ...state,
          my_favorites: [...state.my_favorites, action.payload],
        };
    }

    case 'user/remove/favorite': {
      const removeTargetId = action.payload;
      return {
        ...state,
        my_favorites: state.my_favorites.filter(
          (recipe) => recipe.id !== removeTargetId
        ),
      };
    }

    default:
      return state;
  }
}
