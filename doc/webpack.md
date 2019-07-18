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


### 解析Es6
* 使用babel-loader
* babel的配置文件是 .babelrc

* npm install @babel/core @babel/preset-env babel-loader 

* 支持react 

*npm i react react-dom @babel/preset-react

### 解析CSS

* css-loader 用于加载.css文件，并且转换成commonjs对象
* style-loader 将样式通过style标签插入到head中

* npm install style-loader css-loader

### 解析less

* less-loader 将less文件转换为css文件

* npm i less less-loader

### 解析图片 解析字体

* file-loader 用于处理文件 

* url-loader 可以设置较小资源自动base64转换

### webpack监听

* 方式一 启动webpack时 带上--watch参数

* 方式二 在webpack.config.js 中设置 watch:true

### 文件监听的原理分析  

轮询判断文件的最后编辑时间是否改变 

某个文件发生了变化 并不会立刻告诉监听者  而是先缓存起来 等 aggregateTimeout

```
module.export = {
   watch: true, //默认是false
   watchOptions: {
      ignored: /node_modules/, //默认为空 忽略监听的文件或者文件夹 支持正则匹配

      aggregateTimeout: 300, //监听到变化发生后会等300ms再去执行，默认300ms

      poll: 1000 //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的 默认每秒问1000次
   }   
}

```

### 热更新 

* webpack-dev-server 不刷新浏览器 不输出文件 而是放在内存中  --open表示每次开启webpack都会自动打开浏览器

* 使用HotModuleReplacementPlugin插件

### 热更新的原理 

* webpack compile 将js编译成bundle 
* hmr server 将热更新的文件输出给hmr rumtime
* bundle server 提供文件在浏览器的访问
* hmr rumtime 会被注入到浏览器 更新文件的变化
* bundle.js 构建输出的文件