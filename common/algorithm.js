/**
 * 记录常见算法
 * author: eric
 */

 //冒泡排序
function bubble(arr){
	var temp=0;
	var len=arr.length;
	for(var i=0;i<len;i++){
		for(var j=0;j<len-1-i;j++){
			if(arr[j]>arr[j+1]){
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
	return arr;
}

//改进的冒泡排序
function bubble2(arr){
	var pos=0;
	var temp=0;
	var len=arr.length;
	var i=len-1;
	while(i>0){
		for(var j=0;j<i;j++){
			if(arr[j]>arr[j+1]){
				pos=j;
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
		i=pos;
	}
	return arr;
}

//改进的冒泡排序2

function bubble3(arr){
	var low=0;
	var high=arr.length-1;
	var temp,j;
	while(low<high){
		for(j=low;j<high;++j){
			if(arr[j]>arr[j+1]){
				temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
			//正向冒泡,找到最大值
			--high;
			for(j=high;j>low;--j){
				if(arr[j]<arr[j-1]){
					temp=arr[j];
					arr[j]=arr[j-1];
					arr[j-1]=temp;
				}
			}
			//反向冒泡,找到最小值
			++low;
		}
	}
	return arr;
}

//选择排序
function choose(arr){
	var min;
	var len=arr.length;
	for(var i=0;i<len-1;i++){
		min=i;
		for(var j=i+1;j<len;j++){
			if(arr[j]<arr[min]){
				min=j;
			}
		}
		var temp=arr[i];
		arr[i]=arr[min];
		arr[min]=temp;
	}
	return arr;
}