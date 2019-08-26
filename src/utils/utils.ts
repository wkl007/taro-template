import dayjs, { ConfigType } from 'dayjs'
import numeral from 'numeral'

/**
 * 判断url
 * @param path
 */
export function isUrl (path: string): boolean {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}

/**
 * 防抖
 * @param func
 * @param delay
 */
export function debounce (func: Function, delay: number): Function {
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
 */
export function throttle (func: Function, gapTime: number): Function {
  let _lastTime = 0

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
 * @param arr arr
 * @param fn 升序(a, b) => a - b) 降序 (a, b) => b - a)
 */
export function bubble_sort (arr: Array<number>, fn: Function): Array<number> {
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

/**
 * 格式化时间
 * @param date
 * @param format
 */
export function dateFormat (date?: ConfigType, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(date).format(format)
}

/**
 * 格式化数字
 * @param number
 * @param format
 */
export function numberFormat (number: number, format: string = '0,00.00'): string | undefined {
  if (!number) return
  return numeral(number).format(format)
}
