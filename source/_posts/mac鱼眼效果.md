---
title: mac鱼眼效果
date: 2022-05-23 12:55:13
tags: 前端
---

> 人不能象走兽那样活着，应该追求知识和美德。——但丁

上代码，上效果：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
        }

        #wrapper {
            position: absolute;
            bottom: 0;
            text-align: center;
            width: 100%;
        }

        #wrapper>img {
            border-radius: 50%;
        }
    </style>
</head>

<body>

    <div id="wrapper">
        <img src="/imgs/oss/2020-06-01/head.jpg" width="64">
        <img src="/imgs/oss/2020-06-01/head.jpg" width="64">
        <img src="/imgs/oss/2020-06-01/head.jpg" width="64">
        <img src="/imgs/oss/2020-06-01/head.jpg" width="64">
        <img src="/imgs/oss/2020-06-01/head.jpg" width="64">
    </div>
    <script>


        window.onload = function () {
            document.onmousemove = function (ev) {
                var oevent = ev || event;
                var aimg = document.getElementsByTagName('img');
                var odiv = document.getElementById('wrapper');
                for (var i = 0; i < aimg.length; i++) {
                    var x = aimg[i].offsetLeft + aimg[i].offsetWidth / 2;
                    var y = aimg[i].offsetTop + odiv.offsetTop + aimg[i].offsetHeight / 2;
                    var a = x - oevent.clientX;
                    var b = y - oevent.clientY;
                    var dis = parseInt(Math.sqrt(a * a + b * b));
                    var scale = 1 - dis / 200;
                    if (scale < 0.5) {
                        scale = 0.5;
                    }
                    aimg[i].width = scale * 128;
                }
            }
        }

    </script>
</body>

</html>
```

效果：

![fisheye](/imgs/oss/picGo/fisheye.gif)