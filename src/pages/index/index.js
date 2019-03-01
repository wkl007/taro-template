import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtIcon, AtForm, AtInput, AtLoadMore } from 'taro-ui'
import dayjs from 'dayjs'
import { add, minus, asyncAdd } from '../../actions/counter'
import Header from '../../components/header'

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
