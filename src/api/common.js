import Taro from '@tarojs/taro'
import request from '@/utils/request'

export default class CommonServer {
  //获取html代码片段
  static getHtmlContent (url) {
    return Taro.request({
      url,
      method: 'get'
    })
  }
}
