---
title: 简单CSS实现图片旋转
date: 2020-08-25 18:50:33
tags: 前端
---

图片旋转~

![image-20200825185130320](/imgs/oss/picGo/image-20200825185130320.png)

代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        img {
            width: 200px;
            height: auto;
            margin: 20% auto;
            animation: myrotate 3s linear infinite;
            -webkit-animation: myrotate 3s linear infinite;
        }

        @keyframes myrotate {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        @-webkit-keyframes myrotate {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>

<body>
    <img src="./img/dark.jpg">
</body>

</html>
```

