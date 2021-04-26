### 一、在 components 中创建 pullLoad

```
// pullLoad.wxml
<template name="pullLoad">
	<view class="pull_load" hidden="{{!isLoad}}">
		<view class="pull_dot"></view>
		<view class="pull_dot"></view>
		<view class="pull_dot"></view>
	</view>
</template>
```

```
// pullLoad.less
.pull_load {
  font-size: 0;
  text-align: center;
  padding: 20rpx 0;
  margin-top: 30rpx;
}
.pull_dot {
  width: 12rpx;
  height: 12rpx;
  background: #acafb3;
  border-radius: 50%;
  display: inline-block;
  margin: 0 8rpx;
  -webkit-animation: pull_loading 0.6s infinite linear both;
  animation: pull_loading 0.6s infinite linear both;
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.pull_dot:nth-child(2) {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
.pull_dot:nth-child(3) {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
@-webkit-keyframes pull_loading {
  0%,33.3% {
    opacity: 1;
  }
  66.7%,100%{
    opacity: .2;
  }
}
@keyframes pull_loading {
  0%,33.3% {
    opacity: 1;
  }
  66.7%,100%{
    opacity: .2;
  }
}
```

### 二、在业务页面引入

```
// index.wxml
<import src="/components/pullLoad/pullLoad.wxml" />

<view class="weui-cells">
    <block wx:if="{{list.length > 0}}">
        <view class="list" wx:for="{{list}}" wx:key="index">
            <view hover-class="weui-cell_active">
                {{item.text}}
            </view>
        </view>
    </block>
    <block wx:if="{{list.length == 0}}">
        <view class="no_notice">
            <view class="search-bar__icon"></view>
            <view class="search-bar__result">暂无通知</view>
        </view>
    </block>
</view>
<template is="pullLoad" data="{{isLoad}}" />
<view wx:if="{{nomore && list.length != 0}}" class="nomore">没有更多了！</view>
```

```
// index.less
@import "../../../components/pullLoad/pullLoad.wxss";
```

```js
// index.js
data: {
    page_num: 1, // 从第1页开始
    isLoad: false, // 下拉列表load效果
    hasData: false, //分页必须参数，如果有数据则执行下滑分页
    nomore: false
},
onLoad: {
    this.getList();
}

//初始化拉取状态
getList: function() {
    const that = this;
    let pageIdx = this.data.page_num;
    wx.request({
        url: API.list,
        method: 'POST',
        data: {
            page_size: 10,
            page_num: pageIdx
        }
    }).then((res) => {
        let result = res.data || {};
        let getData = result.data;
        let errCode = result.ret_code;
        let errMsg = result.data.error_msg || result.ret_msg;
        if (errCode == 0) {
            let list = getData.list;
            if (list && list.length > 0) {
                // 分页合并数组
                that.data.list = that.data.list.concat(list);
                that.setData({
                    list: this.data.list,
                    hasData: true,
                    isLoad: false //每次滑动都展示下拉列表底部的load效果
                })
            } else {
                that.setData({
                    isLoad: false,
                    nomore: true
                });
            }
        } else {
            that.setData({
                isLoad: false,
                nomore: true
            })
        }
    }).catch((err) => {
        wx.showModal({
            content: err || '系统错误，请稍后重试',
            showCancel: false,
            confirmText: '我知道了'
        });
    })
}

//  列表到达底部
onReachBottom: function() {
    if (this.data.isLoad) {
        return false
    }
    this.setData({
        isLoad: true
    });
    if (this.data.hasData) {
        this.setData({
            page_num: this.data.page_num + 1
        })
        this.getList();
    }
}
```

**Contributing**

mtonhuang
