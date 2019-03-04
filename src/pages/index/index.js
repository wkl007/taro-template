import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtIcon, AtForm, AtInput, AtLoadMore } from 'taro-ui'
import dayjs from 'dayjs'
import Header from '@/components/header'
import { add, minus, asyncAdd } from '../../actions/counter'

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
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      status: 'loading'
    }
  }

  config = {
    navigationBarTitleText: '这是首页'
  }

  componentDidMount () {
    console.log('首页did mount')
// 正确写法
    if (process.env.NODE_ENV === 'development') {
    }
    console.log(process.env.BASE_URL)

    /*Taro.showToast({
      title: '成功',
      icon: 'loading',
      duration: 2000
    })*/
    setTimeout(() => {
      this.setState({
        status: 'noMore'
      })
    }, 3000)
  }

  /*componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount () {
    console.log('首页will mount')
  }



  componentWillUnmount () {
    console.log('首页will unmount')
  }

  componentDidShow () {
    console.log('首页show')
  }

  componentDidHide () {
    console.log('首页hide')
  }*/

  goDetails = (id, e) => {
    console.log(id, e)
    Taro.navigateTo({
      url: `/pages/details/index?id=${id}`
    })
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  onSubmit (event) {
    console.log(this.state)
  }

  onReset (event) {
    console.log(event)
  }

  render () {
    const numbers = [...Array(100).keys()] // [0, 1, 2, ..., 98, 99]
    const listItems = numbers.map((number) => {
      return <Text
        className='li'
        key={String(number)}
      > 我是第 {number + 1} 个数字</Text>
    })
    return (
      <View className='index'>
        <wxparser rich-text={html}/>
        <Text>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</Text>
        <Header/>
        <AtLoadMore
          status={this.state.status}
        />
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='value'
            title='文本'
            type='text'
            placeholder='单行文本'
            value={this.state.value}
            onChange={this.handleChange.bind(this)}
          />
          <AtButton formType='submit'>提交</AtButton>
          <AtButton formType='reset'>重置</AtButton>
        </AtForm>
        <AtButton type='primary'>按钮文案</AtButton>
        <Text className='at-icon at-icon-settings'/>
        <Text className='at-icon at-icon-settings'/>
        <Text className='iconfont icon-address'/>
        <AtIcon value='bell' size='30' color='#F00'/>
        <AtIcon prefixClass='iconfont' value='chongzhi' size='30' color='#F00'/>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        <Button onClick={this.goDetails.bind(this, '1234')}>跳转到详情页面</Button>
        {listItems}
      </View>
    )
  }
}

export default Index
