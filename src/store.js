// @flow
import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

const middlewareList = [promise];
const middleware = applyMiddleware(...middlewareList);


export default store = createStore(reducers, middleware);