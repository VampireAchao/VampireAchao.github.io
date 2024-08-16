---
title: jquery跳转页面指定元素位置
date: 2021-05-21 22:27:44
tags: 前端
---

> 懒惰象生锈一样，比操劳更能消耗身体;经常用的钥匙，总是亮闪闪的。——富兰克林

代码如下

```javascript
		// 获取到jquery节点
        var targetDom = $('#achao')
        // 获取x坐标
        var x = targetDom.offset().top;
        // 获取y坐标
        var y = targetDom.offset().left;
        // 页面800ms内跳转到x坐标-200的地方
        $('html,body').animate({scrollTop: x-200}, 800);
```

