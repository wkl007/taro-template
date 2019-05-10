import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'

import './index.scss'

class Empty extends Component {
  static propTypes = {
    height: PropTypes.number
  }
  static defaultProps = {
    height: 16
  }

  render () {
    const { height } = this.props
    return (
      <View className='empty' style={{ height: `${height}rpx` }}>

      </View>
    )
  }
}

export default Empty
