---
title: js函数防抖
date: 2020-09-01 20:06:55
tags: 前端
---

之前写了一篇[javascript防抖](https://VampireAchao.github.io/2020/08/04/javascript防抖/)是应用在按钮中的

今天继续完善一下,下面的函数`ruben`就算循环10亿次，一秒内也会只调用一次

```javascript
var antiShakeFlag = false;
        function ruben() {
            if (antiShakeFlag) {
                return;
            }
            console.log("ruben")
            antiShakeFlag = true;
            setTimeout(() => {
                antiShakeFlag = false;
            }, 1000);
        }
        for (let i = 0; i < 10; i++) {
            console.log("achao")
            ruben();
        }
```

另外做点补充吧，再分享一个`some`函数，用于判断数组内是否有元素满足某条件的

判断数组中是否有元素包含`y`

`judge`判断数组中是否有元素包含`z`

```javascript
var names = ['ruben', 'achao', 'zhangsan'];
        var result = names.some(name => name.indexOf("y") != -1)
        console.log(result)
        
        function judge(value) {
            return value.indexOf("z") != -1;
        }
        result = names.some(judge);
        console.log(result)
```

输出结果

![image-20200901212401099](/imgs/oss/picGo/image-20200901212401099.png)

