/* @flow */
import axiosImport from 'axios';

const axios = axiosImport.create({ 
    baseURL: 'https://api.airtable.com/v0/appme2OBWqO9yYjIE/StockX%20Price',
    timeout: 10000,
    headers: { Authorization: 'Bearer keyEwsbyF0gnkr48P' },
});

export class ServerHandler {
    static updateStockPrice(data, id) {
        return axios.put(``, data);
    }

    static setStockPrice(data, id) {
        return axios.post('/', data);
    }

    static fetchStockPrices() {
        return axios.get('/');
    }

    static removeStockPrice(id) {
        return axios.delete(id);
    }
}