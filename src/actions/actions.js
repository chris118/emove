import {
  GOODS_LIST_INDEX,
  GOODS_LIST_TAP_INDEX,
  ADD_CHART,
} from './actions-type'

export function goodsIndexChanged(index) {
  return {
    type: GOODS_LIST_INDEX,
    payload: {
      index: index,
    }
  }
}

export function goodsIndexTapChanged(index) {
  return {
    type: GOODS_LIST_TAP_INDEX,
    payload: {
      selected_index: index,
    }
  }
}

export function addChart(item) {
  return {
    type: ADD_CHART,
    payload: {
      item: item,
    }
  }
}