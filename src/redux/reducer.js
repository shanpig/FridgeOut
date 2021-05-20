import { combineReducers } from 'redux';
import keywordReducer from './reducers/keyword/keywordReducer';
import recipesReducer from './reducers/selection/selectionReducer';
import userReducer from './reducers/user/userReducer';

const reducer = combineReducers({
  user_info: userReducer,
  search_keywords: keywordReducer,
  selected_recipes: recipesReducer,
});

export { reducer };
