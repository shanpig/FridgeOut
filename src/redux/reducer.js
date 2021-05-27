import { combineReducers } from 'redux';
import keywordReducer from './reducers/keyword/keywordReducer';
import userReducer from './reducers/user/userReducer';

const reducer = combineReducers({
  user_info: userReducer,
  searched_keywords: keywordReducer,
});

export { reducer };
