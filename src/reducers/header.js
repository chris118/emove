import {HEADER_SIDER_TOOGGLE} from '../actions/actions-type'

const initialState = {
  collapsed: false,
  isLogout: false,
};

export default function header(state = initialState, action = {}) {
  // console.log(action)
  switch (action.type){
    case HEADER_SIDER_TOOGGLE:
      return Object.assign({}, state, { collapsed: action.payload.collapsed });
    default:
      return state;
  }
}