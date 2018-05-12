import {ADD_CHART} from '../actions/actions-type'

export default function chart(state = [], action = {}) {
  switch (action.type){
    case ADD_CHART:
      let bFound = false;
      state.map((item) => {
        // console.log("item.id", item)
        if(item.id === action.payload.item.id){
          bFound = true;
          item.number = action.payload.item.number
        }
        return item
      })

      if(!bFound){
        state.push(action.payload.item)
      }

      var newState = state.concat()
      return newState
    default:
      return state;
  }
}