import {ADD_CHART, REMOVE_CHART} from '../actions/actions-type'

export default function chart(state = [], action = {}) {
  switch (action.type){
    case ADD_CHART:
      let addState = state.concat(action.payload.item)
      console.log(addState)
      return addState
    case REMOVE_CHART:
      let newState = []
      let bRemoved = false
      for(let i = 0; i < state.length; i++){
        if(state[i].goods_id === action.payload.item.goods_id){
          if(!bRemoved){ //continue代表已经删除了
            bRemoved = true;
            continue
          }else {
            newState.push(state[i])
          }
        }else {
          newState.push(state[i])
        }
      }
      console.log(newState)
      return newState
    default:
      return state;
  }
}