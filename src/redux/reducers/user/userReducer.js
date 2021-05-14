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

    case 'user/add/kitchen': {
      return {
        ...state,
        my_kitchen: [...state.my_kitchen, action.payload],
      };
    }

    case 'user/remove/kitchen': {
      const removeTargetId = action.payload;
      return {
        ...state,
        my_kitchen: state.my_kitchen.filter((id) => id !== removeTargetId),
      };
    }

    default:
      return state;
  }
}
