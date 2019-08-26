import Taro, { FC } from '@tarojs/taro'
import { Text } from '@tarojs/components'
import './index.scss'

interface UIconProps {
  icon: string;
  prefixClass?: string;
  color?: string;
  size?: number;
  customStyle?: any;
  onClick?: () => void;
}

const UIcon: FC<UIconProps> = ({ icon = '', prefixClass = 'iconfont', color = '#373737', size = 26, customStyle = {}, onClick }) => {
  const style = {
    color: `${color}`,
    fontSize: `${size}rpx`,
    ...customStyle
  }
  return (
    <Text
      className={`u-icon ${prefixClass} ${icon}`}
      onClick={onClick}
      style={style}
    />
  )
}

UIcon.options = {
  addGlobalClass: true
}

export default UIcon
