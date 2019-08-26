import Taro, { Component } from '@tarojs/taro'
import { RichText, View } from '@tarojs/components'
import { isUrl } from '@/utils/utils'
import CommonServer from '@/api/common'
import './index.scss'

function parseHtmlContent (html: string): string {
  return html
    .replace(/section/g, 'div')
    .replace(/<img([\s\S]*?)(src="[^"]+")[^>]+>/g, function (_all, _group1, group2) {
      return `<img ${group2} width="100%" style="max-width:100% !important;height:auto;display:block;margin: 5px auto" />`
    })
    .replace(/<table([\s\S]*?)[^>]+>/g, function () {
      return `<table width="100%"/>`
    })
}

interface HtmlParseProps {
  url: string;
  onHtmlLoad?: () => void;
}

interface HtmlParseState {
  content: string;
}

class HtmlParse extends Component<HtmlParseProps, HtmlParseState> {
  state = {
    content: '数据加载中...'
  }

  componentDidMount (): void {
    this.getHtmlContent()
  }

  getHtmlContent = async () => {
    const { url, onHtmlLoad } = this.props
    let content = url
    if (isUrl(url)) content = (await CommonServer.getHtmlContent(url)).data

    this.setState({
      content: parseHtmlContent(content) || '暂无数据'
    })
    onHtmlLoad && onHtmlLoad()
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

