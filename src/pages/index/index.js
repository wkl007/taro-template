import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtButton, AtIcon, AtForm, AtInput, AtLoadMore } from 'taro-ui'
import dayjs from 'dayjs'
import Header from '@/components/header'
import { getBannerList } from '../../api'
import './index.less'

const html = `222`

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
    // console.log('首页did mount')
    getBannerList().then(res => {
      console.log(res)
    }).catch(err => {})
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
    // console.log(id, e)
    Taro.navigateTo({
      url: `/pages/details/index?id=${id}`
    })
  }

  goRedux = () => {
    Taro.navigateTo({
      url: `/pages/redux/index`
    })
  }

  handleChange (value) {
    this.setState({
      value
    })
  }

  onSubmit (event) {
    // console.log(this.state)
  }

  onReset (event) {
    // console.log(event)
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
        <AtButton onClick={this.goDetails.bind(this, '1234')}>详情页面</AtButton>
        <AtButton type='primary' onClick={this.goRedux}>redux页面</AtButton>
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
        <Text className='at-icon at-icon-settings'/>
        <Text className='at-icon at-icon-settings'/>
        <Text className='iconfont icon-address'/>
        <AtIcon value='bell' size='30' color='#F00'/>
        <AtIcon prefixClass='iconfont' value='chongzhi' size='30' color='#F00'/>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        {listItems}
      </View>
    )
  }
}

export default Index
