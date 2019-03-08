import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import WxParse from '../../components/wxParse/wxParse'
import { add, minus, asyncAdd } from '../../redux/actions/counter'

import './index.less'

const html = `<div class="hue-list-item"> <div class="hue-list-content"> <div class="normal-text"> <div class="normal-text-content"> 着力打造集购物、餐饮、娱乐、休闲、旅游、商务为一体的一站式消费天堂 </div>  </div><div class="normal-text">  <img src="https://p1.meituan.net/poi/559a682d29587f5ba14ad7db6050351b256817.jpg"> </div><div class="normal-text"> <div class="normal-text-content"> 以盛唐文化为背景，以唐风元素为主线，以体验消费为特征，着力打造集购物、餐饮、娱乐、休闲、旅游、商务为一体的一站式消费天堂-中国文化MALL。 </div>  </div><div class="normal-text">  <img src="https://p0.meituan.net/travel/b09ab0e1a84845bbdde7882e98c7f92b373580.png"> </div><div class="normal-text"> <div class="normal-text-content"> 大唐不夜城项目位于西安曲江新区举世闻名的大雁塔脚下，是陕西省、西安市重点建设项目。该项目以盛唐文化为背景，以唐风元素为主线，以体验消费为特征，着力打造集购物、餐饮、娱乐、休闲、旅游、商务为一体的一站式消费天堂。 </div>  </div><div class="normal-text">  <img src="https://p0.meituan.net/travel/b71bbb24121fe72570d3f0e97457e394280787.png"> </div><div class="normal-text"> <div class="normal-text-content"> 大唐不夜城的中轴景观大道是一条1500米横贯南北的中央雕塑景观步行街，其上分布着盛世帝王、历史人物、英雄故事、经典艺术作品等九组主题群雕，立体展现大唐帝国在宗教、文学、艺术、科技等领域的至尊地位并彰显大国气象。 </div>  </div> </div> </div>`

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
    WxParse.wxParse('html', 'html', html, this.$scope, 0)
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

        <import src='../../components/wxParse/wxParse.wxml'/>
        <template is='wxParse' data='{{wxParseData:html.nodes}}'/>
      </View>
    )
  }
}

export default Details
