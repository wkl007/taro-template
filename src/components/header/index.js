import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtAvatar } from 'taro-ui'

import { add, minus, asyncAdd } from '../../redux/actions/counter'

import './index.less'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Header extends Component {

  config = {
    navigationBarTitleText: '这是详情'
  }

  render () {
    return (
      <View className='index'>
        <AtAvatar image='https://jdc.jd.com/img/200'/>
        <AtAvatar text='凹凸实验室'/>
        <AtAvatar circle image='https://jdc.jd.com/img/200'/>
        <AtAvatar circle text='凹凸实验室'/>
      </View>
    )
  }
}

export default Header
