import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
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
class Index extends Component {

  config = {
    navigationBarTitleText: '这是首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount () {
    console.log('首页will mount')
  }

  componentDidMount () {
    console.log('首页did mount')
  }

  componentWillUnmount () {
    console.log('首页will unmount')
  }

  componentDidShow () {
    console.log('首页show')
  }

  componentDidHide () {
    console.log('首页hide')
  }

  goDetails = (id, e) => {
    console.log(id, e)
    Taro.navigateTo({
      url: `/pages/details/index?id=${id}`
    })
  }

  render () {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        <Button onClick={this.goDetails.bind(this, '1234')}>跳转到详情页面</Button>
      </View>
    )
  }
}

export default Index
