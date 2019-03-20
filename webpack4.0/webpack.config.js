const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
module.exports = {
    //entry入口文件
    // 多页面开发，配置多页面
    entry: {
        index: './src/js/index.js'
    },
    // output出口文件
    output: {
        // [name]就可以将出口文件名和入口文件名一一对应
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: "[name].[hash:4].js",  // 打包后会生成index.js和print.js文件
        path: path.resolve(__dirname, 'dist')
    },
    // devServer开发服务器配置
    devServer: {                        //webpack-dev-server 能够实时重新加载
        contentBase: path.join(__dirname, "dist"),
        host: 'localhost',        // 默认是localhost
        port: 3000,
        open: false,             // 是否自动打开浏览器
        hot: true                // 开启热更新
    },
    // module处理对应模块
    module: {
        rules: [
            // 处理html文件图片引入问题
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            //处理css||less||sass
            {
                //test 用于标识出应该被对应的 loader 进行转换的某个或某些文件。
                //use 表示进行转换时，应该使用哪个 loader。
                test: /\.(sa|sc|c|le)ss$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: [
                        {loader: 'css-loader'},
                        {loader: 'less-loader'},
                        //引入postcss-loader
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'Firefox >= 20', 'Safari >= 5', 'Android >= 4', 'Ios >= 6', 'last 4 version'],
                                        remove: true
                                    })
                                ]
                            }
                        }
                    ],
                    publicPath: '../'
                })
            },
            //加载图片
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                            outputPath: 'images/'   // 图片打包后存放的目录
                        }
                    }
                ]
            },
            //加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            //转义ES6兼容低版本浏览器
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: /src/,           //只转化src目录下的js
                exclude: /noder_modules/  //排除掉node_modules，优化打包速度
            }
        ]
    },
    // plugins对应的插件
    plugins: [
        // 在npm start命令下，打包的文件存在于内存中，并不会产生在dist目录下
        // new CleanWebpackPlugin(['dist']), //打包之前清理dist文件夹里面多余的文件,npm start时会清理掉dist

        new webpack.NamedModulesPlugin(),
        // 热替换，热替换不是刷新
        new webpack.HotModuleReplacementPlugin(),

        new HtmlWebpackPlugin({           //设定HtmlWebpackPlugin，默认生成index.html
            template: './src/html/index.html',  //模板文件路径所在位置
            filename: 'index.html',
            chunks: ['index'],            //对应的文件 =>对应关系,index.js对应的是index.html
            hash: true                    //会在打包好的js后面加上hash串
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/[name].[hash].css'),

        new OptimizeCssAssetsPlugin()
    ],

    // resovle解析，配置别名和省略后缀名
    resolve: {
        //别名
        /*
        alias: {
            $: './src/jquery.js'
        },
        */
        // 省略后缀
        extensions: ['.js','.json','.css','.scss','.less']
    }
};