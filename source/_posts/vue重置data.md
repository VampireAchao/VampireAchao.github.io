---
title: vue重置data
date: 2022-12-23 13:57:23
tags: 前端
---

> 没有爱情，可千万不要结婚——奥斯汀

场景：需要重置已经更改后的`data`

官方文档：

https://v2.cn.vuejs.org/v2/api/#data

其中提到可以通过调用`data`函数得到一个全新的副本对象

![image-20221223140008211](/imgs/oss/picGo/image-20221223140008211.png)

https://v2.cn.vuejs.org/v2/api/#vm-options

然后我们可以通过`$options`获取用于当前 Vue 实例的初始化选项，因此通过

```javascript
this.$options.data()
```

能够得到最初定义`data`的一个全新的副本对象(这里的`this`指向`vue`实例)

再使用`Object.assign`

```javascript
Object.assign(this.$data, this.$options.data())
```

即可重置`data`

在某些情况下，`this.$options.data()`的`this`指向有问题，可以使用

`Function.prototype.call()`处理

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call

例如

```javascript
Object.assign(this.$data, this.$options.data.call(this))
```

