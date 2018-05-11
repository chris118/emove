import {ADD_CHART} from '../actions/actions-type'

export default function chart(state = [], action = {}) {
  switch (action.type){
    case ADD_CHART:

      let bFound = false;
      let newItems = []
      state.forEach((item) => {
        if(item.id === action.payload.item.id){
          bFound = true;
        }
        newItems.push(item)
      })

      if(!bFound){
        return [...state, action.payload.item]
      }else {
        return newItems
      }

      return state
    default:
      return state;
  }
}