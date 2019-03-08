import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton, AtIcon, AtForm, AtInput, AtLoadMore } from 'taro-ui'
import dayjs from 'dayjs'
import Header from '@/components/header'
import { add, minus, asyncAdd } from '../../redux/actions/counter'
import { getBannerList } from '../../api'
import './index.less'

const html = `
<p><a id="fxhbid" className="hbbut"></a>分享海报</p>
<p>★真蒸牛肉主题餐厅★</p>
<div id="details">
<div id="iframe_box_lhs">
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/3.png@0o_0l_640w.png" data-backh="430" data-backw="654" data-before-oversubscription-url="blob:https://mp.weixin.qq.com/66d3e2fb-fb0b-4066-a102-2b7fdd644094" data-ratio="0.6579476861167002" data-s="300,640" data-type="png" data-w="994" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/3.png@0o_0l_640w.png" /></p>
<p>精选用新西兰进口安格斯优质牛肉作为食材</p>
<p>经营养大师秘制而成</p>
<p>保证牛肉营养价值及新鲜度</p>
<p>口感鲜嫩、营养丰富~</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/4.png@0o_0l_640w.png" data-backh="432" data-backw="654" data-before-oversubscription-url="blob:https://mp.weixin.qq.com/ed6fab6b-013a-4c63-95f4-6b248d5c341b" data-ratio="0.6610738255033557" data-s="300,640" data-type="png" data-w="1192" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/4.png@0o_0l_640w.png" /></p>
<p>小编已经忍不住加一块放在烤盘上了</p>
<p>发出滋啦啦的声音</p>
<p>一口吃下去...吼吼吼~</p>
<p>感觉整个人都活过来了!!!</p>
<p><img className="__bg_gif lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/5.gif" data-backh="370" data-backw="654" data-before-oversubscription-url="https://mmbiz.qpic.cn/mmbiz_gif/doGtnWgGl568OsciaicT5p9LNQ7oVkEojzp1u8HTTUzErxJXRdrvrRgsWgUlpsdHsNqia1HJK5scaOtxnoqYKKWUA/?wx_fmt=gif" data-ratio="0.565" data-type="gif" data-w="400" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/5.gif" /></p>
<p>这里涮锅和平时吃的火锅也大有不同哦</p>
<p>采用矿物质锅底<strong>~</strong></p>
<p>大大的砂锅中配有许多健康养生的</p>
<p>中草药、红枣、香菜，香菇等材料</p>
<p>再加入农夫山泉水，熬制出来的汤<strong>甘甜可口</strong></p>
<p><img className="__bg_gif lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/6.gif" data-backh="370" data-backw="654" data-before-oversubscription-url="https://mmbiz.qpic.cn/mmbiz_gif/doGtnWgGl568OsciaicT5p9LNQ7oVkEojzO4ibA1HKpeTkd0x1nYIvKb9ol0oepaMNJE8qwibQJCAefZapFSenWib2g/?wx_fmt=gif" data-ratio="0.565" data-type="gif" data-w="400" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/6.gif" /></p>
<p>还有各种菜品跃跃欲试等着下锅</p>
<p><strong>澳洲肥牛、培根、宽粉带、豆腐皮、蔬菜</strong>...</p>
<p><strong>食材新鲜，吃过都说正！</strong></p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/7.gif" data-copyright="0" data-ratio="0.6666666666666666" data-type="gif" data-w="750" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/7.gif" /></p>
<p><strong>位置优越，交通便利！</strong></p>
<p>赶紧和你的小伙伴带上优惠一起来~</p>
<p><strong>原门市价199元/套</strong></p>
<p>现仅需<strong>69元/套</strong></p>
<p><strong>矿物质锅底+澳洲肋排+澳洲肥牛</strong></p>
<p><strong>+培根+宽粉带+海带苗</strong></p>
<p><strong>+实时蔬菜+豆腐皮+自助蘸碟2-3份</strong></p>
<p><strong>还免费提供大麦茶、纸巾、小吃</strong></p>
<p><strong>适合2-3人食用！</strong></p>
<p>这么划算，赶紧抢购吧！</p>
<p><strong>预售抢购</strong></p>
<section data-role="outer">
<section className="" data-tools="135编辑器" data-id="90054" data-color="rgb(30, 155, 232)" data-custom="#D82821">
<section>
<section></section>
<section></section>
<section><strong>抢购日期：</strong>即日-2019年2月28日</section>
<section className="" data-autoskip="1">
<p><strong>使用日期：</strong>即日-2019年4月15日</p>
<p>购买后<strong>即可</strong>收到含电子码短消息<strong>（1个电子码）</strong></p>
<p>凭码直接到店铺消费 免预约</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/8.png@0o_0l_640w.png" data-ratio="0.6073298429319371" data-s="300,640" data-type="png" data-w="573" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/8.png@0o_0l_640w.png" /></p>
<p><strong>*&nbsp;</strong><strong>周末节假</strong><strong>日午/晚餐通用，</strong><strong>限2-3人及以上到店使用，仅限大厅使用，仅供堂食，包间请咨询商家</strong></p>
<p><strong>*&nbsp;每个手机号码(购买用户)当日仅可消费1次</strong></p>
<p><strong>*&nbsp;每桌限用1套，不可叠加及拼桌使用，不可兑现，仅可餐后打包（餐前不可打包），菜品需1次消费完毕，不可拆分享用，如菜品缺失或供应不足，商家有权换成同等价位菜品</strong></p>
<p><strong>*&nbsp;注：如需其他消费以店面收费为准，本活动不与店家其他活动一同使用</strong></p>
<p><strong>* 此产品为特价抢购产品，购买成功后不设退款，过期不用自动作废</strong></p>
</section>
</section>
</section>
<section className="" data-tools="135编辑器" data-id="88513" data-color="rgb(30, 155, 232)" data-custom="rgb(216, 40, 33)">
<section>
<section>
<section>
<section className="">
<section className="" data-tools="135编辑器" data-id="86152" data-color="rgb(30, 155, 232)" data-custom="rgb(30, 155, 232)">
<section>
<section>
<section className="" data-tools="135编辑器" data-id="88513" data-color="rgb(30, 155, 232)" data-custom="rgb(30, 155, 232)">
<section>
<section>
<section></section>
<section></section>
<section></section>
<section>
<section className="">
<section className="" data-tools="135编辑器" data-id="89202" data-color="rgb(30, 155, 232)">
<section className="" data-tools="135编辑器" data-id="86152" data-color="rgb(30, 155, 232)" data-custom="#1E9BE8">
<section>
<section className=""></section>
<section></section>
</section>
</section>
</section>
<section data-width="100%"></section>
<section><strong>免预约</strong></section>
<p>&nbsp;&nbsp;<strong>凭码直接到店铺消费 免预约</strong></p>
<p><strong>12位电子码</strong>及<strong>门店电话</strong>以手机短消息为准</p>
</section>
</section>
</section>
</section>
</section>
<section className="" data-tools="135编辑器" data-id="88513" data-color="rgb(30, 155, 232)" data-custom="rgb(216, 40, 33)">
<section>
<section>
<section>
<section className="">
<section className="" data-tools="135编辑器" data-id="86152" data-color="rgb(30, 155, 232)" data-custom="rgb(30, 155, 232)">
<section>
<section>
<section className="" data-tools="135编辑器" data-id="88513" data-color="rgb(30, 155, 232)" data-custom="rgb(30, 155, 232)">
<section>
<section>
<section></section>
<section></section>
<section></section>
<section>
<section className="">
<section className="" data-tools="135编辑器" data-id="89202" data-color="rgb(30, 155, 232)">
<section className="" data-tools="135编辑器" data-id="86152" data-color="rgb(30, 155, 232)" data-custom="#1E9BE8">
<section>
<section className=""></section>
<section></section>
</section>
</section>
</section>
<p><strong>真蒸牛肉主题餐厅</strong></p>
<p>店内的干净整洁，看着就很安心</p>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
</section>
<section className="_135editor" data-role="paragraph">
<p>而且就餐环境比较安静</p>
<p>适合和闺蜜，情侣，家人一起来</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/9.png@0o_0l_640w.png" data-backh="439" data-backw="654" data-before-oversubscription-url="blob:https://mp.weixin.qq.com/a56ca6c0-a3b3-4e49-9e96-1788135de06a" data-ratio="0.671" data-s="300,640" data-type="png" data-w="1000" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/9.png@0o_0l_640w.png" /></p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/10.png@0o_0l_640w.png" data-backh="434" data-backw="654" data-before-oversubscription-url="blob:https://mp.weixin.qq.com/af049a8b-ea01-48e7-9de3-d914d5c146e1" data-ratio="0.6633366633366633" data-s="300,640" data-type="png" data-w="1001" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/10.png@0o_0l_640w.png" /></p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/11.png@0o_0l_640w.png" data-backh="562" data-backw="654" data-before-oversubscription-url="blob:https://mp.weixin.qq.com/58abf8e5-9857-4d25-8042-d70499d654f2" data-ratio="0.8586251621271076" data-s="300,640" data-type="png" data-w="771" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/11.png@0o_0l_640w.png" /></p>
<p>丰富多样的自助料碗区~</p>
<p>喜欢什么味道调什么味味道一次还同时可以调3种口味，完美！</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/12.png@0o_0l_640w.png" data-backh="314" data-backw="654" data-before-oversubscription-url="http://mmbiz.qpic.cn/mmbiz_png/OT8Vr6JZ9Ks3PxO8yqJ7rSnjadY2aEP4gxTnmHILqYibZGyicn5ZcxGdb0RrQPh2zvicEf3WXBhQgLIqLEHTNYrKg/?wx_fmt=png" data-ratio="0.4798657718120805" data-s="300,640" data-type="png" data-w="1192" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/12.png@0o_0l_640w.png" /></p>
<p><strong>菜品推荐</strong>▼</p>
<p><strong>澳 洲 肋 排</strong></p>
<p>进店必点的肋排</p>
<p>有合适脂肪，口感软嫩且扎实</p>
<p>烤的过程中一定要注意火候</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/13.png@0o_0l_640w.png" data-backh="446" data-backw="654" data-before-oversubscription-url="blob:https://mp.weixin.qq.com/51cd78df-0077-43cf-800d-688df34f10f1" data-ratio="0.6820027063599459" data-s="300,640" data-type="png" data-w="739" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/13.png@0o_0l_640w.png" /></p>
<p>除了烤，还可以放入养生锅中~</p>
<p>咕嘟咕嘟~捞起来一块</p>
<p>弹性十足，沾上酱料入口后有淡淡香甜奶香味，柔软无比~</p>
<p><img className="__bg_gif lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/14.gif" data-backh="366" data-backw="654" data-before-oversubscription-url="https://mmbiz.qpic.cn/mmbiz_gif/doGtnWgGl568OsciaicT5p9LNQ7oVkEojzKYf7ia1428xMQCv7zibdrTZeOfq4UtpDAbj8kA71zOEibyEf78kt9NkAw/?wx_fmt=gif" data-ratio="0.56" data-type="gif" data-w="400" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/14.gif" /></p>
<section className="KolEditor">
<section>
<section>
<section>
<p><strong>澳 洲 肥 牛</strong></p>
</section>
</section>
</section>
</section>
<p>可以烤可以涮</p>
<p>细腻的纹理，柔韧的嚼劲</p>
<p>让人欲罢不能~</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/15.png@0o_0l_640w.png" data-backh="432" data-backw="654" data-before-oversubscription-url="http://mmbiz.qpic.cn/mmbiz_png/OT8Vr6JZ9Ks3PxO8yqJ7rSnjadY2aEP4bLMic1NIsianj4kcsVeqiciaQOrPlFJnURXiaf707t27VXzQiacl2obiaxiagw/0?wx_fmt=png" data-ratio="0.6606425702811245" data-s="300,640" data-type="png" data-w="996" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/15.png@0o_0l_640w.png" /></p>
<section className="KolEditor">
<section>
<section>
<section>
<p><strong>培 根</strong></p>
</section>
</section>
</section>
</section>
</section>
<p>在火腿、香肠、培根三大西式肉制品中</p>
<p>被中国消费者较晚知晓的当属培根了</p>
<p>但后来者居上，这几年培根的火爆程度遥遥领先</p>
<p>来这里吃肯定要来上一份啦~</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/16.png@0o_0l_640w.png" data-backh="435" data-backw="654" data-before-oversubscription-url="blob:https://mp.weixin.qq.com/38d37992-0efb-4332-9dc0-3138d5fb93b4" data-ratio="0.6653306613226453" data-s="300,640" data-type="png" data-w="998" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/16.png@0o_0l_640w.png" /></p>
<p><strong>宽 粉 带</strong></p>
<p>略带弹性的口感，一整片粉带放入口中</p>
<p>细细咀嚼之下，丰富的味道立刻充斥口腔</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/17.png@0o_0l_640w.png" data-backh="441" data-backw="654" data-before-oversubscription-url="http://mmbiz.qpic.cn/mmbiz_png/OT8Vr6JZ9Ks3PxO8yqJ7rSnjadY2aEP45eCK2QX1oibYDAPNLgysauNQzOPE1mHibgxhNALtJ3Tb1aaZE0ZoibiaGw/0?wx_fmt=png" data-ratio="0.6738241308793456" data-s="300,640" data-type="png" data-w="978" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/17.png@0o_0l_640w.png" /></p>
<p><strong>海 带 苗</strong></p>
<p>入口滑溜溜的</p>
<p>没等细细咀嚼就滑入了肚里</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/18.png@0o_0l_640w.png" data-backh="432" data-backw="654" data-before-oversubscription-url="http://mmbiz.qpic.cn/mmbiz_png/OT8Vr6JZ9Ks3PxO8yqJ7rSnjadY2aEP4SMTuMianPOtHQcbia9cvVJgB2mTPD9ZRe0TyeDuoeUSWtDCzYOmdWgibg/0?wx_fmt=png" data-ratio="0.6598712446351931" data-s="300,640" data-type="png" data-w="932" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/18.png@0o_0l_640w.png" /></p>
<p><strong>豆 腐 皮</strong></p>
<p>豆腐皮色泽金黄，绵密细腻，质地均匀</p>
<p>散发着豆汁的鲜香，入嘴柔嫩爽口</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/19.png@0o_0l_640w.png" data-backh="431" data-backw="643" data-before-oversubscription-url="http://mmbiz.qpic.cn/mmbiz_png/OT8Vr6JZ9Ks7L1em3acvG3bMmArIRgIt6NkTokCGRicWPYic167GhftjodNjH3hia2PJDQAUJoUG1bu30orlAwBIQ/0?wx_fmt=png" data-ratio="0.6702954898911353" data-s="300,640" data-type="png" data-w="643" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/19.png@0o_0l_640w.png" /></p>
<p><strong>其他菜品（需自费）</strong></p>
<p><strong>特色小吃粉蒸牛肉</strong></p>
<p>小笼粉蒸牛肉&rdquo;为家常味型</p>
<p>质细鲜嫩，美味可口，麻辣鲜香</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/20.png@0o_0l_640w.png" data-backh="479" data-backw="654" data-before-oversubscription-url="blob:https://mp.weixin.qq.com/0ff9c95a-a4bd-41a5-a877-14675d8e4be3" data-ratio="0.7322946175637394" data-s="300,640" data-type="png" data-w="706" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/20.png@0o_0l_640w.png" /></p>
<p>这里简直是肉食者的天堂</p>
<p>吃货们冲啊！！</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/21.jpeg" data-ratio="1" data-type="jpeg" data-w="224" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/21.jpeg" /></p>
<section className="" data-tools="135编辑器" data-id="88513" data-color="rgb(30, 155, 232)" data-custom="rgb(216, 40, 33)">
<section><fieldset><legend>交通指南</legend>
<p>&nbsp;</p>
<p><strong>地址：</strong>西安市雁塔区长安西路长丰园15号楼（华城国际北大门对面）</p>
<p><strong>咨询电话：</strong>029-81541112</p>
<p><img className="lazy" src="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/22.png@0o_0l_640w.png" data-ratio="0.6223224351747464" data-s="300,640" data-type="png" data-w="887" data-original="http://fx32888.img-cn-shenzhen.aliyuncs.com/product_imgs_1/AOVJHX/m.lhs11.com/22.png@0o_0l_640w.png" /></p>
<p><strong>（以上交通信息仅供参考，详情请以实际为准）</strong></p>
</fieldset></section>
</section>
<p><strong>特别声明</strong></p>
</div>
</div>
<div id="rule" className="pro-panl">
<section>
<section data-width="10px"></section>
<section data-width="10px"></section>
<section data-width="10px"></section>
</section>
<p>1、不提供餐前外带，仅供堂食</p>
<section className="" data-style="text-align: justify; line-height: 1.75em; white-space: normal;color: rgb(63, 63, 63); font-size: 14px;">
<p>2、美食图片仅供参考，菜品会因应季节和摆盘做适当调整，以当日餐厅提供为准</p>
<p>3、本次活动产品可转赠亲友、不可用作二次销售，违者必将追究其法律责任，并将相关产品冻结或作废使用</p>
<p>4、购买此套票视为认同此声明及活动规则</p>
</section>
</div>`

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
    // console.log('首页did mount')
    getBannerList().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
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
        {/* <wxparser rich-text={html}/>*/}
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
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        {listItems}
      </View>
    )
  }
}

export default Index
