import { ACTION_TYPES, PROMISE_MIDDLEWARE_SUFFIX } from "./actions/actionTypes";
import { fetchStockPrices } from "./actions/actions";

export const listener = ({ getState, dispatch }) => (next) => (action) => {
    next(action);
    if (
        action.type === `${ACTION_TYPES.UPDATE_STOCK_PRICE}_${PROMISE_MIDDLEWARE_SUFFIX.FULFILLED}`
        || action.type === `${ACTION_TYPES.DELETE_STOCK_PRICE}_${PROMISE_MIDDLEWARE_SUFFIX.FULFILLED}`
    ) {
        dispatch(fetchStockPrices());
    }
};

export const fetchStockPricesMiddleware = [listener];