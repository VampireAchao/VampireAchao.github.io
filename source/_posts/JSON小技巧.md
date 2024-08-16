---
title: JSON小技巧
date: 2022-11-20 13:08:21
tags: 前端
---

> 越年轻，就越不能跟丑事妥协——纪德

分享个前端的`JSON.stringify`以及`parse`小技巧

MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON

例如我们此处使用`JSON.stringify({name:'VampireAchao',age:21})`可以将对象转为`json`

![image-20221121131127541](/imgs/oss/picGo/image-20221121131127541.png)

如果我们只想要`name`值，则可以传入第二个参数，可以接受一个数组类型

```javascript
JSON.stringify({name:'VampireAchao',age:21},['name'])
```

转出来则是`'{"name":"VampireAchao"}'`

如果我们要自定义规则，则可以传入一个函数类型，第一次调用时`value`为我们的数据对象，属于由外向内调用

```javascript
let times = 0;
const json = JSON.stringify({name:'VampireAchao',age:21},(key, value) =>{
    console.log(++times)
    console.table({key,value})
    if(typeof value === 'object'||
       Array.isArray(value)){
        return value
    }
    if(typeof value !== 'string'){
        return undefined
    }
    return value
})
console.log(json)
```

效果如下：

![image-20221121131644604](/imgs/oss/picGo/image-20221121131644604.png)

如果我们需要`json`之间来点美观的间距，则可以传入第三个参数

```javascript
JSON.stringify({name:'VampireAchao',age:21},null,'\t')
```

![image-20221121132105233](/imgs/oss/picGo/image-20221121132105233.png)

`JSON.parse`就不再赘述了，也可以支持第二个参数，但属于由内向外调用

```javascript
let times = 0;
JSON.parse('{"name":"VampireAchao","age":21}',(key,value)=>{
   console.log(++times)
    console.table({key,value})
    if(typeof value === 'object'||
       Array.isArray(value)){
        return value
    }
    if(typeof value !== 'string'){
        return undefined
    }
    return value
})
```

![image-20221121132600081](/imgs/oss/picGo/image-20221121132600081.png)