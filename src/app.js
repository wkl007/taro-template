import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import configStore from '@/redux/store'
import { loadData, saveData, IS_IPHONEX, LOGIN_STATUS } from '@/utils/cache'
import { taroGetSystemInfo } from '@/utils/taroUtils'
import Index from '@/pages/index'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/redux/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount () {
    // this.checkLoginStatus()
    this.isIphoneX()
  }

  checkLoginStatus = () => {
    let loginStatus = loadData(LOGIN_STATUS)
    if (!loginStatus) {
      Taro.reLaunch({
        url: `/pages/details/index`
      })
    }
  }

  isIphoneX = () => {
    let isIpx = loadData(IS_IPHONEX)
    taroGetSystemInfo().then(res => {
      const deviceModel = 'iPhone X'
      let flag = false
      if (res.model.indexOf(deviceModel) > -1) {
        flag = true
      }
      if (isIpx !== flag) {
        saveData(IS_IPHONEX, flag)
      }
    }).catch(err => {})
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
