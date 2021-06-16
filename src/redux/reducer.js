import { combineReducers } from 'redux';
import userReducer from './reducers/user/userReducer';
import keywordReducer from './reducers/keyword/keywordReducer';

const reducer = combineReducers({
  user_info: userReducer,
  searched_keywords: keywordReducer,
});

export { reducer };
