---
title: js find函数
date: 2021-05-01 17:09:22
tags: 前端
---

> 人的一生是短的，但如果卑劣地过这一生，就太长了——莎士比亚

在前端开发中，可能会有“需要从数组里取出符合条件的某条数据”这个需求

我们可以使用`find`函数

```javascript
var list = [1,4,3,2,5];
console.log(list.find(n=>n===4)) 	// 输出结果4，取出满足条件的值
var index = list.findIndex(n=>n===4)		// index = 1，取出满足条件的值的下标
```

这样就从我们的`list`数组中取出了满足`n===4`这个条件的值