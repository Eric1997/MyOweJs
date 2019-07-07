/*
适合我学习的类库
内容包括各种事件操作,dom操作，ajax操作,还有一些便利的常用的方法
还有各种数组方法,ES6
会定时增添其他的方法,同时会不断改进类库的质量
 */

//事件操作的一些方法
var EventHandle={
    //获取事件对象
    getEvent:function(){
        return event?event:window.event;
    },
    //获取事件对象的target属性,针对IE6,IE7的window.event和srcElement
    getActiveObj:function(e){
        var obj;
        if(!e){
            obj=window.srcElement;
        }
        else if(e.srcElement){
            obj=e.srcElement;
        }
        else{
            obj=e.target;
        }
        return obj;
    },
    //事件委托的绑定事件的方法
    add:function(ele,type,selector,fn){
        if(fn==null){
            fn=selector;
            selector=null;
        }
        ele.addEventListener(type,function(e){
            var target;
            if(selector){
                target=e.target;
                if(target.matches(selector)){
                    fn.call(target,e);
                }
            }else{
                fn(e);
            }
        })
    },
    //可以同时加载若干的函数,改进了window.onload
    addLoadEvent:function(func){
         var oldonload=window.onload;
         if(typeof window.onload!='function'){
            window.onload=func;
         }
         else{
            window.onload=function(){
               oldonload();
               func();
            }
         }
      },
    //通用的绑定事件函数
    addEvent:function(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn,false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on'+type,fn);
        } else {
            ele['on'+type]=fn;
        }
    },
    //通用的删除事件的函数
    delEvent:function(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn,false);
        } else if(ele.detachEvent) {
            ele.detachEvent('on'+type,fn);
        } else {
            ele['on'+type]=null;
        }
    },
    //通用取消事件冒泡的函数
    stopBubble:function(event){
        event=getEvent();
        if(event.stopPropagation){
            event.stopPropagation();
        }
        else{
            event.cancelBubble=true;
        }
    },
    //通用取消事件默认行为的方法
    stopDefault:function(event){
        event=getEvent();
        if(event.preventDefault){
            event.preventDefault();
        }
        else{
            event.returnValue=false;
        }
    },
    //获取鼠标滑过的高度
    getScrollTop:function(){
        return document.documentElement.scrollTop || document.body.scrollTop;
    },
    //获取鼠标滑过的宽度
    getScrollLeft:function(){
        return document.documentElement.scrollLeft || document.body.scrollLeft;
    },
    //获取可视区域的高度
    getHeight:function(){
        var pageHeight=window.innerHeight;   
            if(typeof pageHeight!="number"){
                if(document.compatMode=="CSS1Compat"){//标准模式
                    pageHeight=document.documentElement.clientHeight;
                }else{
                    pageHeight=document.body.clientHeight;//混杂模式
                }
            }   
    },
    //获取可是区域的宽度
    getWidth:function(){
        var pageWidth=window.innerWidth;
            if(typeof pageWidth!="number"){
                if(document.compatMode=="CSS1Compat"){
                    pageWidth=document.documentElement.clientWidth;//标准模式
                }else{//混杂模式
                    pageWidth=document.body.clientWidth;
                }
            }
    },
    //screenLeft和screenTop属性返回窗口相对于屏幕的X和Y坐标。
    leftPos:function(){
        return (typeof window.screenLeft=="number")?window.screenLeft:window.screenX;
    },
    topPos:function(){
        return (typeof window.screenTop=="number")?window.screenTop:window.screenY;
    },
    //获取元素相对于窗口的左偏移量
    getElementLeft:function(element){
        var actualLeft=element.offsetLeft;
        var current=element.offsetParent;
        while(current!==null){
            actualLeft+=current.offsetLeft;
            current=current.offsetParent;
        }
        return actualLeft;
    },
    //获取元素相对于窗口的上偏移量
    getElementTop:function(element){
        var actualTop=element.offsetTop;
        var current=element.offsetParent;
        while(current!==null){
            actualTop+=current.offsetTop;
            current=current.offsetParent;
        }
        return actualTop;
    },
    //元素的可见大小为内容内边距和边框  不包括外边距  offset
    //元素的客户区大小为内容 内边距  不包括边框和外边距  client
    //获取客户区域大小
    getviewport:function(){
        if(document.conpatMode=="BackCompat"){
            return {
                width:document.body.clientWidth,
                height:document.body.clientHeight
            }
        }
        else{
            return {
                width:document.documentElement.clientWidth,
                height:document.documentElement.clientHeight
            }
        }
    },
    //偏移量和客户区大小都只是可读的,每次访问都要重新计算
    //滚动大小  除了内容和内边距外距离窗口的隐藏内容的高度和宽度  scroll
    getBoundClientRect:function(element){
        var scrollTop=document.documentElement.scrollTop;
        var scrollLeft=document.documentElement.scrollLeft;
        if(element.getBoundClientRect){
            if(typeof arguments.callee.offset!="number"){
                var scrollTop=document.documentElement.scrollTop;
                var temp=document.createElement("div");
                temp.style.cssText="position:absolute;left:0;top:0";
                document.body.appendChild(temp);
                arguments.callee.offset=-temp.getBoundClientRect().top-scrollTop;
                document.body.removeChild(temp);
                temp=null;
            }
            var rect=element.getBoundClientRect();
            var offset=arguments.callee.offset;
            return {
                left:rect.left+offset,
                right:rect.right+offset,
                top:rect.top+offset,
                bottom:rect.bottom+offset
            }
        }
        else{
            var actualLeft=getElementLeft(element);
            var actualTop=getElementTop(element);
            return {
                left:actualLeft-scrollLeft,
                right:actualLeft+element.offsetWidth-scrollLeft,
                top:actualTop-scrollTop,
                bottom:actualTop+element.offsetHeight-scrollTop
            }
        }
    },
    //客户区的坐标位置  鼠标指针在视口中的坐标
    getCoordinateX:function(){
        var event=EventHandle.getEvent();
        return event.clientX;
    },
    getCoordinateY:function(){
        var event=EventHandle.getEvent();
        return event.clientY;
    },
    //页面坐标位置
    getPosition:function(){   
        var event=EventHandle.getEvent();
        var pageX=event.pageX;
        var pageY=event.pageY;
        if(pageX===undefined){
           pageX=event.clientX+(document.body.scrollLeft||document.documentElement.scrollLeft);
        }
        if(pageY===undefined){
            pageY=event.clientY+(document.body.scrollTop||document.documentElement.scrollTop);
        }
    },
    //鼠标按钮
    getButton:function(event){
        if(document.implementation.hasFeature("MouseEvents","2.0")){
            return event.button;
        }
        else{
            switch(event.button){
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    }
}


//dom操作的一些方法
var DomHandle={
    getById:function(id){
        return document.getElementById(id);
    },
    getByTag:function(tagName){
        return document.getElementsByTagName(tagName);
    },
    getByClassName:function(Cln,parent){
        var oparent=parent?getById(parent):document,
            ochild=oparent.getElementsByTagName('*'),
            array=[];
        for(var i in ochild){
            if(ochild[i].className.indexOf(Cln)!=-1){
                array.push(ochild[i]);
            }
        }
        return array;
    },
    getBySelector:function(selector){
        return document.querySelector(selector);
    },
    getBySelectorAll:function(selector){
        return document.querySelectorAll();
    },
    getBySelect:function(selector){
        return selector.substr(0,1)=='.'?document.getElementsByClassName(selector.substr(1)):document.getElementById(selector.substr(1));
    },
    createDom:function(tag){
        return document.createElement(tag);
    },
    Parent:function(dom){
        return dom.parentNode;
    },
    Child:function(dom){
        return dom.childNodes;
    },
    insertBefore:function(parentNode,newEle,targetEle){
        return parentNode.insertBefore(newEle,targetEle);
    },
    insertAfter:function(newEle,targetEle){
        var parent=targetEle.parentNode;
        if(parent.lastChild==targetEle){
            parent.appendChild(newEle);
        }else{
            parent.insertBefore(newEle,targetEle.nextSibling);
        }
    },
    getNextElement:function(node){
        if(node.nodeType==1){
            return node;
        }
        if(node.nextSibling){
            return getNextElement(node.nextSibling);
        }
        return null;
    },
    addClass:function(ele,value){
        if(!ele.className){
            ele.className=value;
        }else{
            newClassName=ele.className;
            newClassName+=' value';
            ele.className=newClassName;
        }
    },
    moveElement:function(id,finalX,finalY,interval){
        if(!document.getElementById){
            return false;
        }
        if(!document.getElementById(id)){
            return false;
        }
        var ele=this.getById(id);
        var x=parseInt(ele.style.left);
        var y=parseInt(ele.style.top);
        if(x==finalX&&y==finalY){
            return true;
        }
        if(x<finalX){
            x++;
        }
        if(x>finalX){
            x--;
        }
        if(y<finalY){
            y++;
        }
        if(y>finalY){
            y--;
        }
        ele.style.left=x+'px';
        ele.style.top=y+'px';
        var repeat='moveElement('+id+','+finalX+','+finalY+','+interval+')';
        movement=setTimeout(repeat,interval);
    }
}


//ajax操作的一些方法
var AjaxHandle={
    createRequest:function(e){
        try{
            request=new XMLHTTPRequest();
        }
        catch(tryMS){
            try{
                request=new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch(otherMS){
                try{
                    request=new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch(failed){
                    request=null;
                }
            }
        }
        return request;
    },
    getHTTPObject:function(){
        if(typeof XMLHTTPRequest==='undefined'){
            XMLHTTPRequest=function(){
                try{
                    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
                }catch(e){}
                try{
                    return new ActiveXObject('Msxml2.XMLHTTP.3.0');
                }catch(e){}
                try{
                    return new ActiveXObject('Msxml2.XMLHTTP');
                }catch(e){}
                return false;
            }
            return new XMLHTTPRequest();
        }
    },
    getRequestInfo:function(num){
        switch(num){
            case 0:
            console.log('初始化');
            break;
            case 1:
            console.log('正在加载');
            break;
            case 2:
            console.log('加载完毕');
            break;
            case 3:
            console.log('正在交互');
            break;
            case 4:
            console.log('完成');
            break;
        }
    },

}


//一些其他的有用的方法
var Handler={
    //判断是否是数组
    isArray : function(org) {
        if(typeof org=="object"){
            var criteria=org.constructor.toString().match(/array/i);
            return (criteria!=null);
        }
        return false;
    },
    //将nodelist对象转换为数组
    coverToArray:function(nodes){
        var arr=null;
        try{
            array=Array.prototype.slice.call(nodes,0);//非IE
        }catch(ex){
            array=new Array();
            for(var i=0,len=nodes.length;i<len;i++){
                array.push(nodes[i]);
            }
        }
        return array;
    },
    //动态添加style标签
    loadStyle:function(css){
        var style=document.createElement("style");
        try{
            style.appendChild(document.createTextNode(""));
        }catch(ex){
            style.styleSheet.cssText=css;//IE
        }
        var head=document.getElementsByTagName("head")[0];
        head.appendChild(style);
    },
    //动态添加link标签
    loadCss:function(url){
        var link=document.createElement("link");
        link.rel="stylesheet";
        link.type="text/css";
        link.href=url;
        var head=document.getElementsByTagName("head")[0];
        head.appendChild(link);
    },
    //动态添加script标签
    loadScript:function(url){
        var srcipt=document.createElement("script");
        srcipt.type="text/javascript";
        code="";
        try{
            script.appendChild(document.createTextNode(code));
        }catch(ex){
            script.text=code;//IE
        }
        document.body.appendChild(srcipt);
    },
    //生成一个给定个数的数字验证码
    checkCode:function(digit){
        var result="";
        for(var i=0;i<parseInt(digit);i++)
        {
            result=result+(parseInt(Math.random()*10)).toString();
        }
            return result;
    },
    //解决移动端视口大小的问题
    addMobileMeta:function(){
        var metaval=document.createElement("meta");
        var scale=isRetina?0.5:1;
        metaval.setAttribute("name","viewport");
        metaval.setAttribute('content','initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=' + no);
        if(documentElement.firstElementChild){
            document.documentElement.firstElementChild.appendChild(metaval);
        }
        else{
            var wrap=document.createElement("div");
            wrap.appendChild(metaval);
        }
    },
    //拿到键值对
    getNameValue:function(){
        var qs=(location.search.length>0)?location.search.substring(1):"";
        var qsarray=(qs.length)?qs.split("&"):[];
        var args={};
        var item=null;
        var name=null;
        var value=null;
        for(var i=0;i<qsarray.length;i++){
            item=qsarray[i].split("=");
            name=decodeURIComponet(item[0]);
            value=decodeURIComponet(item[1]);
            if(name.length){
                args[name]=value;
            }
        }
        return args;
    },
    //navigator对象检测插件
    hasPlugin:function(name){
        name=name.toLowerCase();
        for(var i=0;i<navigator.plugins.length;i++){
            if(navigator.plugins[i].name.toLowerCase().indexOf(name)>-1){
                return true;
            }
        }
        return false;
    },
    //检测IE中的插件
    hasIEPlugin:function(name){
        try{
            new ActiveXObject(name);
            return true;
        }catch(ex){
            return false;
        }
    },
    //向URI尾部添加查询字符串参数
    addURLParam:function(url,name,value){
        url+=(url.indexOf('?')==-1?'?':'&');
        url+=encodeURIComponent(name)+'='+encodeURIComponent(value);
        return url;
    },
    //跨浏览器的CORS
    createCORSRequest:function(method,url){
        var xhr=AjaxHandle.getHTTPObject();
        if("withCredentials" in xhr){
            xhr.open(method,url,true);
        }else if(typeof XDomainRequest!='undefined'){
            xhr=new XDomainRequest();
            xhr.open(method,url)
        }else{
            xhr=null;
        }
        return xhr;
    },
    //每次执行定时器时都会清除之前的定时器
    throttle:function(method,context,interval){
        clearTimeout(method.tId);
        method.tId=setTimeout(function(){
            method.call(context)
        },interval);
    },
    //针对不同浏览器的选择器函数
    matchesSelector:function(element,selector){
        if(element.matchesSelector){
            return element.matchesSelector(selector);
        }
        else if(element.msmatchesSelector){
            return element.msmatchesSelector(selector);
        }
        else if(element.mozmatchesSelector){
            return element.mozmatchesSelector(selector);
        }
        else if(element.webkitmatchesSelector){
            return element.webkitmatchesSelector(selector);
        }
        else{
            throw new Error("Not supported");
        }
    },
    //关于innerText的兼容性
    getInnerText:function(element){
        return (typeof element.textContent=="string")?element.textContent:element.innerText;
    },
    setInnerText:function(element,text){
        if(typeof element.textContent=="string"){
            element.textContent=text;
        }
        else{
            element.innerText=text;
        }
    },
    //注意  innerText不返回样式  只返回文本  textContent返回样式和文本
    //跨浏览器的方式插入规则
    insertRule:function(sheet,selectorText,cssText,position){
        if(sheet.insertRule){
            sheet.insertRule(selectorText+"{"+cssText+"}",position);
        }
        else if(sheet.addRule){
            sheet.addRule(selectorText,cssText,position);
        }
    },
    //跨浏览器删除规则
    deleteRule:function(sheet,index){
        if(sheet.deleteRule){
            sheet.deleteRule(index);
        }
        else if(sheet.removeRule){
            sheet.removeRule(index);//IE
        }
    },
    //实现表单序列化
    serialize:function(form){
        var parts=[],
            field=null,
            i,
            j,
            len,
            optLen,
            option,
            optValue;
            for(i=0,len=form.elements.length;i<len;i++){
                field=form.elements[i];
                switch(field.type){
                    case "select-one":
                    case "select-multiple":
                    if(field.name.length){
                        for(j=0,optLen=field.options.length;j<optLen;j++){
                            option=field.options[j];
                            if(option.selected){
                                optValue=(option.hasAttribute("value")?option.value:option.text);
                            }else{
                                optValue=(option.attribute["value"].specified?option.value:option.text);
                            }
                            parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue));
                        }
                    }
                break;
                case undefined:
                case "file":
                case "submit":
                case "reset":
                case "button":
                break;

                case "radio":
                case "checkbox":
                if(!field.checked){
                    break;
                }
                default:
                if(field.name.length){
                    parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(field.value));
                }
            }
            return parts.join("&");
        }
    },
    //自动切换焦点
    tabForward:function(event){
        var event=EventHandle.getEvent();
        var target=EventHandle.getActiveObj();
        if(target.value.length==target.maxLength){
            var form=target.form;
            for(var i=0,len=form.length;i<len;i++){
                if(form.element[i+1]){
                    form.element[i+1].focus();
                }
                return;
            }
        }
    },
    //选取表单中被选中的多选框
    getSelectedOptions:function (selectbox){
        var result=new Array();
        var option=null;

        for(var i=0,len=selectbox.options.length;i<len;i++){
            option=selectbox.options[i];
            if(option.selected){
                result.push(option);
            }
        }
        return result;
    },
    //灰阶过滤器,得到图像的黑白版
    getImgBW:function(){
        var canvas=document.getElementById("canvas");
            if(canvas.getContext){
                var context=canvas.getContext("2d");
                context.drawImage(image,0,0);
                imageData=context.getImageData(0,0,image.width,image.height);//获得原始图像的数据
                data=imageData.data;//保存图像每一个像素的数据,数组  data数组中，每个像素都分成了rgba
                for(var i=0;i<data.length;i+=4){
                    red=data[i];
                    green=data[i+1];
                    blue=data[i+2];
                    alpha=data[i+3];

                    average=Math.floor((red+blue+green)/3);


                    data[i]=average;
                    data[i+1]=average;
                    data[i+2]=average;
                }
                imageData.data=data;
                context.putImageData(imageData,0,0);
                }
    },

    //解决错误的方法
    dealError:function(){
        try{
            someFun();
        }catch(error){
            if(error instanceof TypeError){
                //
            }
            else if(error instanceof ReferenceError){
                //
            }else{
                //
            }
        }
    },
    //跨浏览器处理XML
    parseXml: function(xml) {
        var xmldom=null;
        if(typeof DOMParser!="undefined"){
            xmldom=(new DOMParser()).parseFromString(xml,"text/xml");
            var errors=xmldom.getElementsByTagName("parsererror");
            if(errors.length){
                throw new Error("XML parsing error:"+errors[0].textContent);
            }
        }else if(typeof ActiveXObject!="undefined"){
            xmldom=createDocument();
            xmldom.loadXML(xml);
            if(xmldom.parseError!=0){
                throw new Error("XML parsing error:"+xmldom.parseError.reason);
            }
        }else{
            throw new Error("No XML parser avaliable");
        }
        return xmldom;
    },
    //跨浏览器序列化XML
    serializeXml: function(xmldom){
        if(typeof XMLSerializer()) {
            serializeToString(xmldom);
        } else if (typeof xmldom.xml!="undefined") {
            return xmldom.xml;
        } else {
            throw new Error("Counld not serialize XML DOM");
        }
    },
    //跨浏览器使用XPath
    selectSingleNode: function(context) {
        var doc=(context.nodeType!=9?context.ownerDoucment:context);

        if(typeof doc.evaluate!="undefined"){
            var nsresolver=null;
            if(namespaces instanceof Object){
                nsresolver=function(prefix){
                    return namespaces[prefix];
                };
            }
            var result=doc.evaluate(expression,context,nsresolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
            return (result!==null?result.singleNodeValue:null);
        }else if(typeof context.selectSingleNode!="undefined"){
            if(namespaces instanceof Object){
                var ns="";
                for(var prefix in namespaces){
                    if(namespaces.hasOwnProperty(prefix)){
                        ns+="xmlns:"+prefix+"="+namespaces[prefix]+"'";
                    }
                }
                doc.setProperty("SelectionNamespaces",ns);
            }
            return context.selectSingleNode(expression);
        }else{
            throw new Error("No XPath engine found");
        }
    }
}

//经典问题
//手写promise
function MyPromise(executor) {
	let self = this;
	// 用来保存then 方法中，第一个参数
  self.onResolvedCallbacks = []
  // 用来保存then 方法中，第二个参数
  self.onRejectedCallbacks = []
  self.status = 'pending' // 默认promise状态是pending
  function resolve(value){
  	if (self.status === 'pending') {
  		self.value = value;
  		self.status = 'resolved';
  		self.onResolvedCallbacks.forEach(fn => {
        fn()
      })
  	}
    // 成功状态
  }
  function reject(reason){
  	if (self.status === 'pending') {
  		self.reason = reason;
  		self.status = 'rejected';
  		self.onRejectedCallbacks.forEach(fn => {
        fn()
      })
  	}
     //失败状态
  }

	executor(resolve, reject);
}


//非链式调用
MyPromise.prototype.then = function (resolved, rejected) {
	let self = this
  if(self.status === 'resolved'){
    resolved(self.value);
  }
  if(self.status === 'rejected'){
    rejected(self.reason);
  }

  //异步任务会放到任务队列中,当还未执行resolve和reject时

  if(self.status === 'pending'){
  // 订阅
    self.onResolvedCallbacks.push(function(){
      onFulfilled(self.value)
    })
    self.onRejectedCallbacks.push(function(){
      onRejected(self.reason)
    })
  }
}

//链式调用
MyPromise.prototype.then = function(resolved, rejected) {
	return new MyPromise(function(resolve, reject){
        if(self.status === 'resolved'){
            try{
        let x = resolved(self.value);
        resolve(x);
        } catch(e){
        reject(e)
        }
        }
        if(self.status === 'rejected'){
            
        }
        if(self.status === 'pending'){}
    });
}

//节流
function debounce(fn, time) {
	let timer;
	return function() {
		let self = this;
		let args = arguments;
		timer && clearTimeout(timer);
		timer = setTimeout(function(){
			fn.apply(self,args);
		},time)
	}
}

//防抖
function throttle(fn, time) {
	let timer;
	let start;
	return function loop() {
		let self = this;
		let args = arguments;
		let now = Date.now();
		if(!start){
       start = now;
    }
		timer && clearTimeout(timer);
		if (now - start >= time) {
			fn.apply(self, args);
			start = now;
		} else {
			timer = setTimeout(function() {
				loop.apply(self, args);
			},time)
		}
	}
}

function bind(fn, context) {
	return function() {
		fn.apply(context, arguments);
	}
}

//fn要执行的函数,context 传入的作用域
//重载在函数内部实现，柯里化在函数外部实现
//
//柯里化  函数执行时传入全部参数
function curry(fn) {
	//将传递的参数转化为数组，但是从第二个参数开始
	let args = Array.prototype.call.slice(arguments, 1);

	//传递剩余参数，全部的剩余参数
	return function() {

		let execArgs = Array.prototype.call.slice(arguments);

		let allArgs = args.concat(execArgs);

		return fn.apply(null, allArgs);
	}
}


//实现bind
function bind(fn, context) {

	return function() {

		let args = Array.prototype.call.slice(arguments, 2);

		return function() {
			let execArgs = Array.prototype.call.slice(arguments);

			let allArgs = args.concat(execArgs);

			fn.apply(context, allArgs);
		}
	}
}


//原子继承  寄生工厂模式
//参数是对象，返回是一个继承了方法属性的新对象
function create(obj) {
	function F() {}

	F.prototype = obj;

	return new F(); //寄生工厂式继承

	//return F;  寄生式继承

}
