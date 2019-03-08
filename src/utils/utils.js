const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

/**
 * 判断url
 * @param path
 * @returns {boolean}
 */
export function isUrl (path) {
  return reg.test(path)
}

/**
 * 防抖
 * @param func
 * @param delay
 * @returns {Function}
 */
export function debounce (func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

/**
 * 截流
 * @param func
 * @param gapTime
 * @returns {Function}
 */
function throttle (func, gapTime) {
  let _lastTime = null

  return function () {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      func()
      _lastTime = _nowTime
    }
  }
}

/**
 * 冒泡排序
 * @param arr
 * @param fn 升序(a, b) => a - b) 降序 (a, b) => b - a)
 * @returns {*}
 */
export function bubble_sort (arr, fn) {
  let len = arr.length
  while (len--) {
    for (let i = 0;
         i < len;
         i++
    ) {
      if (fn(arr[i], arr[i + 1]) > 0) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
  }
  return arr
}
