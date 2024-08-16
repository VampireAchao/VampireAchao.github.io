---
title: js阻止默认事件踩坑
date: 2023-08-25 19:53:34
tags: 前端
---

> 人这种卑鄙的东西，什么都会习惯的。——陀思妥耶夫斯基《罪与罚》

今天遇到一个问题，我想阻止浏览器默认的滚动事件，却阻止不了还一直报错

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div style="height: 2000px;background:#888">

    </div>
    <script>
        document.addEventListener('wheel', e => {
            e.preventDefault()
        })
    </script>
</body>

</html>
```

![](/imgs/oss/picGo/20230825195517.png)

此处在`addEventListener`中添加一个参数``{ passive: false }

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div style="height: 2000px;background:#888">

    </div>
    <script>
        document.addEventListener('wheel', e => {
            e.preventDefault()
        }, { passive: false })
    </script>
</body>

</html>
```

即可解决
