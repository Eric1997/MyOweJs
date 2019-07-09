//Issue one 
//尾递归实现阶乘
function fn(n, total){
    if (n === 1) {
        return total;
    }
    return fn(n-1, n*total);
}

fn(5,1) //120

//使用柯里化让该函数参数变为一个

function curry(f) {
    let args = [].slice.call(arguments,1);
    let self = this;
    return function() {
        let _args = [].slice.call(arguments).concat(args);
        return f.apply(self,_args);
    }
}

let gn = curry(fn,1);

gn(5); //120