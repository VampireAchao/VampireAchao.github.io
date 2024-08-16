---
title: js数组去重
date: 2022-01-27 16:07:11
tags: 前端
---

> 最大的挑战和突破在于用人，而用人最大的突破在于信任人。——马云

我们使用数组解构+`Set`去重：

```javascript
let list = [1,1,2,3]
list = [...new Set(list)]
```

![image-20220127161005947](/imgs/oss/picGo/image-20220127161005947.png)

这里`set`是一个不重复的集合类，构造函数中我们传入了另一个`list`

如果是两个数组去重

```javascript
let list = [1,2,3]
let array = [2,3]
list = [...new Set([...list,...array])]
```

写法如下：

![image-20220127161231790](/imgs/oss/picGo/image-20220127161231790.png)