>H5页面开发适配方案，平时的一些小总结，希望能帮助到大家。

## 样式重置

```css
body,p,ul,ol,li,dl,dt,dd,h1,h2,h3,h4,h5,h6,form,fieldset,legend,input,select,textarea,button,th,td{margin:0;padding:0;} 
h1,h2,h3,h4,h5,h6{font-size:100%;} 
ul,dl,ol{list-style:none;} 
img,fieldset,input[type="submit"]{border:0 none;} 
img{display:inline-block;overflow:hidden;vertical-align:top;} 
em{font-style:normal;} 
strong{font-weight:normal;} 
table{border-collapse:collapse;border-spacing:0;} 
button,input[type="button"]{cursor:pointer;border:0 none;} 
textarea{word-wrap:break-word;resize:none;} 
menu{margin:0;padding:0;} 
body{-webkit-user-select:none;-webkit-text-size-adjust:100%!important;font-family:Helvetica;} 
input[type="number"]{-webkit-user-select:text;} 
a,button,input,img{-webkit-touch-callout:none;} 
input,select,textarea{outline:none;} 
a,button,input{-webkit-tap-highlight-color:rgba(0,0,0,0);} 
html,body{height:100%;} 
a{text-decoration:none;}
```


## viewport模板


```css
<!DOCTYPE html> 
<head> 
<meta charset="utf-8"> 
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport"> 
<meta content="yes" name="apple-mobile-web-app-capable"> 
<meta content="black" name="apple-mobile-web-app-status-bar-style"> 
<meta content="telephone=no" name="format-detection"> 
<meta content="email=no" name="format-detection"> 
<title>标题</title> 
<link rel="stylesheet" href="index.css"> 
</head> 
 
<body> 
    内容 
</body> 
 
</html>
```

## 特殊机型适配

<strong>iPhoneX</strong>，作为唯一有刘海手机，对页面适配带来了问题，可以用如下代码适配iPhoneX。

```css
/* iPhoneX适配 */
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) { 
.class{}
}
```

<strong>iPhone4</strong>，作为窄屏手机，分辨率为960x640，web窗口的高度仅有832px，容易引起适配的问题，如页面的主体按钮被隐藏在屏幕外，通常需要对它做特殊适配

```css
/* 适配iPhone4 */
@media (device-height:480px) and (-webkit-min-device-pixel-ratio:2){
.class{}
}
```
