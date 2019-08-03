import Taro from '@tarojs/taro'

export const LOGIN_STATUS = 'LOGIN_STATUS' // 当前用户登录状态

export const USER_INFO = 'User_Info' // 用户信息

export const ACCESS_TOKEN = 'Access_Token' // token

export const IS_IPHONEX = 'Is_IphoneX' // 当前设备是否是iphoneX

export const setStorage = (key, data) => {
  Taro.setStorageSync(key, data)
}

export const getStorage = (key) => {
  return Taro.getStorageSync(key)
}

export const removeStorage = (key) => {
  return Taro.removeStorageSync(key)
}

export const loadData = (key) => {
  return getStorage(key) || ''
}

export const saveData = (key, value) => {
  setStorage(key, value)
  return value
}

export const removeData = (key) => {
  removeStorage(key)
  return ''
}
