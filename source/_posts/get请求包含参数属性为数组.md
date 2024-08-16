---
title: get请求包含参数属性为数组
date: 2022-08-29 12:30:21
tags: 前端
---

> 凡是夫妇不吵架的家庭，准是一块阴森之地，既没有冲击，故也没有快乐——柏杨

有些时候，我们需要使用`GET`请求传递数组，但是使用很多前端请求框架，以及[`EcmaScript`](https://github.com/tc39/ecma262#ecmascript)自带的[`URLSearchParams`](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)转换的`URL`参数都无法直接进行转换：

例如以下格式：

```json
{
    "current": 1,
    "size": 1,
    "orders": [
        {
            "column": "age",
            "asc": true
        },
        {
            "column": "name",
            "asc": true
        }
    ]
}
```

使用`URLSearchParams`转换结果：

```javascript
let searchParams = {current:1,size:1,orders:[{column:'age',asc:true},{column:'name',asc:true}]}
new URLSearchParams(searchParams).toString()
// 'current=1&size=1&orders=%5Bobject+Object%5D%2C%5Bobject+Object%5D'
// decodeURIComponent 解码 current=1&size=1&orders=[object+Object],[object+Object]
```

明显不是我们要的结果

那我们写一行`js`：

```javascript
Object.fromEntries(Object.entries(params).flatMap(([k,v])=>Array.isArray(v)?Object.entries(v).flatMap(([index,value])=> Object.entries(value).map(([ak,av])=>[`${k}[${index}].${ak}`,av])):[[k,v]])) 
```

再封装一下：

```javascript
function handleArrayParams(params){
 return Object.fromEntries(Object.entries(params).flatMap(([k,v])=>Array.isArray(v)?Object.entries(v).flatMap(([index,value])=> Object.entries(value).map(([ak,av])=>[`${k}[${index}].${ak}`,av])):[[k,v]]))   
}
```

最后使用：

```javascript
let searchParams = {current:1,size:1,orders:[{column:'age',asc:true},{column:'name',asc:true}]}

function handleArrayParams(params){
 return Object.fromEntries(Object.entries(params).flatMap(([k,v])=>Array.isArray(v)?Object.entries(v).flatMap(([index,value])=> Object.entries(value).map(([ak,av])=>[`${k}[${index}].${ak}`,av])):[[k,v]]))   
}

new URLSearchParams(handleArrayParams(searchParams)).toString()
```

结果：

```javascript
'current=1&size=1&orders%5B0%5D.column=age&orders%5B0%5D.asc=true&orders%5B1%5D.column=name&orders%5B1%5D.asc=true'
```

这个可以直接放在`url`后面当做参数使用，即便是数组也可以，这里只做了一层，并没有尝试深入处理

解码后是这样一个格式：

```javascript
// 进行解码
decodeURIComponent('current=1&size=1&orders%5B0%5D.column=age&orders%5B0%5D.asc=true&orders%5B1%5D.column=name&orders%5B1%5D.asc=true')
// 解码后
'current=1&size=1&orders[0].column=age&orders[0].asc=true&orders[1].column=name&orders[1].asc=true'
```

