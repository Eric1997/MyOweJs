/*
适合我学习的类库
内容包括各种事件操作,dom操作，ajax操作,还有一些便利的常用的方法
用ES6语法重写
会定时增添其他的方法,同时会不断改进类库的质量
 */
import 'whateg-fetch';
import 'es6-promise';

class EventHandle{
	constructor(){
		super();
	}

	getEvent(){
		return event ?event:window.event;
	}
}

class dataHandle extends EventHandle{
	constructor(){
		super();
		this.paramArray=[];
	}
	//通过get方法获取数据  fetch
	get(url){
		let result=fetch(url,{
			credenttials:'include',
			headers:{
				'Accept':'application/json,text/plain,*/*'
			}
		});
		return result;
	}

	objtoparams(obj){
		let result='';
		let item;
		for(item in obj){
			result+='&'+item+'='+encodeURLComponent(obj[item]);
		}
		if(result){
			result=result.slice(1);
		}
		return result;
	}

	post(url,obj){
		let result=fetch(url,{
			method:'POST',
			credentials:'include',
			headers:{
				'Accept':'application/json,text/plain,*/*',
				'Content-Type':'application/x-www-form-urlencoded'
			},
			body:this.objtoparams(obj)
		});
		return result;
	}
}

class usefulFunc{
	trim(str){
		return  str.replace(/(^\s*)|(\s*$)/g,'');
	}

	trimLeft(str){
		return str.replace(/(^\s*)/g,'');
	}

	trimRight(str){
		return str.replace(/(\s*$)/g,'');
	}
	//判断一个是否是数组
	isArray(org){
		if (typeof org == "object") {
            let criteria = org.constructor.toString().match(/array/i);
            return (criteria != null);
        }
        return false;
	}

	//生成一个给定字数个数的验证码
	checkCode(digit){
		let result = "";
        for (let i = 0; i < parseInt(digit); i++) {
            result = result + (parseInt(Math.random() * 10)).toString();
        }
        return result;
	}

	checkEmail(str){
		let str=this.trim(str);
		if(str==''){
			return false;
		}else{
			let reg=/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
			if(!reg.test(str)){
				alert('您输入的邮箱格式不正确');
			}
		}
	}

	checkUrl(url){
		let url=this.trim(url);
		if(str==''){
			return false;
		}else{
			let reg=/((ht|f)tps?:)\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
			if(!reg.test(str)){
				alert('您输入的url地址不正确');
			}
		}
	}

	//简单判断是否为数组
	isArray(obj){
		if (obj.toString() === '[Object Array]') {
			return true;
		}
		return false;
	}

    //简单判断是否为对象
	isObject(obj) {
		if ((typeof obj === 'object' || typeof obj === 'function' ) && typeof obj !== null) {
			return true;
		}
		return false;
	}

}


export default Handle;