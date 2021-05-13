import { user_info } from '../../../mockData/state/state.json';

export default function userReducer(state = user_info, action) {
  switch (action.type) {
    case 'user/set/all': {
      return action.payload;
    }
    case 'user/add/favorite': {
      console.log(action.payload);
      return {
        ...state,
        my_favorites: [...state.my_favorites, action.payload],
      };
    }

    default:
      return state;
  }
}
