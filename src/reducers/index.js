import { combineReducers } from 'redux';

import calendarReducer from './calendarReducer';
import updatePricesReducer from './updatePricesReducer';

export default AppReducer = combineReducers({
    calendar: calendarReducer,
    updatePrices: updatePricesReducer,
});