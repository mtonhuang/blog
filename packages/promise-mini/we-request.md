### 如何使小程序请求优雅化

小程序原生的wx.request请求代码量繁琐，且容易造成回调地狱，不利于维护。故用Promise封装，大大减少代码量，提高可维护性。最终效果如下：
```js
 API.getTest(entryData).then((res: any) => {})
    .catch((err: string) => {
        console.error(err)
 })
```
那么我们需要如何做呢？

(注意，以下是以ts编写，可以根据需要改为js)

#### 一、引入登录态管理的网络请求组件weRequest

公司里一位大佬开发的[登录态管理的网络请求组件weRequest](https://github.com/IvinWu/weRequest),解决繁琐的小程序会话管理,具体可以移步学习。引入后按照文档指引配置request.ts。

```JS
let weRequest = require('./weRequest.js');
weRequest.init({
    // [可选] 存放code的名称；可不配置，默认值为code
    codeName: "code",
    // [可选] 存在localStorage的session名称，且CGI请求的data中会自动带上以此为名称的session值；可不配置，默认为session
    sessionName: "",
    // [可选] 请求URL的固定前缀；可不配置，默认为空
    urlPerfix: "",
    // [必填] 后端在接口中返回登录成功后的第三方登录态
    getSession: function (res: any) {
        
    },
    // [必填] 用code换取session的CGI配置
    codeToSession: {
        // [必填] CGI的URL
        url: ``,
        // [可选] 调用改CGI的方法；可不配置，默认为GET
        method: 'POST',
        // [可选] CGI中传参时，存放code的名称，此处例子名称就是code；可不配置，默认值为code
        codeName: 'code',
        // [可选] 登录接口需要的其他参数；可不配置，默认为{}
        data: {
           
        },
        // [必填] CGI中返回的session值
        success: function (res: any) {
            
        }
    },
    // [必填] 触发重新登录的条件，res为CGI返回的数据
    loginTrigger: function (res: any) {
        // 此处例子：当返回数据中的字段errcode等于-1，会自动触发重新登录
        
    },
    // 登录重试次数，当连续请求登录接口返回失败次数超过这个次数，将不再重试登录
    reLoginLimit: 2,
    // 触发请求成功的条件
    successTrigger: function (res: any) {
        // 此处例子：当返回数据中的字段ret_code等于0时，代表请求成功，其他情况都认为业务逻辑失败
        return res.ret_code == 0;
    },
    // 成功之后返回数据；可不传
    successData: function (res: any) {
        // 此处例子：返回数据中的字段data为业务接受到的数据
        return res;
    },
    // 当CGI返回错误时，弹框提示的标题文字
    errorTitle: function () {
        return '操作失败'
    },
    // 当CGI返回错误时，弹框提示的内容文字
    errorContent: function (res: any) {
        return (res.msg ? res.ret_msg : '操作失败');
    },
    // [可选] 所有请求都会自动带上globalData里的参数
    globalData: function () {
       
    },
    doNotUseQueryString: true
});
export default weRequest
```

#### 二、封装包裹请求函数
- 1.引入第一步的配置文件request.ts
```js
import weRequest from '../lib/request'
```
- 2.封装包裹函数
```JS
/**
 * 包裹函数
 * @param opts weRequest参数
 * @param data 接口参数
 * @param url cgi路径
 * @param reqOpts 请求方式，默认为POST，可选
 */
let reqWrapper = (data: object, url: string, reqLoad?: boolean, reqOpts?: string) => {
    let param = Object.assign({}, data)
    return weRequest.request(Object.assign({}, {
        url: url,
        data: param,
        method: reqOpts? reqOpts : 'POST',
        showLoading: reqLoad? reqLoad : false //当为true时，请求该cgi会有loading       
    }))
}
export default {
    // 把请求export出去，比如
    saveTest(opts: RequestBody.saveTest): Promise<ResponseBody.saveTest> {
        return reqWrapper(opts, url , true)
    },
}
```
#### 三、小程序页面中使用
- 1.在对应的页面引入第二步的文件，比如api.ts
```JS
import API from "../../api";
```
- 2.请求格式如下
```JS
Page({
    data: {},
    onLoad(query: any) {
        this.test()
    },
    test: function () {
        let self = this;
        let entryData: RequestBody = {}
        API.getTest(entryData).then((res: any) => {})
        .catch((err: string) => {
            console.error(err)
        })
    }
})
```
