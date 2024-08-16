---
title: jq获取实时宽度
date: 2021-05-19 23:10:44
tags: 前端
---

> 乐观使你倾向于幸福健康事业顺利，悲观使你倾向于绝望患病失败忧郁孤独懦怯——民谚

代码如下

```javascript
$(window).resize(() => {
    var height = $(window).height();
    var width = $(window).width();
    console.log(height+" "+width)
});
```

![image-20210519231250416](/imgs/oss/picGo/image-20210519231250416.png)

然后当我窗口大小发生变化时就会触发

![image-20210519231351976](/imgs/oss/picGo/image-20210519231351976.png)
