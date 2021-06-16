import thunk from 'redux-thunk';
import { reducer } from './reducer';
import { createStore, applyMiddleware, compose } from 'redux';

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, enhancer(applyMiddleware(thunk)));
export default store;
