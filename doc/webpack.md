# Webpack学习笔记

- - - 

### 学习webpack
* 转化ES6  
* 转化JSX 
* CSS前缀补全/预处理器 
* 压缩混淆 
* 图片压缩

### webpack 配置

* webpack --config 指定配置文件   默认配置文件webpack.config.js
* webpack配置组成  

```
module.exports = {
   entry:  //打包的入口文件
   output:  //打包的输出文件
   mode: //环境
   modules: //loader配置
   plugins: //插件配置
}
```

### webpack 命令启动

* 通过在package.json里面设置script  通过npm run build 进行构建 
* 原理：模块局部安装会在node_modules/.bin目录创建软链接