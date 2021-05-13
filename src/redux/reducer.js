import { combineReducers } from 'redux';
import searchReducer from './search/searchReducer';

const reducer = combineReducers({
  search_keywords: searchReducer,
});

export { reducer };
