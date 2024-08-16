---
title: jq根据屏幕高度设置元素高度
date: 2021-10-18 22:39:16
tags: 前端
---

> 没有哪一个聪明人会否定痛苦与忧愁的锻炼价值——赫胥黎

很简单一行代码：

```javascript
$('#ruben').css('height', $(window).height());
```

这里`$(window).height()`获取了屏幕高度

然后用`css`函数去设置`style`

