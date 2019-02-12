> 平时在重构微信h5项目中，遇到一些微信h5禁止的小坑，在此分享(1.28 update again)。


### 禁止页面分享
```
//隐藏微信分享菜单，当点击右上角时不会出现分享的选项
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu');
    });
```

### 禁止页面上下拉动

```
 //禁止页面上拉下拉
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式
    }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
```

### 禁止微信浏览器图片长按出现菜单
网上挺多代码无效，下面亲测有效（兼容ios与android）

```
img{
    pointer-events:none;
    -webkit-pointer-events:none;
    -ms-pointer-events:none;
    -moz-pointer-events:none;
}
```

### 禁止微信浏览器长按“显示在浏览器打开”

```
 document.oncontextmenu=function(e){
       //或者return false;
      e.preventDefault();
    };
```

### 禁止复制文本
```
-webkit-user-select: none;
user-select: none;
-webkit-touch-callout: none;
```

****


### 禁止浏览器调整字体大小
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

### 