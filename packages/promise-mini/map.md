### 一、封装地图授权函数

```js

// 1、点击事件后调起授权（app.ts，全局调用）
async getAuthAdress(longitude: number, latitude: number, name: string, address: string) {
    let getLongitude = longitude,
        getLatitude = latitude,
        getName = name,
        getAddress = address;
    try {
        let resSetting = await wx.getSetting();
        console.log(resSetting)
        if (resSetting.errMsg === 'getSetting:ok' &&
            typeof resSetting.authSetting['scope.userLocation'] !== 'undefined' &&
            resSetting.authSetting['scope.userLocation'] === false) {
            //TODO: 没有授权
            console.log('拒绝了授权')
            wx.showModal({
                title: '提示',
                content: '需要获取您的地理位置,请确认授权，否则地图功能将无法正常使用',
                confirmText: '立即授权',
                success: async function (data) {
                    if (data.confirm) {
                        console.log('resModal.confirm')
                        await wx.openSetting({

                        })
                    } else if (data.cancel) {
                        await wx.openLocation({
                            latitude: Number(getLatitude),
                            longitude: Number(getLongitude),
                            scale: 14,
                            name: getName,
                            address: getAddress
                        })
                    }
                }
            })
        } else {
            //TODO: 授权
            await wx.getLocation({ type: 'gcj02' });
            await wx.openLocation({
                latitude: Number(getLatitude),
                longitude: Number(getLongitude),
                scale: 14,
                name: getName,
                address: getAddress
            })
        }
    }
    catch {
        //TODO: 报错
    }
},

// 2、初始化页面调起地图授权函数（业务侧自我调用）
async getLocation() {
    const that = this;
    try {
        let res = await wx.getSetting();
        if (res.authSetting['scope.userLocation'] !== true) {
            //TODO: 如果没有授权，则不需要操作
            that.getTest();
        } else {
            //TODO: 如果授权，则获取经纬度
            let res = await wx.getLocation({ type: 'gcj02' });
            let latitude = res.latitude;
            let longitude = res.longitude;
            if (latitude && longitude) {
                that.setData({
                    user_latitude: `${latitude}`,
                    user_longitude: `${longitude}`
                })
            }
            that.getTest();
        }
    }
    catch {
        that.getTest();
        //TODO: 报错
    }
}
    
```

### 二、在业务页面调用

```js
const app = getApp();
// index.js
let longitude = Number(e.currentTarget.dataset.longitude) || 0;
let Latitude = Number(e.currentTarget.dataset.latitude) || 0;
let Name = e.currentTarget.dataset.name || '';
let Address = e.currentTarget.dataset.address || '';
app.longitude(longitude, Latitude, Name, Address)

```


**Contributing**

mtonhuang
