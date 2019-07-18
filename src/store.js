import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';

import reducers from './reducers';
import { fetchStockPricesMiddleware } from './fetchStockPricesMiddleWare';

const middlewareList = [promise, logger, ...fetchStockPricesMiddleware];
const middleware = applyMiddleware(...middlewareList);


export default store = createStore(reducers, middleware);