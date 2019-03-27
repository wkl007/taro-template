import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'

import './index.scss'

class Header extends Component {

  render () {
    return (
      <View className='header'>
        <Text>头部组件</Text>
        <AtAvatar image='https://jdc.jd.com/img/200'/>
        <AtAvatar text='凹凸实验室'/>
        <AtAvatar circle image='https://jdc.jd.com/img/200'/>
        <AtAvatar circle text='凹凸实验室'/>
      </View>
    )
  }
}

export default Header
