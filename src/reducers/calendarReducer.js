import moment from 'moment';

import { REST_STATUS } from '../utils/constants'
import { ACTION_TYPES, PROMISE_MIDDLEWARE_SUFFIX } from '../actions/actionTypes';

function getInitRecords() {
  let records = [];
  const totalDays = moment().daysInMonth();
  for (let d = 0; d <= totalDays; d++) {
    records.push({
        date: moment().add(d, 'days').format('YYYY-MM-DD'),
    })
  }
  return records;
}

function updateRecords(originalData, fetchedData) {
  return originalData.map(record => ({
      ...record,
      value: fetchedData.records.find(r => r.fields.Date === record.date),
    }));
}
const initState = {
    status: REST_STATUS.INIT,
    data: getInitRecords(),
    error: null,
};

export default function calendarReducer(state = initState, action) {
  switch (action.type) {
    case ACTION_TYPES.INIT:
      return initState;
    case `${ACTION_TYPES.FETCH_STOCK_PRICES}_${PROMISE_MIDDLEWARE_SUFFIX.PENDING}`: 
      return {
        ...state,
        status: REST_STATUS.LOADING,
      };
    case `${ACTION_TYPES.FETCH_STOCK_PRICES}_${PROMISE_MIDDLEWARE_SUFFIX.REJECTED}`: 
      return {
        ...state,
        status: REST_STATUS.ERROR,
      };
    case `${ACTION_TYPES.FETCH_STOCK_PRICES}_${PROMISE_MIDDLEWARE_SUFFIX.FULFILLED}`: 
      return {
        ...state,
        status: REST_STATUS.SUCCESS,
        data: updateRecords(state.data, action.payload.data),
      };
    default:
  }
  return state;
}