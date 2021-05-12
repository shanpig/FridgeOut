import { createStore, combineReducers } from 'redux';
import searchKeywordReducer from './search/searchKeywordReducer';
import searchedRecipesReducer from './search/searchedRecipesReducer';

const reducer = combineReducers({
  search_keywords: searchKeywordReducer,
  searched_recipes: searchKeywordReducer,
  filters: searchKeywordReducer,
  sorting: searchKeywordReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
