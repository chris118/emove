import {HEADER_SIDER_TOOGGLE} from './actions-type'

export function toggleSider(collapsed) {
  return {
    type: HEADER_SIDER_TOOGGLE,
    payload: {
      collapsed: collapsed,
    }
  }
}
