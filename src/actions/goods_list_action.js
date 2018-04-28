import {GOODS_LIST_INDEX} from './actions-type'

export function goodsIndexChanged(index) {
  return {
    type: GOODS_LIST_INDEX,
    payload: {
      index: index,
    }
  }
}
