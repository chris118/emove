import {STEPS_INDEX} from '../actions/actions-type'

const initialState = {
  index: 0,
};

export default function home(state = initialState, action = {}) {
  console.log(action)

  switch (action.type){
    case STEPS_INDEX:
      return Object.assign({}, state, { index: action.payload.index });
    default:
      return state;
  }
}