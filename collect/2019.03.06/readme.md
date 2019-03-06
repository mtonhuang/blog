
一、wx-charts - 小程序图标组件

微信小程序图表工具，charts for WeChat small app，基于canvas绘制，体积小巧

支持图标类型：

- 饼图 pie
- 圆环图 ring
- 线图 line
- 柱状图 column
- 区域图 area
- 雷达图 radar
- github：https://github.com/xiaolin3303/wx-charts

效果图如图：


![](https://github.com/mtonhuang/bolg/blob/master/images/source(1).png)


开源协议：MIT

二、v-charts - 基于vue2.0的图表组件
  在使用 echarts 生成图表时，经常需要做繁琐的数据类型转化、修改复杂的配置项，v-charts 的出现正是为了解决这个痛点。基于 Vue2.0 和 echarts 封装的 v-charts 图表组件，只需要统一提供一种对前后端都友好的数据格式设置简单的配置项，便可轻松生成常见的图表。

github：https://github.com/ElemeFE/v-charts

文档：https://v-charts.js.org/#/

兼容性：支持所有现代浏览器及 IE10+ ，包括 pc 端和移动端。

效果图如图：

![](https://github.com/mtonhuang/bolg/blob/master/images/source(2).png)

示例代码：

```js
<template>
  <div><ve-line :data="chartData"></ve-line></div>
</template>
<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  components: { VeLine },
  data () {
    return {
      chartData: {
        columns: ['日期', '销售量'],
        rows: [
          { '日期': '1月1日', '销售量': 123 }]
      }}}}
</script>

```
开源协议：MIT

三、vue-amap - 基于vue2.x和高德地图的组件
github：https://github.com/ElemeFE/vue-amap

文档：https://elemefe.github.io/vue-amap

兼容性：支持所有现代浏览器及 IE10+ ，包括 pc 端和移动端。

效果图如图：

![](https://github.com/mtonhuang/bolg/blob/master/images/source(3).png)

示例代码：

```js
// 引入vue-amap
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: [
'AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'
],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
<el-amap vid="amapDemo" :zoom="zoom" :center="center">
</el-amap>
```

开源协议：MIT

四、dayjs - 轻量的处理时间和日期的js组件库

- 和 Moment.js 相同的 API 和用法
- 不可变数据 (Immutable)
- 支持链式操作 (Chainable)
- 国际化 I18n
- 仅 2kb 大小的微型库
- 全浏览器兼容
github：https://github.com/iamkun/dayjs

示例代码：

```js
import 'dayjs/locale/es' // 按需加载

dayjs.locale('es') // 全局使用西班牙语

dayjs('2018-05-05').locale('zh-cn').format() // 在这个实例上使用简体中文
import advancedFormat from 'dayjs/plugin/advancedFormat' // 按需加载插件

dayjs.extend(advancedFormat) // 使用插件

dayjs().format('Q Do k kk X x') // 使用扩展后的API

```
 开源协议：MIT

五、react-move - 动画组件库

ReactiveMove具有美观，可数据驱动的Rection动画（Fackbook出品）

github：https://github.com/react-tools/react-move

效果图如图：

![](https://github.com/mtonhuang/bolg/blob/master/images/source(5).png)

![](https://github.com/mtonhuang/bolg/blob/master/images/source(6).png)































开源协议：MIT

感谢浏览！