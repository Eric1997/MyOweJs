'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    //单入口配置
    //entry: './src/index.js', //入口文件
    entry: {
        index: './src/index.js',
        search: './src/c.js'
    },
    //单入口
    // output:{
    //     path: path.join(__dirname, 'dist'),
    //     filename: 'bundle.js'
    // },//输出文件
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development', //production 生产环境 development 开发环境 webpack-dev-server 只需要在开发环境使用
    module: {
        rules:[
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    'style-loader',
                    'css-loader'//从右向左解析
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',//从右向左解析
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                //use: 'file-loader'
                use: 'url-loader',
                options:{
                    limit: 10240 //小于10k的自动转换为base64
                }
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                //use: 'file-loader'
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    //配置webpack-dev-server
    devServer: {
        contentBase: './dist', //服务基础目录 
        hot: true
    }
}