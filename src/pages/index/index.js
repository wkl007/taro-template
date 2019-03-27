import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Header from '../../components/header'
import { getBannerList } from '../../api'

import './index.scss'

class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount () {
    getBannerList().then(res => {
      console.log(res)
    }).catch(err => {})
  }

  goRedux = () => {
    Taro.navigateTo({
      url: `/pages/redux/index`
    })
  }

  render () {
    return (
      <View className='index'>
        <Header/>
        <AtButton type='primary' onClick={this.goRedux}>redux测试</AtButton>
      </View>
    )
  }
}

export default Index
