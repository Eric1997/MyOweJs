# Rxjs 文档

[toc]

## 前言

* 本文档的说明以及示例代码基于rxjs v6版本，语法与之前版本有些不同。
* rxjs一般声明的变量都以$结尾，表示为流。这是一种惯例，文档中的示例代码将保持这种惯例。
* 想了解更多的rxjs的内容，请点击[rxjs中文文档](https://cn.rx.js.org/)

## 1.Rxjs介绍

在学习rxjs之前，我们先来了解rxjs的几个概念。
 
### 1.1 函数响应式编程

#### 1.1.1 函数式编程


函数式编程就是强调使用函数来解决问题的一种编程形式。

函数式编程有三个特点

* 声明式
* 纯函数
* 数据不可变性

##### 1.1.1.1 声明式  

我们平常使用最频繁的是命令式编程。声明一个函数，实现一个功能，然后执行。  

```
//对数组元素进行加1操作的函数
function add(arr) {
    const results = [];
    for (let i = 0; i < arr.length; i++){ 
        results.push(arr[i] + 1);
    }
    return results;
}

//对数组元素进行乘2操作的函数
function double(arr) {
    const results = [];
    for (let i = 0; i < arr.length; i++){ 
        results.push(arr[i] * 2);
    }
    return results;
}
```
上述代码就是命令式编程的一个例子。我们会发现两个函数只有第四行的代码不一致，函数没有得到复用。

但是我们将它换成声明式编程的方式去实现  
```
function add(arr) {
    return arr.map(item => item + 1);
}

function double(arr) {
    return arr.map(item => item * 2);
}
```
我们直接使用数组的map方法，函数得以复用。map，filter这些方法就是我们开发过程中常见的声明式编程。

##### 1.1.1.2 纯函数

纯函数有两个特点:

* 函数的执行过程完全由输入参数决定，不会受除参数之外的任何数据影响。
* 函数不会修改任何外部状态，比如修改全局变量或传入的参数对象。


```
const a = [1,2,3];
//double是上述例子中的函数
double(a) // [2,4,6]

a//[1,2,3]

```
上述double就是一个纯函数，传入一个数组返回一个新的数组，不修改原数组。

##### 1.1.1.3 数据不可变性

数据不可变，意思就是当我们需要数据状态发生改变时，保持原有数据不变，产生一个新的数据来体现这种变化。


```
let objA = {a : 1};
function copy(obj) {
    return Object.assign({}, obj, {b:2}); //对象的浅复制
    //return {...obj,{b:2}};
}

copy(objA) // {a:1,b:2};
objA //{a:1} 此时objA对象并没有发生变化
```
上述copy函数对传入的对象参数做了一个浅拷贝返回一个新对象。传入的新对象没有发生变化，这就是数据不可变。

#### 1.1.2 响应式编程

响应式编程是一个专注于数据流和变化传递的异步编程范式。

响应式编程的特点：
* 数据流抽象了很多现实问题。
* 擅长处理异步操作。
* 把复杂问题分解成简单问题的组合。

### 1.2 Observable和Observer。

RxJS 有一个核心和三个重点，一个核心是 Observable 再加上相关的Operators，三个重点分别是 Observer、Subject、Schedulers，后续会一一介绍。

理解Rxjs首先要理解Observable和Observer。在rxjs中，数据流就是Observable对象。Observable就是“可以被观察的对象”即“可被观察者”，Observer就是“观察者”，连接两者的桥梁就是Observable对象的函数subscribe。

Observable实现了两种设计模式:观察者模式和迭代器模式。

观察者模式

观察者模式是一种很常用的设计模式。

在RxJS的世界中，Observable对象就是一个发布者，通过Observable对象的subscribe函数，可以把这个发布者和某个观察者（Observer）连接起来。


```
Publisher <-> Observer
```
如何产生事件，这是发布者的责任，在RxJS中是Observable对象的工作。  
如何响应事件，这是观察者的责任，在RxJS中由subscribe的参数来决定。  
什么样的发布者关联什么样的观察者，也就是何时调用subscribe。


创建一个Observable对象

```
//引入Observable构造函数
import {Observable} from 'rxjs';

//创建一个普通函数，该函数会作为Observable构造函数的参数。这个函数参数完全决定了Observable对象的⾏为。该函数还会接受一个observer参数，该参数其实是观察者的一个代理，会接受观察者的所有方法，函数体内会调用observer的方法，将数据推给observer
const onSubscribe = observer => {
    observer.next(1);
    observer.next(2);
    observer.next(3);
}

//创建Observable对象
const flow$ = new Observable(onSubscribe);

//创建观察者
const theObserver = {
    next: item => console.log(item)
}

//将观察者theObserver和被观察者flow$通过subscribe关联起来
flow$.subscribe(theObserver);

```

subscribe可以将三个函数作为参数提供三种回调。分别是正常回调，错误回调，完成回调


```
Observable.subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('done')
);
```


#### 退订数据流


### 1.3 rxjs的安装和调试

```
//安装rxjs 的 v6版本
npm install rxjs

//因为示例都是在控制台去调试的,并且是es6语法，而node本身无法解析ES6，所以需要安装babel
npm install babel

//创建.babelrc文件

//在控制台调试

babel-node   a.js 

```

### 1.4 rxjs的引入方式

* 工具类方法的引用

```
import { 
	Observable, Subject, asapScheduler, pipe, of, from, interval, merge, range, timer, empty,
	never, throwError, fromEvent, fromEventPattern, SubscriptionLike, PartialObserver, 
	defer, forkJoin, ReplaySubject, AsyncSubject, asyncScheduler
} from 'rxjs';

```
* 操作符 operators的引入

```
import { map, mapTo, filter, scan, every, take, takeLast, takeUntil, takeWhile, tap, delay, delayWhen,range,
    skip, skipLast, skipUntil, skipWhile, concat, concatAll, concatMap, concatMapTo, toArray,
    merge, mergeAll, mergeMap, mergeMapTo, mergeScan, combineAll, combineLatest, race, reduce,
    zip, zipAll, switchAll, switchMap, switchMapTo, withLatestFrom, buffer, bufferCount, refCount,
    bufferTime, bufferToggle, bufferWhen, debounce, debounceTime, throttle, throttleTime, throwIfEmpty,
    timeInterval, timeout, timeoutWith, timestamp, distinct, distinctUntilChanged, distinctUntilKeyChanged,
    retry, retryWhen, repeat, repeatWhen, finalize, find, findIndex, flatMap, pluck, pairwise, partition,
    publish, publishBehavior, publishLast, publishReplay, materialize, max, min, multicast,
    sample, sampleTime, sequenceEqual, share, shareReplay, single, subscribeOn
} from 'rxjs/operators';

```

* ajax的引入

```
import { ajax } from 'rxjs/ajax';
```

## 2.Rxjs操作符介绍


学习rxjs主要就是学习操作符的使用。借助操作符将复杂的问题化为简单的问题，然后再去一步步解决。

### 2.1 操作符简介

⼀个Observable对象代表的是⼀个数据流，实际场景中，并不会创造⼀个数据流之后就直接通过subscribe接上⼀个Observer，往往需要对这个数据流做⼀系列处理，然后才交给Observer。

### 2.2 操作符分类

### 2.3 操作符使用

因为数据不可变性，每一个操作符都会返回一个全新的Obserable对象。在v6版本之前可以进行链式调用。在v6版本，我们需要使用pipe这个工具函数，表示每一次创建一个Observable对象，都可以通过管道(pipe)将数据流流向下一个Obserable对象，这样就很符合数据流的特性。


```
//v5版本,操作符可以链式调用
of(1,2,3).map(item => item*2).subscribe({
    console.log
});

//v6版本,需要使用pipe作为通道让数据流流向下游
const flow$ = of(1,2,3).pipe(map(item => item*2));

flow$.subscribe(x => console.log(x));

```



## 3.操作符

### 3.1创建数据流

#### 3.1.1 同步数据流

列举几个常用的操作符,具体使用到的操作符请参考官网文档

* of 列举数据


```
import {of} from 'rxjs';

of(1,2,3).subscribe(
    console.log,
    null,
    () => console.log('done')
);

//result: 1 2 3 done
```

* range 生成每次递增加1的数字序列


```
import {range} from 'rxjs';

//从1开始产生5个整数的序列

range(1,5).subscribe(
    console.log,
    null,
    () => console.log('done')
);

//result: 1,2,3,4,5,done

//同时也支持小数
range(1.1,5).subscribe(
    console.log,
    null,
    () => console.log('done')
);

//result: 1.1,2.1,3.1,4.1,5.1,done
```

* generate 类似for循环创建数据流

先看一个for循环
```
const arr = [];
for(let i = 0;i < 10;i++) {
    arr.push(i * i);
}

```
generate操作符支持四个参数(初始值,条件,递增值,结果)对应for循环中的每个语句


```
import {generate} from 'rxjs/operators'

const flow$ = generate( 2, // 初始值，相当于for循环中的i=2 
    value => value < 10, //继续的条件，相当于for中的条件判断 
    value => value + 2, //每次值的递增 
    value => value * value // 产生的结果 
);

flow$.subscribe(
    console.log,
    null,
    () => console.log('done')
);

//result:4,16,36,64,done

```

* repeat 生成重复数据的数据流


```
import {of} from 'rxjs';
import {repeat} from 'rxjs/operators';

const flow$ = of(1,2,3).pipe(repeat(3));

flow$.subscribe(
    console.log,
    null,
    () => console.log('done')
);

//result: 1,2,3,1,2,3,1,2,3,'done'

```

#### 3.1.2 异步数据流

在js中,我们会经常使用到定时器，并且我们都知道定时器是异步的。setInterval和setTimeout,他们的区别在于一个会一直调用，一个只会调用一次。在Rxjs中,也存在两个生成异步数据流的操作符interval和timer,他们和js中定时器地位差不多，但是功能确不完全一样。

* interval

```
import {interval} from 'rxjs';
import {map} from 'rxjs/operators';

interval(1000).pipe(map(item => item*2)).subscribe(
    console.log,
    null,
    () => console.log('done')
);

//可以每隔一秒输出0,2,4,6...

```

* timer

```
import {timer} from 'rxjs';

timer(1000).subscribe(
    console.log,
    null,
    () => console.log('done')
);


//隔1秒时间,输出0,done

```

timer可以传两个参数,第一个参数为第一次触发的时间间隔,第二个参数就可以不断的触发的时间间隔。所以timer可以实现interval。


```
import {timer} from 'rxjs';

const flow$ = timer(2000, 1000);

flow$.subscribe(
    console.log,
    null,
    () => console.log('done')
);

//2秒后输出1,之后每隔1秒输出1,2,3...

```

* from 可以把一切东西转化为Observable对象

from操作符的功能类似于ES6中Array.from。只是Array.from会把一些有迭代器属性的类型转换为数组,Observable.from会把任何对象转换为Observable对象,无论是数组,字符串,还是Promise


```
import {from} from 'rxjs';

from([1,2,3]).subscribe(
    console.log,
    null,
    () => console.log('done')
);

//result:1,2,3,done

//from还可以转换promise对象
const promise = Promise.resolve('hello');
const promise2 = Promise.reject('error');

from(promise).subscribe(
  console.log,
  error => console.log('catch', error),
  () => console.log('done')
);

//result:hello done

from(promise2).subscribe(
  console.log,
  error => console.log('catch', error),
  () => console.log('done')
);

//result:catch error
```

* fromEvent 



* ajax




### 3.2合并数据流

我们前面介绍每一个Observable对象都是一条数据流，而怎么将这些数据流汇集到一个流中，就需要使用到合并数据流的操作符，每个合并数据流的操作符都有自己的合并规则。

* concat

concat我们也很容易联想到Array.prototype.concat,我觉得每一套语法或者标准的设定，都有着一定的共性。比如在设计rxjs的操作符时,很多地方都和js中的方法名或者功能都有类似的地方。


```
import {of} from 'rxjs';
import {concat} from 'rxjs/operators';

const flow1$ = of(1,2,3);
const flow2$ = of(4,5,6);

flow1$.pipe(concat(flow2$)).subscribe(
  console.log,
  null,
  () => console.log('done')
); //1,2,3,4,5,6,done

```
因concat开始从下个Observable对象抽取数据只能在前一个 Observable对象完结之后

* merge 快的先合并

```
import {
  timer,merge
} from 'rxjs';
import {
  map
} from 'rxjs/operators';
const source1$ = timer(0, 1000).pipe(map(x => x + 'A'));
const source2$ = timer(500, 1000).pipe(map(x => x + 'B'));
const merged$ = merge(source1$, source2$);
merged$.subscribe(
  console.log,
  null,
  () => console.log('complete')
);
//0A,0B,1A,1B...

```
merge的应用



* zip

```
import {
  of ,
  zip
} from 'rxjs';
const source1$ = of (1, 2, 3);
const source2$ = of ('a', 'b', 'c');
zip(source1$, source2$).subscribe(
  console.log,
  null,
  () => console.log('done')
);
//[1,'a'] [2,'b'] [3,'c'] done

```

### 3.3辅助类操作符
* count
* max
* min
* reduce
* every
* find
* isEmpty

### 3.4过滤数据流
* filter


```
import {
  range
} from 'rxjs';
import {
  filter
} from 'rxjs/operators';

range(1,5).pipe(filter(item => item % 2 === 0)).subscribe(
  console.log,
  null,
  () => console.log('done')
);
//2,4,done

```

* first

```
import {
  range
} from 'rxjs';
import {
  first
} from 'rxjs/operators';

//first不传参数返回第一个
range(1,5).pipe(first()).subscribe(
  console.log,
  null,
  () => console.log('done')
);

//first传参数返回一个筛选的值
range(1,5).pipe(first(item => item % 2 === 0)).subscribe(
  console.log,
  null,
  () => console.log('done')
);
```

* last
* take 拿取

```

```


* throttle 节流
* debounce 防抖

### 3.5转化数据流

* map 类似数组的map方法转换形式

```
import {range} from 'rxjs';
import {map} from 'rxjs/operators';

rang(1,5).pipe(map(item => item * 2).subscribe(
    console.log,
    null,
    () => console.log('done')
)

//2 4 6 8 10 done

```

* mapTo 无论上游产生什么数据,传递给下游的都是相同的数据

```
import {range} from 'rxjs';
import {mapTo} from 'rxjs/operators';

rang(1,5).pipe(mapTo(6)).subscribe(
    console.log,
    null,
    () => console.log('done')
)

//6 6 6 6 6 done
```


* pluck 一个很重要的操作符 拔出上游数据流中的特定字段


```
import {of} from 'rxjs'; 
import {pluck} from 'rxjs/operators'; 
const source$ = of(
    {name: 'RxJS', version: 'v4'}, 
    {name: 'React', version: 'v15'}
);
const result$ = source$.pluck('name'); 
result$.subscribe( 
    console.log, 
    null, 
    () => console.log('done')
);

//RxJS React done

```
在aurelia-store中运用到了这个操作符

```
import { pluck, distinctUntilChanged  } from 'rxjs/operators';

@connectTo({
  selector: {
    customer: (store) => store.state.pipe(pluck('customer'), distinctUntilChanged())
  }
})

//我们可以看到如果只去监听customer的变化，就需要使用pluck将state中的customer字段拔出来

```


* scan

## 4.Subject

⼀个Subject既有Observable的接口，也具有Observer的接口，⼀个Subject就具备上述的两个职责。


```
import {
  Subject
} from 'rxjs';
import {map} from 'rxjs/operators';

const subject = new Subject();
subject.pipe(map(x => x * 2)).subscribe(
  value => console.log('on data: ' + value),
  err => console.log('on error: ' + err.message),
  () => console.log('on complete')
);
subject.next(1);
subject.next(2);
subject.next(3);
subject.complete();
```


## 5.Scheduler

### 介绍

Scheduler 官方定义包括三个方面

* Scheduler是⼀种数据结构 

Scheduler对象可以根据优先级或者其他某种条件来安排任务执⾏队列

* Scheduler是⼀个执⾏环境  

Scheduler可以指定⼀个任务何时何地执⾏

* Scheduler拥有⼀个虚拟时钟(virtual clock)

在RxJS的数据流世界⾥，Scheduler说现在是⼏点⼏分⼏秒，那现在就是⼏点⼏分⼏秒，Scheduler就像是这个世界中的权威标准时钟。

### 工作原理
在RxJS中，每⼀个Scheduler类都继承形式如下的接⼜IScheduler

```
interface IScheduler {
now();
schedule(work, delay, state);
}
```
展现Scheduler必须要实现的两
个函数，⼀个是now，返回当前的时间；另⼀个是schedule，⽤于交给
Scheduler⼀个⼯作。work就是代表⼯作的函数，delay是⼀个可选参数，代
表希望Scheduler延时指定毫秒之后再执⾏work。

在RxJS中，每个操作符就是调⽤Scheduler的schedule函数来产⽣数
据，传递给schdule的work函数就是产⽣下⼀个数据要做的⼯作，如果需要
延时产⽣数据，就会传递⼀个⾮零的delay参数。很显然，interval操作符肯
定会使⽤delay参数，⽽range操作符就不会使⽤delay参数。

### 实例


* undefined/null

不指定Scheduler，代表同步执⾏的Scheduler。例如range这个方法默认使用的就是同步的Scheduler。

* asap
利用Eventloop实现异步的效果。它产生的效果类似于JS中的Eventloop中的微任务。例如promise的效果。


```
import {
  asapScheduler
} from 'rxjs';

console.log('before schedule');
asapScheduler.schedule(() => console.log('asap'));
console.log('after schedule');


/*
before schedule
after schedule
asap
*/
```


* async
和asap一样，也是利用的Eventloop实现的异步。但是它产生的效果类似于JS中的Eventloop中的宏任务。例如setTimeout的效果。


```
import {
  asapScheduler
} from 'rxjs';
import {
  asyncScheduler
} from 'rxjs';

console.log('before schedule');
asyncScheduler.schedule(() => console.log('async'));
asapScheduler.schedule(() => console.log('asap'));
console.log('after schedule');

/*
before schedule
after schedule
asap
async
*/
```



* queue
queue这个Scheduler，如果调⽤它的schedule函数式参数delay是0，那
它就⽤同步的⽅式执⾏，如果delay参数⼤于0，那queue的表现其实就和
async⼀模⼀样。


* animationFrame


### 操作符


## 6.rxjs的实际demo

### 6.1 计数器





### 6.2 todoList