---
title: Promise
date: 2021-12-04 21:21:51
tags: 前端
---

> 人活在世，不过一场美丽的寄居。——简嫃

在前端开发中经常会使用异步方法

这里介绍`Promise`函数

定义方式：

```javascript
// Promise内部构造参数为一个闭包，闭包中传入你想要异步处理的逻辑
new Promise((resolve,reject)=>{
    // 这里resolve表示正常处理异步逻辑后传送回调，reject则是异常逻辑或错误逻辑时执行，当异步方法中抛出异常，会自动调用reject，这里也可以手动调用
    resolve(1)
})
```

然后定义完了，我们就可以开始调用

调用写法如下：

```javascript
new Promise((resolve,reject)=>{
    // 假设我这里异步方法处理完后得到的结果为1，我就传入一个1
    resolve(1)
})
.then(res=>{
    // 然后异步方法执行完了，我再对结果进行异步处理，让得到的1再加一个1
    console.log(res+1)
})
```

使用`then`可以执行异步方法后续处理，将异步方法的回调的结果作为参数

这里执行后就会打印`2`

如果发生异常，我们想进行异常处理，则可以使用`catch`处理，例如下面例子

```javascript
new Promise((resolve,reject)=>{
    // 手动抛出异常
    throw new Error("ruben")
    resolve(1)
})
.then(res=>{
    console.log(res+1)
}).catch(error=>{
    console.log(error)
})
```

打印结果为`ruben`

![image-20211204215228205](/imgs/oss/picGo/image-20211204215228205.png)

我们也可以用另一种写法：

```javascript
new Promise((resolve,reject)=>{
    throw new Error("ruben")
    resolve(1)
    
})
// 这里在then中传入两个闭包，第二个则相当于`catch`函数的参数
.then(res=>{
    console.log(res+1)
},error=>{
    console.log(error)
})
```

如果我们对于`Promise`要让他同步处理，也就是说我要等他执行完再执行后面的逻辑，可以在前面加一个`await`

```javascript
await new Promise((resolve,reject)=>{
    throw new Error("ruben")
    resolve(1)
    
})
.then(res=>{
    console.log(res+1)
},error=>{
    console.log(error)
})
```

