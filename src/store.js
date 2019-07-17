// @flow
import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import reducers from './reducers';

const middleware = [promise()];

export default store = createStore(reducers, middleware);