import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { AtActivityIndicator } from 'taro-ui'
import { View, Text } from '@tarojs/components'

import './index.scss'

class GlobalLoading extends Component {

  static propTypes = {
    text: PropTypes.string,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    text: '努力加载中...',
    loading: false
  }

  render () {
    const { text, loading } = this.props
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
}

export default GlobalLoading
