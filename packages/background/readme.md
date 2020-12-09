### 修改vscode背景图

1. 打开vscode，在Extensions中搜索并download “background”插件。
2. 打开setting，找到“在setting.json 中编辑”。
3. 在用户设置中输入以下代码，按下ctrl + s，重启vscode。

```JS
    //background 的相关配置
    "update.enableWindowsBackgroundUpdates": true,
    "background.customImages": [
        "file:///C:/Users/MyUserName/Documents/girl7.png",//图片地址
        "file:///C:/Users/MyUserName/Documents/girl6.png"//图片地址
    ],
    "background.style": {
        "content":"''",
        "pointer-events":"none",
        "position":"absolute",//图片位置
        "width":"100%",
        "height":"100%",
        "z-index":"99999",
        "background.repeat":"no-repeat",h
        "background-size":"30%,30%",//图片大小
        "opacity":0.3 //透明度
    },
    {
        "content":"''",
        "pointer-events":"none",
        "position":"absolute",//图片位置
        "width":"100%",
        "height":"100%",
        "z-index":"99999",
        "background.repeat":"no-repeat",
        "background-size":"30%,30%",//图片大小
        "opacity":0.3 //透明度
    },
    "background.useFront": true,
    "background.useDefault": false
```
![](https://act.weixin.qq.com/static/images/201906/2b2d67f80d4e10240954f2a7b84cdf50.png)

我在这里放入了两张图片，通常我们开发需要分屏操作，按下ctrl+\时一屏就会显示一张图片

**注**：vscode更新后，以管理员身份重启，否则无效