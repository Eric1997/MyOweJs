/*
适合我学习的类库
内容包括各种事件操作,dom操作，ajax操作,还有一些便利的常用的方法
用ES6语法重写
会定时增添其他的方法,同时会不断改进类库的质量
 */

let EventHandle = {
	getEvent: () => event ? event : window.event;
}