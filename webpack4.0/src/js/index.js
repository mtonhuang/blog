import '../css/style.css';
import '../css/index.scss';

console.log("this is index.js");


// 需要在主要的js文件里写入下面这段代码，可实现不刷新就更新
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}