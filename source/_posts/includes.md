---
title: includes
date: 2022-02-15 20:51:18
tags: 前端
---

> 一个人能在鼠疫和生活的赌博中所赢得的全部东西，就是知识和记忆。——《鼠疫》

我们除了使用`indexOf`判断**字符串/数组**是否包含某**字符/元素**还可以使用`includes`

区别在于数组判断中`indexOf`对`NaN`值处理会错误，而`includes`不会，例如：

![image-20220215212309697](/imgs/oss/picGo/image-20220215212309697.png)

这里显示`-1`说明没有匹配到

而使用`includes`：

![2022](/imgs/oss/picGo/image-20220215212336884.png)

可以看到成功匹配

字符串也可以使用`includes`

![image-20220215213535686](/imgs/oss/picGo/image-20220215213535686.png)

非常的方便

我们可以用`prototype`获取原型对象然后再调用

```javascript
 Array.prototype.includes.call([1,2,3,4],1)
```

还是蛮方便的