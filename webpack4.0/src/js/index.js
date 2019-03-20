import "../css/common.less";
import "../css/index.less";
import "./flex.js"; //引入flex.js进行适配

// 解决ios端伪类:active无效问题
document.body.addEventListener('touchstart', function (){});