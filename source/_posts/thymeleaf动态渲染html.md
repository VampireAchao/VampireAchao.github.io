---
title: thymeleaf动态渲染html
date: 2022-01-21 16:13:46
tags: java
---

> 君子忍人所不能忍，容人所不能容，处人所不能处。——邓拓

我们可以使用`thymeleaf`进行动态渲染`html`内容

假设我的整个页面都是字符串，例如如下格式：

```java
	"<!DOCTYPE html>\n" +
    "<html>\n" +
    "    <head>\n" +
    "        <meta charset=\"utf-8\">\n" +
    "        <title></title>\n" +
    "    </head>\n" +
    "    <body>\n" +
    "    </body>\n" +
    "</html>"
```

那我们渲染的话，其实可以直接新建一个页面，用`[(${page})]`语法，例如

```html
[(${articleText})]
```

![image-20220121164125594](/imgs/oss/picGo/image-20220121164125594.png)

这里`articleText`就是我们后端`setAttribute`进去的

然后就能成功渲染页面上去