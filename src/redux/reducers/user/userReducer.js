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
      let targetIndex = state.left_overs.findIndex(
        (target) => target.ingredient_name === newIngredient.ingredient_name
      );

      return {
        ...state,
        left_overs: [
          ...state.left_overs.slice(0, targetIndex),
          newIngredient,
          ...state.left_overs.slice(targetIndex + 1),
        ],
      };
    }

    case 'user/add/leftOver': {
      let newIngredient = action.payload;

      // let newLeftOvers = state.left_overs;

      // let newLeftOvers = state.left_overs.map((left) => {
      //   if (left.ingredient_name === newIngredient.ingredient_name) {
      //     return newIngredient;
      //   } else return left;
      // });

      return {
        ...state,
        left_overs: [...state.left_overs, newIngredient],
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

    case 'user/add/kitchen': {
      let recipe = action.payload;
      let { my_kitchen } = state;
      let target = my_kitchen.find(
        (recipeTarget) => recipeTarget.id === recipe.id
      );
      if (target) return state;
      else
        return {
          ...state,
          my_kitchen: [...state.my_kitchen, action.payload],
        };
    }

    case 'user/remove/kitchen': {
      const removeTargetId = action.payload;
      return {
        ...state,
        my_kitchen: state.my_kitchen.filter(
          (recipe) => recipe.id !== removeTargetId
        ),
      };
    }

    case 'user/set/post_holder': {
      const leftovers = action.payload;
      return {
        ...state,
        recommend_post_holder: leftovers,
      };
    }

    default:
      return state;
  }
}
