import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import NavBar from 'taro-navigationbar'

import './index.scss'

const Navigation: FC = () => (
  <View className='navigation'>
    <NavBar
      back
      home
      searchBar
      onHome={() => {
        Taro.reLaunch({
          url: '/pages/index/index'
        })
      }}
    />
  </View>
)

Navigation.config = {
  navigationStyle: 'custom'
}

export default Navigation
