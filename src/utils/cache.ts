import Taro from '@tarojs/taro'

export const LOGIN_STATUS: string = 'LOGIN_STATUS' // 当前用户登录状态

export const USER_INFO: string = 'User_Info' // 用户信息

export const ACCESS_TOKEN: string = 'Access_Token' // token

export function setStorageSync (key: string, data: string | any): void {
  Taro.setStorageSync(key, data)
}

export function getStorageSync (key: string): any | undefined {
  return Taro.getStorageSync(key)
}

export function removeStorageSync (key: string): void {
  Taro.removeStorageSync(key)
}

export function saveData (key: string, value: string | any): string | any {
  setStorageSync(key, value)
  return value
}

export function loadData (key: string): any | undefined {
  return getStorageSync(key) || ''
}

export function removeData (key: string): any | undefined {
  removeStorageSync(key)
  return ''
}
