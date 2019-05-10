import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Header from '@/components/header'
import UIcon from '@/components/uIcon'
import { getBannerList } from '@/api'
import withShare from '@/utils/withShare'

import './index.scss'

@withShare({})
class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    usingComponents: {
      painter: '../../weappComponents/painter/painter'
    }
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
        <UIcon icon='icon-chongzhi' size={50}/>
        <AtButton type='primary' onClick={this.goRedux}>redux测试</AtButton>
      </View>
    )
  }
}

export default Index
