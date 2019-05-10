import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'

import './index.scss'

class CustomSwiper extends Component {

  static propTypes = {
    swiperList: PropTypes.array,
    onHandleClick: PropTypes.func
  }
  static defaultProps = {
    swiperList: [],
    onHandleClick: () => {}
  }

  render () {
    const { swiperList, onHandleClick } = this.props
    return (
      <View className='custom-swiper'>
        {
          swiperList.length && <Swiper
            interval={5000}
            duration={500}
            indicatorColor='#999'
            indicatorActiveColor='#333'
            autoplay
            indicatorDots
            circular
          >
            {swiperList.map((item, index) => (
              <SwiperItem
                key={index}
                onClick={() => onHandleClick(item)}
              >
                <Image src={item.imageUrl} className='swiper-img'/>
              </SwiperItem>
            ))}
          </Swiper>
        }
      </View>
    )
  }
}

export default CustomSwiper
