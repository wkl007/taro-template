import { ComponentClass } from 'react'
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
  setLoginStatus: any;
  setAccessToken: any;
  setUserInfo: any;
}

interface ReduxOwnProps {}

interface ReduxState {}

interface ReduxPage {
  props: ReduxProps;
}

@connect(({ loginStatus, accessToken, userInfo }) => ({ loginStatus, accessToken, userInfo }),
  dispatch => ({
    setLoginStatus: (data: boolean) => dispatch(actions.setLoginStatus(data)),
    setAccessToken: (data: string) => dispatch(actions.setAccessToken(data)),
    setUserInfo: (data: any) => dispatch(actions.setUserInfo(data)),
  })
)
class ReduxPage extends Component {
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
    const { loginStatus, accessToken, userInfo } = this.props
    return (
      <View className='redux'>
        <Text>{loginStatus ? '已登录' : '未登录'}</Text>
        <AtButton onClick={this.changeLoginStatus}>修改登录状态</AtButton>
        <Text>{accessToken}</Text>
        <AtButton onClick={this.changeToken}>修改token</AtButton>
        <Text>{userInfo.name}</Text>
        <AtButton onClick={this.changeUserInfo}>修改用户信息</AtButton>
      </View>
    )
  }
}

export default ReduxPage as ComponentClass<ReduxOwnProps, ReduxState>
