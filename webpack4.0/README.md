# webpack4.0配置

## Project setup
```
tnpm install
```

### Compiles and hot-reloads for development
```
npm start
```

### 解决Webpack4.0 打包警告问题
```
"scripts": {
         "start": " --mode development",
         "build": "--mode production"
     }
```
### 引用CSS文件
extract-text-webpack-plugin插件会将打包到js里的css文件进行一个拆分,打包的html页面就以link的方式去引入css了
```
    {
       test: /\.css$/,
       use: ExtractTextWebpackPlugin.extract({
           // 将css用link的方式引入就不再需要style-loader了
           use: 'css-loader'
       })
    },
    plugins: [
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/style.css')
    ]
```

### 引用图片
处理图片方面，也需要loader,如果是在css文件里引入的如背景图之类的图片，就需要指定一下相对路径
```
module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: 'css-loader',
                    publicPath: '../'   //在css中指定了publicPath路径这样就可以根据相对路径引用到图片资源了
                })
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            }
        ]
    }
}
```

### 页面img引用图片
这样再打包后的html文件下img就可以正常引用图片路径了
```
module.exports = {
    module: {
        rules: [
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            }
        ]
    }
}
```

### 热更新和自动刷新

```
// webpack.config.js
let webpack = require('webpack');

module.exports = {
    plugins: [
        // 热替换，热替换不是刷新
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 3000
    }
}

// 虽然配置了插件和开启了热更新，但并不会生效,需要在主要的js文件里写入下面这段代码
if (module.hot) {
    // 实现热更新
    module.hot.accept();
}
```
