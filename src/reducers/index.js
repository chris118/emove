import { combineReducers } from 'redux';
import goods_list from './goods_list'
import chart from './chart'

const rootReducer  = combineReducers({
  goods_list,
  chart
});

export default rootReducer;