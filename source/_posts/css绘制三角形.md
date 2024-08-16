---
title: css绘制三角形
date: 2023-02-24 20:23:19
tags: 前端
---

> 青年时鲁莽，老年时悔恨——富兰克林

代码如下：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .triangle {
            width: 0;
            height: 0;
            border-left: 50px solid transparent;
            border-right: 50px solid transparent;
            border-bottom: 100px solid red;
        }
    </style>
</head>

<body>
    <div class="triangle"></div>
</body>

</html>
```

效果如下：

![image-20230224205342476](/imgs/oss/blog/vampireachao/image-20230224205342476.png)

如果我们需要让三角形的箭头朝右，可以给一个旋转属性

```css
.triangle {
    width: 0;
    height: 0;
    border-left: 50px solid transparent;
    border-right: 50px solid transparent;
    border-bottom: 100px solid red;
    transform: rotate(90deg);
}
```

效果

![image-20230224205459189](/imgs/oss/blog/vampireachao/image-20230224205459189.png)

