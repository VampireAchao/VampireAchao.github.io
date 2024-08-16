---
title: js获取元素相对于document的坐标
date: 2023-01-20 19:22:00
tags: 前端
---

> 孤独没有什么不好。使孤独变得不好，是因为你害怕孤独。——《孤独六讲》

代码如下：

```javascript
const getOffset = el => {
    const { left, top } = el.getBoundingClientRect()
    const { scrollTop, scrollLeft } = document.body
    return { top: top + scrollTop, left: left + scrollLeft }
}
```

使用：

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<div style="display: flex;align-items:center;justify-content:center;width: 100vw;height: 100vh;">
    <div id="ruben" style="width: 100px;height: 100px;background-color: red;"></div>
</div>

<body>
    <script type="application/javascript">
        const getOffset = el => {
            const { left, top } = el.getBoundingClientRect()
            const { scrollTop, scrollLeft } = document.body
            return { top: top + scrollTop, left: left + scrollLeft }
        };
        window.onresize = e => {
            console.table(getOffset(document.getElementById('ruben')))
        }
    </script>
</body>

</html>
```

我们拖动窗口大小

![image-20230120193319266](/imgs/oss/picGo/image-20230120193319266.png)