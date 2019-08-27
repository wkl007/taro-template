import Taro, { FC } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

interface EmptyProps {
  height?: number;
}

const Empty: FC<EmptyProps> = ({ height = 16 }) => (
  <View className='empty' style={{ height: `${height}rpx` }}/>
)

export default Empty
