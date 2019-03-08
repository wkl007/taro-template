import Taro from '@tarojs/taro'
import configStore from '../redux/store'
import actions from '../redux/actions'
import { loadData, ACCESS_TOKEN } from './catche'

import { isUrl } from './utils'

const store = configStore()
const baseURL = process.env.BASE_URL
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

/**
 * 状态检查
 * @param response
 * @returns {*}
 */
function checkStatus (response) {
  const { statusCode, data } = response
  if (statusCode >= 200 && statusCode < 300) {
    return data
  }
  const errorText = codeMessage[statusCode]
  const error = new Error(errorText)
  error.name = statusCode
  error.response = response
  throw error
}

export default function request (options) {
  const accessToken = loadData(ACCESS_TOKEN)
  const { url, method = 'get', data } = options
  let header = {}
  if (accessToken) {
    header.Authorization = `JWT ${accessToken}`
  }
  return Taro.request({
    url: isUrl(url) ? url : `${baseURL}${url}`,
    method: method.toUpperCase(),
    data,
    header: { ...header, ...options.header }
  }).then(checkStatus)
    .then(res => {
      const { status, data, errCode, errMsg, } = res
      if (status === 1) {
        return data
      } else if (status === 0 && (errCode === 401 || errCode === 403)) {
        store.dispatch(actions.setLoginStatus(false))
        store.dispatch(actions.setUserInfo(''))
        store.dispatch(actions.setAccessToken(''))
        //跳转到首页
        Taro.reLaunch({
          url: '/pages/index/index'
        })
        return Promise.reject(res)
      } else {
        Taro.hideLoading()
        if (errMsg) {
          Taro.showToast({
            title: errMsg,
            icon: 'none',
            duration: 3000
          })
        }
        return Promise.reject(res)
      }
    })
    .catch(err => {
      return Promise.reject(err)
    })
}
