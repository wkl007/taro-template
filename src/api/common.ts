import Taro from '@tarojs/taro'

export default class CommonServer {
  // 获取html代码片段
  static getHtmlContent (url: string): Promise<any> {
    return Taro.request({
      url,
      method: 'GET'
    })
  }
}
