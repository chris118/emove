import { combineReducers } from 'redux';
import goods_list from './goods_list'
import home from './home'

const rootReducer  = combineReducers({
  goods_list,
  home
});

export default rootReducer;