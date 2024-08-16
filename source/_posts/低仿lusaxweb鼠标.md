---
title: 低仿lusaxweb鼠标
date: 2022-12-15 18:33:44
tags: 前端
---

> 幸福的婚姻生活，往往会被卑鄙的勾当、阴险的猜忌所破坏。——莎士比亚

这是 http://lusaxweb.net/

它的鼠标很有意思，是一个圈，能够反色，我们低仿一个

代码如下：

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        * {
            margin: 0;
            padding: 0;
            cursor: none;
        }

        .img {
            height: 80vh;
            width: 80vw;
            overflow: hidden;
        }

        .img:hover~#cursor-pointer {
            background-color: white;
        }

        #cursor-circle {
            pointer-events: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid black;
            background: white;
            mix-blend-mode: exclusion;
            position: absolute;
            transition: .1s all;
        }

        #cursor-pointer {
            pointer-events: none; 
            width: 4px;
            height: 4px;
            border-radius: 50%;
            position: absolute;
            background-color: black;
        }
    </style>
</head>

<body>
    <div class="container">
        <img class="img" src="https://VampireAchao.github.io/imgs/preview/3131_3.jpg" />
        <div id="cursor-circle"></div>
        <div id="cursor-pointer"></div>
    </div>
    <script>
        const cursorCircle = document.querySelector("#cursor-circle")
        const cursorPointer = document.querySelector("#cursor-pointer")
        window.addEventListener('mousemove', e => {
            cursorPointer.style.top = document.documentElement.scrollTop + e.clientY - 1 + 'px'
        cursorPointer.style.left = document.documentElement.scrollLeft + e.clientX - 1 + 'px'
        cursorCircle.style.top = document.documentElement.scrollTop + e.clientY - 12 + 'px'
        cursorCircle.style.left = document.documentElement.scrollLeft + e.clientX - 12 + 'px'
        })
    </script>
</body>

</html>
```

效果如下：

<div>
<html>
<head>
    <style>
        * {
            margin: 0;
            padding: 0;
            cursor: none;
        }
        .img {
            height: 80vh;
            width: 80vw;
            overflow: hidden;
        }
        .img:hover~#cursor-pointer {
            background-color: white;
        }
        #cursor-circle {
            pointer-events: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid black;
            background: white;
            mix-blend-mode: exclusion;
            position: absolute;
            transition: .1s all;
        }
        #cursor-pointer {
            pointer-events: none; 
            width: 4px;
            height: 4px;
            border-radius: 50%;
            position: absolute;
            background-color: black;
        }
    </style>
</head>
<body>
    <div class="container">
        <img class="img" src="https://VampireAchao.github.io/imgs/preview/3131_3.jpg" />
        <div id="cursor-circle"></div>
        <div id="cursor-pointer"></div>
    </div>
    <script>
        const cursorCircle = document.querySelector("#cursor-circle")
        const cursorPointer = document.querySelector("#cursor-pointer")
        window.addEventListener('mousemove', e => {
            cursorPointer.style.top = document.documentElement.scrollTop + e.clientY - 1 + 'px'
        cursorPointer.style.left = document.documentElement.scrollLeft + e.clientX - 1 + 'px'
        cursorCircle.style.top = document.documentElement.scrollTop + e.clientY - 12 + 'px'
        cursorCircle.style.left = document.documentElement.scrollLeft + e.clientX - 12 + 'px'
        })
    </script>
</body>
</html>
</div>

