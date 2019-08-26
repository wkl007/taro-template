import Taro, { Component, Config } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import actions from '@/redux/actions'

import './index.scss'

interface ReduxProps {
  loginStatus: boolean;
  accessToken: string;
  userInfo: any;
  isIpx: boolean;
  setLoginStatus: Function;
  setAccessToken: Function;
  setUserInfo: Function;
  setIsIpx: Function;
}

interface ReduxState {}

class ReduxPage extends Component<ReduxProps, ReduxState> {
  config: Config = {
    navigationBarTitleText: 'redux'
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
        <Text>{isIpx ? '是iPhoneX' : '不是iPhoneX'}</Text> </View>
    )
  }
}

const mapStateToProps = (state: ReduxProps) => ({
  userInfo: state.userInfo,
  accessToken: state.accessToken,
  isIpx: state.isIpx,
  loginStatus: state.loginStatus
})

const mapDispatchToProps = (dispatch: any) => ({
  setLoginStatus: (data: boolean) => dispatch(actions.setLoginStatus(data)),
  setAccessToken: (data: string) => dispatch(actions.setAccessToken(data)),
  setUserInfo: (data: any) => dispatch(actions.setUserInfo(data)),
  setIsIpx: (data: boolean) => dispatch(actions.setIsIpx(data)),
})

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(ReduxPage)
