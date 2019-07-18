import axiosImport from 'axios';

const axios = axiosImport.create({ 
    baseURL: 'https://api.airtable.com/v0/appme2OBWqO9yYjIE/StockX%20Price',
    timeout: 10000,
    headers: { Authorization: 'Bearer keyEwsbyF0gnkr48P' },
});

export class ServerHandler {
    static fetchStockPrices() {
        return axios.get('?view=Grid view');
    }

    static updateStockPrice(data, id) {
        return axios.put(`/${id}`, data);
    }

    static setStockPrice(data) {
        return axios.post('/', data);
    }

    static deleteStockPrice(id) {
        return axios.delete(id);
    }
}