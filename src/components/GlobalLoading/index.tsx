import Taro, { FC } from '@tarojs/taro'
import { Text, View } from '@tarojs/components'
import { AtActivityIndicator } from 'taro-ui'
import './index.scss'

interface GlobalLoadingProps {
  text?: string;
  loading: boolean
}

const GlobalLoading: FC<GlobalLoadingProps> = ({ text = '努力加载中...', loading = false }) => {
  return loading ? <View className='global-loading'>
    <View className='loading-wrapper'>
      <AtActivityIndicator
        size={100}
        mode='center'
      />
      <Text className='text'>{text}</Text>
    </View>
  </View> : null
}

export default GlobalLoading
