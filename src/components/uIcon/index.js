import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { Text } from '@tarojs/components'

import './index.scss'

class UIcon extends Component {
  static options = {
    addGlobalClass: true
  }

  static propTypes = {
    icon: PropTypes.string,
    prefixClass: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    customStyle: PropTypes.object,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    icon: '',
    prefixClass: 'iconfont',
    color: '#373737',
    size: 26,
    customStyle: {},
    onClick: () => {}
  }

  render () {
    const { icon, onClick, prefixClass, color, size, customStyle } = this.props
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
}

export default UIcon
