const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件

module.exports = {
    //entry入口文件
    // 多页面开发，配置多页面，多页面需用数组格式
    entry: {
        index: './src/example/js/example.js'
    },
    // output出口文件
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {                        //webpack-dev-server 能够实时重新加载
		disableHostCheck: true,
		contentBase: path.join(__dirname, "dist"),
        host: 'localhost',
        port: 8080,
        open: true,             // 是否自动打开浏览器
        hot: true,                // 开启热更新
        inline: true            //实时刷新
    },
    // module处理对应模块
    module: {
        rules: [
            {
                test: /\.(sa|sc|c|le)ss$/,
                use: ExtractTextWebpackPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        },
                        //引入postcss-loader
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        // browsers: ['ie >= 8', 'Firefox >= 20', 'Safari >= 5', 'Android >= 4', 'Ios >= 6', 'last 4 version'],
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
                      loader: 'file-loader',
                      options: {
                        limit: 8192,
                        name: '[name].[ext]',
                        publicPath: "./images",
                        outputPath: "images/"
                      },
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
                include: /src/,         
                exclude: /noder_modules/
            }
        ]
    },
    // plugins对应的插件
    plugins: [
        // 在npm start命令下，打包的文件存在于内存中，并不会产生在dist目录下
        new CleanWebpackPlugin(['dist']), //打包之前清理dist文件夹里面多余的文件,npm start时会清理掉dist

        new webpack.NamedModulesPlugin(),
        // 热替换，热替换不是刷新
        new webpack.HotModuleReplacementPlugin(),

        new OptimizeCssAssetsPlugin(),

        new HtmlWebpackPlugin({           
            template: './src/example/index.html', 
            filename: 'index.html',
            chunks: ['index'],
            hash: true,
            minify:{
                removeAttributeQuotes:true,//去除引号
                removeComments:false,//去除注释
                removeEmptyAttributes:true,//去除空属性
                collapseWhitespace:false//去除空格
            }
        }),
        // 拆分后会把css文件放到dist目录下的css/style.css
        new ExtractTextWebpackPlugin('css/[name].[hash].css'),
    ],

    // resovle解析，配置别名和省略后缀名
    resolve: {
        extensions: ['.js','.json','.css','.scss','.less']
    }
};