import {GOODS_LIST_INDEX} from '../actions/actions-type'

const initialState = {
  index: 0,
};

export default function goods_list(state = initialState, action = {}) {
  switch (action.type){
    case GOODS_LIST_INDEX:
      return Object.assign({}, state, { index: action.payload.index });
    default:
      return state;
  }
}