import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'

import './index.scss'

class CustomSwipe extends Component {

  static propTypes = {
    swipeList: PropTypes.array,
    onHandleClick: PropTypes.func
  }
  static defaultProps = {
    swipeList: [],
    onHandleClick: () => {}
  }

  render () {
    const { swipeList, onHandleClick } = this.props
    return (
      <View className='custom-swipe'>
        {
          swipeList.length && <Swiper
            interval={5000}
            duration={500}
            indicatorColor='#999'
            indicatorActiveColor='#333'
            autoplay
            indicatorDots
            circular
          >
            {swipeList.map((item, index) => (
              <SwiperItem
                key={index}
                onClick={() => onHandleClick(item)}
              >
                <Image src={item.imageUrl} className='swipe-img'/>
              </SwiperItem>
            ))}
          </Swiper>
        }
      </View>
    )
  }
}

export default CustomSwipe
