---
title: 'display:contents'
date: 2022-05-17 13:07:48
tags: 前端
---

> 多少人以友谊的名义，爱着一个人。——电影《One Day》

`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/CSS/display-box

首先是一段代码：

```html
<!DOCTYPE html>
<head>
    <title>display</title>
    <style>
        .outer {
            border: 2px solid red;
            width: 300px;
        }
        .outer>div {
            border: 1px solid green;
        }
    </style>
</head>

<body>
    <div class="outer">
        <div>Inner div.</div>
    </div>
</body>
```

渲染效果为：

![image-20220517131051792](/imgs/oss/picGo/image-20220517131051792.png)

当我们给外部的`outer`添加一个`display:contents;`

```html
<!DOCTYPE html>
<head>
    <title>display</title>
    <style>
        .outer {
            border: 2px solid red;
            width: 300px;
            display: contents;
        }
        .outer>div {
            border: 1px solid green;
        }
    </style>
</head>

<body>
    <div class="outer">
        <div>Inner div.</div>
    </div>
</body>
```

可以看到外部的元素消失，只保留了子元素