> 平时在开发h5项目中，遇到一些h5的小坑，在此分享(2.17 update again)。

掘金同步更新：https://juejin.im/post/5c2ec622e51d4552411a9854，欢迎给一个star!!! 

### 1.微信端禁止页面分享
```
//隐藏微信分享菜单，当点击右上角时不会出现分享的选项
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu');
    });
```

### 2.禁止页面上下拉动

```
 //禁止页面上拉下拉
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式
    }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
```

### 3.禁止微信浏览器图片长按出现菜单
网上挺多代码无效，下面亲测有效（兼容ios与android）

```
img{
    pointer-events:none;
    -webkit-pointer-events:none;
    -ms-pointer-events:none;
    -moz-pointer-events:none;
}
```

### 4.禁止微信浏览器长按“显示在浏览器打开”

```
 document.oncontextmenu=function(e){
       //或者return false;
      e.preventDefault();
    };
```

### 5.禁止复制文本
```
-webkit-user-select: none;
user-select: none;
-webkit-touch-callout: none;
```



### 6.禁止浏览器调整字体大小
ios解决方案：
```
body {
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
    -moz-text-size-adjust: 100% !important;
}
```
android解决方案（用自执行函数强制禁止用户修改字体大小）：
```
(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }

    function handleFontSize() {
        // 设置字体为默认大小并且重写事件
        WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
        });
    }
})();
```

### 7.移动端伪类:active无效的解决方法
做项目做到一半，测试按钮点击态的时候，在PC和安卓机测试上都没有问题，但到ios移动端就出现无效的情况，google了一下。

在mozilla社区找到了答案： 

> [1] By default, Safari Mobile does not use the :active state unless there is a touchstart event handler on the relevant element or on the <body>.

需要在按钮元素或者body/html上绑定一个touchstart事件才能激活:active状态。
```
document.body.addEventListener('touchstart', function (){}); //...空函数即可
```

### 8.禁止页面上下拉，但不影响页面内部scroll
2.20号 在某个微信群里关注到第2点的代码会影响页面内部的scroll，用之前的项目测试了一下，确实如此。

但如果去掉第2点的代码，虽然内部的scroll可以正常使用了，但橡皮筋的效果出现了。

这怎么能忍呢？于是遍寻良药：

```

  var overscroll = function(el) {
//el需要滑动的元素
        el.addEventListener("touchstart", function() {
          var top = el.scrollTop,
            totalScroll = el.scrollHeight,
            currentScroll = top + el.offsetHeight;
//被滑动到最上方和最下方的时候
          if (top === 0) {
            el.scrollTop = 1; //0～1之间的小数会被当成0
          } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1;
          }
        });
        el.addEventListener("touchmove", function(evt) {
          if (el.offsetHeight < el.scrollHeight) evt._isScroller = true;
        });
      };
      overscroll(document.querySelector(".aaaa")); //允许滚动的区域
      document.body.addEventListener("touchmove",function(evt) {
          if (!evt._isScroller) {
            evt.preventDefault(); //阻止默认事件(上下滑动)
          }
        },
        { passive: false } //这行依旧不可以省略，用于兼容ios
      );
```
