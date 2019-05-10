import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { Text } from '@tarojs/components'

import './index.scss'

class UIcon extends Component {
  static options = {
    addGlobalClass: true
  }

  static externalClasses = ['u-class']

  static propTypes = {
    icon: PropTypes.string,
    prefixClass: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func,
  }
  static defaultProps = {
    icon: '',
    prefixClass: 'iconfont',
    color: '#373737',
    size: 26,
    onClick: () => {}
  }

  render () {
    const { icon, onClick, prefixClass, color, size } = this.props
    return (
      <Text
        className={`u-class u-icon ${prefixClass} ${icon}`}
        onClick={onClick}
        style={{ color: `${color}`, fontSize: `${size}rpx` }}
      />
    )
  }
}

export default UIcon
