---
title: js中json与对象互转
date: 2021-05-18 11:12:57
tags: 前端
---

> 人生要有意义只有发扬生命，快乐就是发扬生命的最好方法。——张闻天

如题

首先是`json`字符串转对象

```javascript
JSON.parse("{\"id\":\"ddd\"\}")
```

得到的结果就是对象啦

![image-20210518111342495](/imgs/oss/picGo/image-20210518111342495.png)

然后是对象转`json`字符串

```javascript
JSON.stringify({id:"ddd"})
```

非常简单

![image-20210518111416525](/imgs/oss/picGo/image-20210518111416525.png)
