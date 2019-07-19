import { REST_STATUS } from "../utils/constants";
import { ACTION_TYPES, PROMISE_MIDDLEWARE_SUFFIX } from "../actions/actionTypes";

const initState = {
    deletePriceStatus: REST_STATUS.INIT,
    updatePriceStatus: REST_STATUS.INIT,
}

export default function updatePricesReducer(state = initState, action) {
    switch (action.type) {
        case ACTION_TYPES.INIT:
            return initState;
        case `${ACTION_TYPES.DELETE_STOCK_PRICE}_${PROMISE_MIDDLEWARE_SUFFIX.PENDING}`: 
            return {
                ...state,
                deletePriceStatus: REST_STATUS.LOADING,
            };
        case `${ACTION_TYPES.DELETE_STOCK_PRICE}_${PROMISE_MIDDLEWARE_SUFFIX.REJECTED}`: 
            return {
                ...state,
                deletePriceStatus: REST_STATUS.ERROR,
            };
        case `${ACTION_TYPES.DELETE_STOCK_PRICE}_${PROMISE_MIDDLEWARE_SUFFIX.FULFILLED}`: 
            return {
                ...state,
                deletePriceStatus: REST_STATUS.SUCCESS,
            };
        case `${ACTION_TYPES.UPDATE_STOCK_PRICE}_${PROMISE_MIDDLEWARE_SUFFIX.PENDING}`: 
            return {
                ...state,
                updatePriceStatus: REST_STATUS.LOADING,
            };
        case `${ACTION_TYPES.UPDATE_STOCK_PRICE}_${PROMISE_MIDDLEWARE_SUFFIX.REJECTED}`: 
            return {
                ...state,
                updatePriceStatus: REST_STATUS.ERROR,
            };
        case `${ACTION_TYPES.UPDATE_STOCK_PRICE}_${PROMISE_MIDDLEWARE_SUFFIX.FULFILLED}`: 
            return {
                ...state,
                updatePriceStatus: REST_STATUS.SUCCESS,
            };
      default:
    }
    return state;
  }