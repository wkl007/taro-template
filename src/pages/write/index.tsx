import Taro, { Component, Config } from '@tarojs/taro'
import { Button, Canvas, Image, View } from '@tarojs/components'
import images from '@/assets/images'
import classNames from 'classnames'
import { taroDownload } from '@/utils/taroUtils'

import './index.scss'

export default class Write extends Component {
  config: Config = {
    navigationBarTitleText: '手写板实例'
  }

  ctx: any

  state = {
    selectColor: 'black',

    canvasName: 'handWriting',
    canvasWidth: 0,
    canvasHeight: 0,
    transparent: 1, // 透明度
    lineColor: '#1A1A1A', // 颜色
    lineSize: 1.5,  // 笔记倍数
    lineMin: 0.5,   // 最小笔画半径
    lineMax: 4,     // 最大笔画半径
    pressure: 1,     // 默认压力
    smoothness: 60,  // 顺滑度，用60的距离来计算速度
    currentPoint: {},
    currentLine: [],  // 当前线条
    firstTouch: true, // 第一次触发
    radius: 1, // 画圆的半径
    cutArea: { top: 0, right: 0, bottom: 0, left: 0 }, // 裁剪区域
    bethelPoint: [],  // 保存所有线条 生成的贝塞尔点；
    lastPoint: 0,
    chirography: [], // 笔迹
    currentChirography: {}, // 当前笔迹
    linePrack: [] // 划线轨迹 , 生成线条的实际点
  }

  componentDidMount (): void {
    this.initCanvas()
  }

  // 初始化canvas
  initCanvas = () => {
    const canvasName = this.state.canvasName
    this.ctx = Taro.createCanvasContext(canvasName)
    const query = Taro.createSelectorQuery()
    query.select('.handCenter').boundingClientRect((rect: any) => {
      this.setState({
        canvasWidth: rect.width,
        canvasHeight: rect.height
      })
    }).exec()
  }

  // 切换颜色
  selectColor = (selectColor: string, lineColor: string) => {
    this.setState({
      selectColor,
      lineColor
    })
  }

  // 笔迹开始
  uploadScaleStart = (e: any) => {
    if (e.type != 'touchstart') return false
    const ctx = this.ctx
    ctx.setFillStyle(this.state.lineColor)  // 初始线条设置颜色
    ctx.setGlobalAlpha(this.state.transparent)  // 设置半透明
    const currentPoint = {
      x: e.touches[0].x,
      y: e.touches[0].y
    }
    const currentLine: any = this.state.currentLine
    currentLine.unshift({
      time: new Date().getTime(),
      dis: 0,
      x: currentPoint.x,
      y: currentPoint.y
    })
    this.setState({
      currentPoint,
      // currentLine
    })
    if (this.state.firstTouch) {
      this.setState({
        cutArea: { top: currentPoint.y, right: currentPoint.x, bottom: currentPoint.y, left: currentPoint.x },
        firstTouch: false
      })
    }
    this.pointToLine(currentLine)
  }

  // 笔迹移动
  uploadScaleMove = (e: any) => {
    if (e.type != 'touchmove') return false
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
        e.preventDefault()
      }
    }
    const point = {
      x: e.touches[0].x,
      y: e.touches[0].y
    }

    // 测试裁剪
    if (point.y < this.state.cutArea.top) {
      this.state.cutArea.top = point.y
    }
    if (point.y < 0) this.state.cutArea.top = 0

    if (point.x > this.state.cutArea.right) {
      this.state.cutArea.right = point.x
    }
    if (this.state.canvasWidth - point.x <= 0) {
      this.state.cutArea.right = this.state.canvasWidth
    }
    if (point.y > this.state.cutArea.bottom) {
      this.state.cutArea.bottom = point.y
    }
    if (this.state.canvasHeight - point.y <= 0) {
      this.state.cutArea.bottom = this.state.canvasHeight
    }
    if (point.x < this.state.cutArea.left) {
      this.state.cutArea.left = point.x
    }
    if (point.x < 0) this.state.cutArea.left = 0

    this.setState({
      lastPoint: this.state.currentPoint,
      currentPoint: point
    })
    const currentLine: any = this.state.currentLine
    currentLine.unshift({
      time: new Date().getTime(),
      dis: this.distance(this.state.currentPoint, this.state.lastPoint),
      x: point.x,
      y: point.y
    })
    // this.setData({
    //   currentLine
    // })
    this.pointToLine(currentLine)
  }

  // 笔迹结束
  uploadScaleEnd = (e: any) => {
    if (e.type != 'touchend') return 0
    const point = {
      x: e.changedTouches[0].x,
      y: e.changedTouches[0].y
    }
    this.setState({
      lastPoint: this.state.currentPoint,
      currentPoint: point
    })
    const currentLine: any = this.state.currentLine
    currentLine.unshift({
      time: new Date().getTime(),
      dis: this.distance(this.state.currentPoint, this.state.lastPoint),
      x: point.x,
      y: point.y
    })
    // this.setData({
    //   currentLine
    // })
    if (currentLine.length > 2) {
      const info = (currentLine[0].time - currentLine[currentLine.length - 1].time) / currentLine.length
      // $("#info").text(info.toFixed(2));
    }
    // 一笔结束，保存笔迹的坐标点，清空，当前笔迹
    // 增加判断是否在手写区域；
    this.pointToLine(currentLine)
    const currentChirography = {
      lineSize: this.state.lineSize,
      lineColor: this.state.lineColor
    }
    const chirography: any = this.state.chirography
    chirography.unshift(currentChirography)
    this.setState({
      chirography
    })
    const linePrack: any = this.state.linePrack
    linePrack.unshift(this.state.currentLine)
    this.setState({
      linePrack,
      currentLine: []
    })
  }

  // 清空canvas
  resetCanvas = () => {
    this.ctx.clearRect(0, 0, 700, 730)
    this.ctx.draw()
  }

  // 保存图片
  saveCanvas = () => {
    const canvasName = this.state.canvasName
    /* this.ctx.draw(true, () => { }) */
    Taro.showLoading({
      title: '图片生成中'
    })
    setTimeout(() => {
      Taro.hideLoading()
      Taro.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvas: canvasName,
        canvasId: canvasName,
        quality: 1,
        success: res => {
          taroDownload(res.tempFilePath).then(res => {
            Taro.showToast({
              title: '下载成功',
              icon: 'none'
            })
          }).catch(err => {
            Taro.showToast({
              title: '下载失败',
              icon: 'none'
            })
          })
        }
      })
    }, 500)
  }

  // 画两点之间的线条；参数为:line，会绘制最近的开始的两个点；
  pointToLine = (line) => {
    this.calcBethelLine(line)
  }

  // 计算插值的方式
  calcBethelLine = (line) => {
    if (line.length <= 1) {
      line[0].r = this.state.radius
      return
    }
    let x0, x1, x2, y0, y1, y2, r0, r1, r2, len, lastRadius, dis = 0, time = 0, curveValue = 0.5
    if (line.length <= 2) {
      x0 = line[1].x
      y0 = line[1].y
      x2 = line[1].x + (line[0].x - line[1].x) * curveValue
      y2 = line[1].y + (line[0].y - line[1].y) * curveValue
      // x2 = line[1].x;
      // y2 = line[1].y;
      x1 = x0 + (x2 - x0) * curveValue
      y1 = y0 + (y2 - y0) * curveValue

    } else {
      x0 = line[2].x + (line[1].x - line[2].x) * curveValue
      y0 = line[2].y + (line[1].y - line[2].y) * curveValue
      x1 = line[1].x
      y1 = line[1].y
      x2 = x1 + (line[0].x - x1) * curveValue
      y2 = y1 + (line[0].y - y1) * curveValue
    }
    // 从计算公式看，三个点分别是(x0,y0),(x1,y1),(x2,y2) ；(x1,y1)这个是控制点，控制点不会落在曲线上；实际上，这个点还会手写获取的实际点，却落在曲线上
    len = this.distance({ x: x2, y: y2 }, { x: x0, y: y0 })
    lastRadius = this.state.radius
    for (let n = 0; n < line.length - 1; n++) {
      dis += line[n].dis
      time += line[n].time - line[n + 1].time
      if (dis > this.state.smoothness) break
    }
    this.setState({
      radius: Math.min(time / len * this.state.pressure + this.state.lineMin, this.state.lineMax) * this.state.lineSize
    })
    line[0].r = this.state.radius
    // 计算笔迹半径
    if (line.length <= 2) {
      r0 = (lastRadius + this.state.radius) / 2
      r1 = r0
      r2 = r1
    } else {
      r0 = (line[2].r + line[1].r) / 2
      r1 = line[1].r
      r2 = (line[1].r + line[0].r) / 2
    }
    const n = 5
    let point: Array<any> = []
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1)
      const x = (1 - t) * (1 - t) * x0 + 2 * t * (1 - t) * x1 + t * t * x2
      const y = (1 - t) * (1 - t) * y0 + 2 * t * (1 - t) * y1 + t * t * y2
      const r = lastRadius + (this.state.radius - lastRadius) / n * i
      point.push({ x: x, y: y, r: r })
      if (point.length == 3) {
        const a = this.ctaCalc(point[0].x, point[0].y, point[0].r, point[1].x, point[1].y, point[1].r, point[2].x, point[2].y, point[2].r)
        a[0].color = this.state.lineColor
        // let bethelPoint = this.state.bethelPoint;
        // bethelPoint = bethelPoint.push(a);
        this.bethelDraw(a, 1)
        point = [{ x: x, y: y, r: r }]
      }
    }
    this.setState({
      currentLine: line
    })
  }

  // 求两点之间距离
  distance = (a, b) => {
    const x = b.x - a.x
    const y = b.y - a.y
    return Math.sqrt(x * x + y * y)
  }

  ctaCalc = (x0, y0, r0, x1, y1, r1, x2, y2, r2) => {
    let a: any = [], vx01, vy01, norm, n_x0, n_y0, vx21, vy21, n_x2, n_y2
    vx01 = x1 - x0
    vy01 = y1 - y0
    norm = Math.sqrt(vx01 * vx01 + vy01 * vy01 + 0.0001) * 2
    vx01 = vx01 / norm * r0
    vy01 = vy01 / norm * r0
    n_x0 = vy01
    n_y0 = -vx01
    vx21 = x1 - x2
    vy21 = y1 - y2
    norm = Math.sqrt(vx21 * vx21 + vy21 * vy21 + 0.0001) * 2
    vx21 = vx21 / norm * r2
    vy21 = vy21 / norm * r2
    n_x2 = -vy21
    n_y2 = vx21
    a.push({ mx: x0 + n_x0, my: y0 + n_y0, color: '#1A1A1A' })
    a.push({ c1x: x1 + n_x0, c1y: y1 + n_y0, c2x: x1 + n_x2, c2y: y1 + n_y2, ex: x2 + n_x2, ey: y2 + n_y2 })
    a.push({
      c1x: x2 + n_x2 - vx21,
      c1y: y2 + n_y2 - vy21,
      c2x: x2 - n_x2 - vx21,
      c2y: y2 - n_y2 - vy21,
      ex: x2 - n_x2,
      ey: y2 - n_y2
    })
    a.push({ c1x: x1 - n_x2, c1y: y1 - n_y2, c2x: x1 - n_x0, c2y: y1 - n_y0, ex: x0 - n_x0, ey: y0 - n_y0 })
    a.push({
      c1x: x0 - n_x0 - vx01,
      c1y: y0 - n_y0 - vy01,
      c2x: x0 + n_x0 - vx01,
      c2y: y0 + n_y0 - vy01,
      ex: x0 + n_x0,
      ey: y0 + n_y0
    })
    a[0].mx = a[0].mx.toFixed(1)
    a[0].mx = parseFloat(a[0].mx)
    a[0].my = a[0].my.toFixed(1)
    a[0].my = parseFloat(a[0].my)
    for (let i = 1; i < a.length; i++) {
      a[i].c1x = a[i].c1x.toFixed(1)
      a[i].c1x = parseFloat(a[i].c1x)
      a[i].c1y = a[i].c1y.toFixed(1)
      a[i].c1y = parseFloat(a[i].c1y)
      a[i].c2x = a[i].c2x.toFixed(1)
      a[i].c2x = parseFloat(a[i].c2x)
      a[i].c2y = a[i].c2y.toFixed(1)
      a[i].c2y = parseFloat(a[i].c2y)
      a[i].ex = a[i].ex.toFixed(1)
      a[i].ex = parseFloat(a[i].ex)
      a[i].ey = a[i].ey.toFixed(1)
      a[i].ey = parseFloat(a[i].ey)
    }
    return a
  }

  bethelDraw = (point: any, is_fill: any, color?: string) => {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.moveTo(point[0].mx, point[0].my)
    if (undefined != color) {
      ctx.setFillStyle(color)
      ctx.setStrokeStyle(color)
    } else {
      ctx.setFillStyle(point[0].color)
      ctx.setStrokeStyle(point[0].color)
    }
    for (let i = 1; i < point.length; i++) {
      ctx.bezierCurveTo(point[i].c1x, point[i].c1y, point[i].c2x, point[i].c2y, point[i].ex, point[i].ey)
    }
    ctx.stroke()
    if (undefined != is_fill) {
      ctx.fill() // 填充图形 ( 后绘制的图形会覆盖前面的图形, 绘制时注意先后顺序 )
    }
    ctx.draw(true)
  }

  render () {
    const { selectColor } = this.state
    return <View className='write'>
      <View className='handBtn'>
        <Image
          className={classNames('black-select', { 'color_select': selectColor === 'black' })}
          src={selectColor === 'black' ? images.color_black_selected : images.color_black}
          onClick={() => this.selectColor('black', '#1A1A1A')}
        />
        <Image
          className={classNames('red-select', { 'color_select': selectColor === 'red' })}
          src={selectColor === 'red' ? images.color_red_selected : images.color_red}
          onClick={() => this.selectColor('red', '#ca262a')}
        />
        <Button className='delBtn' onClick={this.resetCanvas}>重写</Button>
        <Button className='subBtn' onClick={this.saveCanvas}>保存</Button>
      </View>
      <View className='handCenter'>
        <Canvas
          className='handWriting'
          disableScroll
          canvasId='handWriting'
          onTouchStart={this.uploadScaleStart}
          onTouchMove={this.uploadScaleMove}
          onTouchEnd={this.uploadScaleEnd}
        />
      </View>
      <View className='handRight'>
        <View className='handTitle'>手写板</View>
      </View>
    </View>
  }
}
