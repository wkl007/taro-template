import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, RichText } from '@tarojs/components'
import { isUrl } from '@/utils/utils'
import CommonServer from '@/api/common'

import './index.scss'

class HtmlParse extends Component {

  static propTypes = {
    url: PropTypes.string,
    onHtmlLoad: PropTypes.func,
  }
  static defaultProps = {
    url: '',
    onHtmlLoad: () => {}
  }

  state = {
    content: '数据加载中...'
  }

  componentDidMount () {
    this.getHtmlContent()
  }

  getHtmlContent = () => {
    const { url, onHtmlLoad } = this.props
    if (isUrl(url)) {
      CommonServer.getHtmlContent(url).then(res => {
        this.setState({
          content: this.parseHtmlContent(res.data) || '暂无数据'
        })
        onHtmlLoad()
      })
    } else {
      this.setState({
        content: this.parseHtmlContent(url) || '暂无数据'
      })
      onHtmlLoad()
    }
  }

  parseHtmlContent = (html) => {
    return html
      .replace(/section/g, 'div')
      .replace(/<img([\s\S]*?)(src="[^"]+")[^>]+>/g, function (all, group1, group2) {
        return `<img ${group2} width="100%" style="max-width:100% !important;height:auto;display:block;margin: 5px auto" />`
      })
      .replace(/<table([\s\S]*?)[^>]+>/g, function () {
        return `<table width="100%"/>`
      })
  }

  render () {
    const { content } = this.state
    return (
      <View className='html-parse'>
        <RichText className='rich-text' nodes={content}/>
      </View>
    )
  }
}

export default HtmlParse
