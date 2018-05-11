import {GOODS_LIST_INDEX, GOODS_LIST_TAP_INDEX} from '../actions/actions-type'

const initialState = {
  index: 0,
};

export default function goods_list(state = initialState, action = {}) {
  switch (action.type){
    case GOODS_LIST_INDEX:
      return Object.assign({}, state, { index: action.payload.index });
    case GOODS_LIST_TAP_INDEX:
      return Object.assign({}, state, { selected_index: action.payload.selected_index });
    default:
      return state;
  }
}