export const KEY_UID = 'uid';
export const KEY_TOKEN = 'token';

export function throttle(fn, gapTime) {
    if (gapTime === null || gapTime === undefined) {
        gapTime = 1000
    }

    let _lastTime = null

    // 返回新的函数
    return function () {
        let _nowTime = + new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments)   //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}

export function getUid() {
  const uid = window.localStorage.getItem("uid");
  return uid
}

export function getToken() {
  const token = window.localStorage.getItem("token");
  return token
}