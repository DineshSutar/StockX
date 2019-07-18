import { ServerHandler } from '../ServerHandler';
import { ACTION_TYPES } from './actionTypes';

function reduxAction(type, payload) {
    return { type, payload };
};

export function fetchStockPrices() {
    return reduxAction(
        ACTION_TYPES.FETCH_STOCK_PRICES,
        ServerHandler.fetchStockPrices(),
    );
}

export function updateStockPrice(Date, Amount, id) {
    const data = {
        fields: { Date, Amount },
    };
    return reduxAction(
        ACTION_TYPES.UPDATE_STOCK_PRICE,
        id ? ServerHandler.updateStockPrice(data, id) : ServerHandler.setStockPrice(data),
    );
}

export function deleteStockPrice(id) {
    return reduxAction(
        ACTION_TYPES.DELETE_STOCK_PRICE,
        ServerHandler.deleteStockPrice(id),
    );
}