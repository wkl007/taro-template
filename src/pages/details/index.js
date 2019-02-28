import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.less'

@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class Details extends Component {

  config = {
    navigationBarTitleText: '这是详情'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount () {
    console.log('详情页面will mount')
    console.log(this.$router.params)
  }

  componentDidMount () {
    console.log('详情页面did mount')
  }

  componentWillUnmount () {
    console.log('详情页面will unmount')
  }

  componentDidShow () {
    console.log('详情页面show')
  }

  componentDidHide () {
    console.log('详情页面hide')
  }

  render () {
    return (
      <View className='index'>

        <View><Text>详情页面</Text></View>
      </View>
    )
  }
}

export default Details
