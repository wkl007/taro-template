import Taro, { FC } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

interface NoDataProps {
  emptyImg: string
  text?: string
  top?: number
  bottom?: number
  fixed?: boolean
}

const NoData: FC<NoDataProps> = ({ emptyImg = '', text = '暂无数据', top = 50, bottom = 50, fixed = false }) => {
  let style = {}
  if (!fixed) style = { margin: `${top}px auto ${bottom}px` }
  return (
    <View className={classNames('no-data', { 'fixed': fixed })} style={style}>
      <Image
        src={emptyImg}
        className='empty-img'
        mode='widthFix'
      />
      <Text className='text'>{text}</Text>
    </View>
  )
}

export default NoData
