import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Image, Text, } from '@tarojs/components'

import './index.scss'

class noData extends Component {

  static propTypes = {
    emptyImg: PropTypes.string,
    text: PropTypes.string,
    top: PropTypes.number,
    bottom: PropTypes.number,
    fixed: PropTypes.bool
  }
  static defaultProps = {
    emptyImg: '',
    text: '',
    top: 50,
    bottom: 50,
    fixed: false
  }

  render () {
    const { emptyImg, text, top, bottom, fixed } = this.props
    let style = {}
    if (!fixed) {
      style = { margin: `${top}px auto ${bottom}px` }
    }
    return (
      <View
        className={fixed ? 'no-data fixed' : 'no-data'}
        style={style}
      >
        <Image
          src={emptyImg}
          className='empty-img'
          mode='widthFix'
        />
        <Text className='text'>{text}</Text>
      </View>
    )
  }
}

export default noData
