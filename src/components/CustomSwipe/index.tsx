import Taro, { FC } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'

interface CustomSwipeProps {
  swipeList?: Array<{ imageUrl: string; }>;
  onClick: (item: any) => void;
}

const CustomSwipe: FC<CustomSwipeProps> = ({ swipeList = [], onClick }) => (
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
        {swipeList.map((item: { imageUrl: string; }, index) => (
          <SwiperItem
            key={index}
            onClick={() => onClick(item)}
          >
            <Image src={item.imageUrl} className='swipe-img'/>
          </SwiperItem>
        ))}
      </Swiper>
    }
  </View>
)

export default CustomSwipe
