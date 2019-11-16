import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Empty from '@/components/Empty'
import Header from '@/components/Header'
import HtmlParse from '@/components/HtmlParse'
import GlobalLoading from '@/components/GlobalLoading'
import NoData from '@/components/NoData'
import UIcon from '@/components/UIcon'
import withShare from '@/utils/withShare'
import { getBannerList } from '@/api'

import './index.scss'

@withShare({})
class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentDidMount (): void {
    getBannerList().then(res => {
      console.log(res)
    }).catch(() => {})
  }

  goPage = (page: string) => {
    Taro.navigateTo({
      url: `/pages/${page}/index`
    })
  }

  render () {
    return (
      <View className='index'>
        <GlobalLoading
          loading={false}
        />
        <Header/>
        <UIcon size={100} color='red' icon='icon-chongzhi'/>
        <AtButton type='primary' onClick={() => this.goPage('redux')}>
          redux测试
        </AtButton>
        <Empty/>
        <AtButton type='primary' onClick={() => this.goPage('navigation')}>
          自定义导航
        </AtButton>
        <Empty/>
        <AtButton type='primary' onClick={() => this.goPage('write')}>
          手写板
        </AtButton>
        <Empty/>
        <NoData emptyImg='http://puui.qpic.cn/vcover_vt_pic/0/gozy3av1tsva9swt1469187012.jpg/0'/>
        <HtmlParse
          url='https://shancai-1257275967.coscd.myqcloud.com/shancai/images/20190731/center2019073111173646.html'
        />
        <View className='safe-area-no-inset-bottom right'>
          侧边固定区域
        </View>
        <View className='safe-area-inset-bottom bottom'>
          底部固定区域
        </View>
      </View>
    )
  }
}

export default Index
