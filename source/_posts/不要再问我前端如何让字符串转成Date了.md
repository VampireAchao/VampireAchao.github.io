---
title: 不要再问我前端如何让字符串转成Date了
date: 2021-04-29 11:57:18
tags: 前端
---

> 生活就像一盒巧克力，你永远不知道你会得到什么。——《阿甘正传》

那天有朋友问我`yyyy-MM-dd'T'HH:mm:ss.SSSZ`怎么转成`yyyy-MM-dd HH:mm:ss`，我就给他了我[这篇博客](https://VampireAchao.github.io/2021/04/15/js%E6%97%A5%E6%9C%9F%E3%80%81%E7%BB%8F%E7%BA%AC%E5%BA%A6%E6%A0%BC%E5%BC%8F%E5%8C%96/)

结果他说看完还是不会。。。

那我今天再讲一次吧

首先，我们拿到一个字符串`2018-05-23T16:05:52+08:00`

很多程序员看到了就不知道如何下手了

我们理清思路：

1.将字符串转换成`js`中的`Date`对象

2.调用`Date`对象中的函数转换为我们想要的格式

我们首先调用`Date`的构造方法

```js
    var a = "2018-05-23T16:05:52+08:00"
    console.log(a)
    var date = new Date(a);
    console.log(date)
```

可以看到我们的`date`确实转成功了

当然，除了这种格式的日期字符串

还可以支持很多格式

![image-20210430132755188](/imgs/oss/picGo/image-20210430132755188.png)

以及我们的时间戳

![image-20210430132830387](/imgs/oss/picGo/image-20210430132830387.png)

如果这些格式都不能满足你

还有一招：按照

```javascript
new Date(年,月,日,时,分,秒,毫秒)
```

的格式去转换，注意月这里需要减一

![image-20210430133444622](/imgs/oss/picGo/image-20210430133444622.png)

同上，也支持省略写法

![image-20210430133556780](/imgs/oss/picGo/image-20210430133556780.png)

有朋友说，诶我这个是个字符串，我怎么取出里面的年月日呢？

这个可以根据具体情况具体分析，例如我是中文的这种`2018年5月23日16时05分52秒`

我们通过`String`的`split`函数，使用正则去匹配分隔成数组，然后再传入进去

```
var a = '2018年5月23日16时05分52秒'.split(/[^0-9]/)
console.log(a)
new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
```

![image-20210430133744301](/imgs/oss/picGo/image-20210430133744301.png)

好！！！终于我们完成了第一步

第二步就是转成字符串。。。

```javascript
var dateUtils = {
        // 将Date对象格式化为"yyyy-mm-dd HH:MM:ss"格式
        format: function (date) {
            var _format = function (number) {
                return (number < 10 ? ('0' + number) : number);
            };
            return date.getFullYear() + '-' + _format(date.getMonth() + 1) + '-' + _format(date.getDate()) +
                ' ' +
                _format(date.getHours()) + ':' + _format(date.getMinutes()) + ':' + _format(date.getSeconds());
        }
    }
dateUtils.format(new Date())
```

![image-20210430134141981](/imgs/oss/picGo/image-20210430134141981.png)

这里调用了很多`Date`里的函数，在[之前这篇博客](https://VampireAchao.github.io/2021/01/10/jsDate%E5%AF%B9%E8%B1%A1%E5%9F%BA%E6%9C%AC%E6%93%8D%E4%BD%9C/)是列出了几乎全部的`api`。。。

如果还有人不会日期和字符串任意转换。。。祥林嫂，你放着罢！
