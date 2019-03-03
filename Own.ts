/*
ts 方法
*/

interface strParm {
    str : string
}

interface arrParm {
    
}

export class strClass implements strParm {
    str:string;

    constructor(str:string) {
        this.str = str;
    }

    //去取空格
    trim(str:string) : string {
        return str.replace(/(^\s*)|(\s*$)/g,'');
    }

}

export class ArrClass implements arrParm {
    constructor() {

    }

    //判断是否为数组
}