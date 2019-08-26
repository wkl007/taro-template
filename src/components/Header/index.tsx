import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import './index.scss'

const Header: FC = () => (
  <View className='header'>
    <AtAvatar image='https://jdc.jd.com/img/200'/>
    <AtAvatar text='凹凸实验室'/>
    <AtAvatar circle image='https://jdc.jd.com/img/200'/>
    <AtAvatar circle text='凹凸实验室'/>
  </View>
)

export default Header
