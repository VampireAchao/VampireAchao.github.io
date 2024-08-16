---
title: get请求包参数属性为数组（二）
date: 2022-11-12 18:35:41
tags: 前端
---

> 伤害可能被原谅，但不会被遗忘——伊索

之前写过一篇[get请求包含参数属性为数组](https://VampireAchao.github.io/2022/08/29/get请求包含参数属性为数组/)

但是发现不适用数组不为对象的情况，例如`ids: [1024, 2048, 4096]`，而且可读性有点差，使用起来还得转下参数，所以封装了改良版

```javascript
let searchParams = {
    current: 1,
    size: 1,
    orders: [
                {
                    column:'age',
                    asc:true
                },
                {
                    column:'name',
                    asc:true
                }
    ],
    ids: [1024, 2048, 4096]
}

function resolveParam(params){
    const entries = Object.entries(params).flatMap(([k,v])=> {
        if(!Array.isArray(v)){
            return [[k,v]]
        }
        return Object.entries(v).flatMap(([index,value])=> {
            if(typeof value == 'object'){
                return Object.entries(value).map(([ak,av])=> [`${k}[${index}].${ak}`,av])
            }
            return [[`${k}[${index}]`,value]]
        })
    })
    const result = Object.fromEntries(entries)
    return new URLSearchParams(result).toString()    
}
// 可直接拼到请求url "?" 后面
const yourParamStr = resolveParam(searchParams)
// 解码打印查看参数结果
console.log(decodeURI(yourParamStr))
```

执行效果：

![image-20221112184019450](/imgs/oss/picGo/image-20221112184019450.png)
