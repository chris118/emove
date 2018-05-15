import {ADD_CHART, REMOVE_CHART} from '../actions/actions-type'

export default function chart(state = [], action = {}) {
  switch (action.type){
    case ADD_CHART:
      let bFound = false
      state.forEach((item) => { //更新数字
        if(item.goods_id === action.payload.item.goods_id) {
          bFound = true
          item.goods_num = action.payload.item.goods_num
        }
      })
      if(!bFound) { //新添加
        state.push(action.payload.item)
      }

      let newState = []
      state.forEach((item) => {
        newState.push(item)
      })

      // console.log(newState)
      return newState
    case REMOVE_CHART:
      state.forEach((item) => {
        if(item.goods_id === action.payload.item.goods_id) {
          item.goods_num = action.payload.item.goods_num //更新数字
        }
      })

      let removeState = []
      state.forEach((item) => {
        removeState.push(item)
      })
      console.log(removeState)
      return removeState
    default:
      return state;
  }
}