import { combineReducers } from 'redux';

import calenderReducer from './calenderReducer';
import updatePricesReducer from './updatePricesReducer';

export default AppReducer = combineReducers({
    calender: calenderReducer,
    updatePrices: updatePricesReducer,
});