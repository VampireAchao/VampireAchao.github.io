---
title: for of和for in
date: 2022-01-13 19:30:32
tags: 前端
---

> 人生而自由，却无往不在枷锁中——卢梭《社会契约论》

我之前写过一篇[`for in`的博客](https://VampireAchao.github.io/2020/08/19/js%E4%BD%BF%E7%94%A8for-in%E5%8F%96%E5%8A%A8%E6%80%81key%E5%8F%82%E6%95%B0/)

`for in`是遍历对象`key`或者数组下标

前端还可以使用`for of`来遍历`value`

简单写一下两者区别和使用方式吧：

```javascript
let ruben = {name:'ruben', age:21}
for(key in ruben) console.log(key)
```

![image-20220113194249310](/imgs/oss/picGo/image-20220113194249310.png)

然后是`for of`

![image-20220113194336220](/imgs/oss/picGo/image-20220113194336220.png)

提示对象并不是`iterable`(可迭代的)

因此`for of`并不能遍历对象的`key`

接下来看数组的：

```javascript
let list = [1,2,3,4,5,6]
for(i in list) console.log(i)
```

![image-20220113194553899](/imgs/oss/picGo/image-20220113194553899.png)

可以看到是遍历获取出了下标并不是实际的值

而`for of`：

```javascript
let list = [1,2,3,4,5,6]
for(i of list) console.log(i)
```

![image-20220113194700311](/imgs/oss/picGo/image-20220113194700311.png)

遍历出了我们的`value`
