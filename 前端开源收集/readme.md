  原来架构设计比较多关注的是横向的分层，即数据层，逻辑层和UI层。而组件化架构必须同时关注纵向的隔离和解耦。在分层和分模块后，每一个业务组件由三层各自存在的部署包组成，包本身是一个包含了技术组件和服务组件的一个结合体。由数据层，逻辑层，界面层三层的三个业务包可以构成一个完整的具备独立功能的业务组件。

  我理解的组件化开发是将复杂并混乱的页面逻辑，分割成一个个独立的业务单元。就像下图的房子，把门，屋顶，窗户以及墙体分开，最后拼凑在一起，组成一个房子。

![](https://github.com/mtonhuang/bolg/blob/master/images/home.png)

  本周整理收集了一下GitHub上的几个比较热门的项目，用于组件化开发、提升开发效率。

一、ice - 模板库
丰富模板一键创建，提供多种垂直领域模板，快速创建项目，支持风格切换，满足个性化需求；
特点： 模板自定义创建， 区块可视化组装， 布局自定义生成， 物料自定义接入， 项目仪表盘插件化。已接入三大框架：React，Vue，Angular。

github：https://github.com/alibaba/ice

效果图如图：

![](https://github.com/mtonhuang/bolg/blob/master/images/ice.png)

开源协议：MIT

二、jqPaginator - 基于jquery的分页组件
简洁、高度自定义的jQuery分页组件，适用于多种应用场景。

github：https://github.com/keenwon/jqPaginator

效果如图：

![](https://github.com/mtonhuang/bolg/blob/master/images/source_2%20(5).png)

开源协议：MIT

三、react-spring - 动画组件库
Helping react-motion and animated to become best friends.

更友好的动画库，效果酷炫，拥有总多贡献者。

github：https://github.com/drcmda/react-spring

演示地址： http://react-spring.surge.sh/

效果如图：

![](https://github.com/mtonhuang/bolg/blob/master/images/source_2%20(2).png)

开源协议：ISC

四、iview-weapp - 小程序UI组件库
组件库还是挺丰富的，基本可以满足需求。

github：https://github.com/TalkingData/iview-weapp

![](https://github.com/mtonhuang/bolg/blob/master/images/source_2%20(3).png)

开源协议：MIT

五、react-window - 表格和列表的组件
看了一下源码，还是比较方便的，能直接引入，快速搭建页面

github：https://github.com/bvaughn/react-window

演示地址：  https://react-window.now.sh/

效果如图：

![](https://github.com/mtonhuang/bolg/blob/master/images/source_2%20(4).png)

示例代码：

```js
import { FixedSizeList as List } from 'react-window';
<List
  height={150}
  itemCount={1000}
  itemSize={35}
  width={300}
>
  {({ index, style }) => (
    <div style={style}>
      Row {index}
    </div>
  )}

</List>
开源协议：MIT
```
