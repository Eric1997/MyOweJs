/*
适合我学习的类库
内容包括各种事件操作,dom操作，ajax操作,还有一些便利的常用的方法
用ES6语法重写
会定时增添其他的方法,同时会不断改进类库的质量
 */
import 'whateg-fetch';
import 'es6-promise';

let Handle = {
	getEvent: () => event ? event : window.event;
	get:(url)=>{
		let result=fetch(url,{
			credenttials:'include',
			headers:{
				'Accept':'application/json,text/plain,*/*'
			}
		});
		return result;
	}
	objtoparams:(obj)=>{
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
	post:(url,obj)=>{
		let result=fetch(url,{
			method:'POST',
			credentials:'include',
			headers:{
				'Accept':'application/json,text/plain,*/*',
				'Content-Type':'application/x-www-form-urlencoded'
			}
			body:objtoparams(obj)
		});
		return result;
	}
}

export default Handle;