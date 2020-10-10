### Promise封装小程序请求

小程序原生的wx.request请求代码量繁琐，且容易造成回调地狱，不利于维护。故用Promise封装，大大减少代码量，提高可维护性。

#### 一、引入登录态管理的网络请求组件weRequest
公司里一位大佬开发的[登录态管理的网络请求组件weRequest](https://github.com/IvinWu/weRequest),解决繁琐的小程序会话管理,具体可以移步学习。引入后按照文档指引配置request.js。

#### 二、封装包裹请求函数
- 1.引入第一步的配置文件request.ts
```js
import weRequest from '../lib/request'
```
- 2.封装包裹函数(注意，以下是以ts编写，可以根据需要改为js)
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
    data: {
        isLoading: true
    },

    onLoad(query: any) {
        loading = new Loading(this);
        this.test()
    },

    // 获取品牌信息
    test: function () {
        let self = this;
        let entryData: RequestBody = {
            
        }
        API.getTest(entryData).then((res: any) => {
            let getData = res.data;
            self.setData({
                
            })
        }).catch((err: string) => {
            console.error(err)
        })
    }
})
```
