import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton } from 'taro-ui'
import actions from '@/redux/actions'

@connect(({ loginStatus, accessToken, userInfo, isIpx }) => ({
  loginStatus,
  accessToken,
  userInfo,
  isIpx
}), (dispatch) => ({
  setLoginStatus: data => dispatch(actions.setLoginStatus(data)),
  setAccessToken: data => dispatch(actions.setAccessToken(data)),
  setUserInfo: data => dispatch(actions.setUserInfo(data)),
  setIsIpx: data => dispatch(actions.setIsIpx(data)),
}))
class Index extends Component {

  config = {
    navigationBarTitleText: 'redux测试'
  }

  changeToken = () => {
    const { setAccessToken } = this.props
    setAccessToken(Math.random())
  }

  changeLoginStatus = () => {
    const { setLoginStatus, loginStatus } = this.props
    setLoginStatus(!loginStatus)
  }

  changeUserInfo = () => {
    const { setUserInfo } = this.props
    let data = {
      name: `小王${Math.random() * 10}`
    }
    setUserInfo(data)
  }

  render () {
    const { loginStatus, accessToken, userInfo, isIpx } = this.props
    return (
      <View className='redux'>
        <Text>{loginStatus ? '已登录' : '未登录'}</Text>
        <AtButton onClick={this.changeLoginStatus}>修改登录状态</AtButton>
        <Text>{accessToken}</Text>
        <AtButton onClick={this.changeToken}>修改token</AtButton>
        <Text>{userInfo.name}</Text>
        <AtButton onClick={this.changeUserInfo}>修改用户信息</AtButton>
        <Text>{isIpx ? '是iPhoneX' : '不是iPhoneX'}</Text>
      </View>
    )
  }
}

export default Index
