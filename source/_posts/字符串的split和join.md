---
title: 字符串的split和join
date: 2020-08-22 18:52:54
tags: 前端
---

> split()	将字符串拆分成数组
>
> join()	将数组合并
>
> 参数为分隔符

两套代码

```javascript
        #JavaScript
        var str = "ruben";
        var array = str.split('');
        array.forEach(s => console.log(s));
        str = array.join('');
        console.log(str);
```

以及

```java
        //java
        String str = "ruben";
        String[] array = str.split("");
        for (String s : array) {
            System.out.println(s);
        }
        str = String.join("", array);
        System.out.println(str);
```

