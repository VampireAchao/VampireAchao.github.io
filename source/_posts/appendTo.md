---
title: appendTo
date: 2021-06-04 21:47:38
tags: 前端
---

> 人类经常把一个生涯发生的事，撰写成历史，在从那里看人生；其实，那不过是衣服，人生是内在的——罗曼。罗兰

我们可以使用`jquery`中的`appendTo`函数在一个标签追加到另一个标签内部的结尾

例如我博客这里

![image-20210604215620555](/imgs/oss/picGo/image-20210604215620555.png)

我们再执行

```javascript
$("<span>ruben</span>").appendTo(".navbar-brand")
```

执行完成后效果如下

![image-20210604215736281](/imgs/oss/picGo/image-20210604215736281.png)

`<span>ruben</span>`追加到我们的"阿超"后面了
