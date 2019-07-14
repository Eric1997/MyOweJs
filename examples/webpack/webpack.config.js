'use strict';

const path = require('path');

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
    mode: 'production' //环境
}