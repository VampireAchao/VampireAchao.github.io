---
title: js打字机动画效果实现
date: 2020-11-23 20:58:39
tags: 前端
---

> 坦白使人心地轻松的妙药。——西塞罗

实现打字机效果

![](/imgs/oss/picGo/QQ%E5%BD%95%E5%B1%8F20201123210112.gif) 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .d1 {
            width: 100%;
            height: 600px;
            background: #000;
            position: relative;
        }

        .zhezhao {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .zhezhao {
            background: rgba(0, 0, 0, .1);
        }

        .font {
            position: absolute;
            top: 0;
            left: 140px;
            bottom: 0;
            margin: auto 0;
            font-size: 55px;
            height: 70px;
            width: max-content;
            color: #fff;
            z-index: 2;
            text-align: left;
        }

        .font::after {
            content: '';
            display: inline-block;
            width: 2px;
            height: 100%;
            background: #fff;
            position: absolute;
            top: 0;
            right: -5px;
            animation: dh .8s ease-in-out infinite;
        }

        @keyframes dh {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    </style>
</head>
<body>
<div class="d1">
    <div class="zhezhao"></div>
    <div class="font">
    </div>
</div>
<script>
    var arr = ['测试1111', '测试22222', '测试333333', '测试444444', '测试5555555']
    var index = 0
    var i = 0
    var str2 = ''
    var time1, time2
    var font = document.getElementsByClassName('font')[0]

    function add(index) {
        str2 = this.str.slice(0, index)
        console.log(str2)
        font.innerHTML = str2
        if (index <= this.str.length) {
            setTime('add', 170)
        } else {
            clearTimeout(time1)
            setTime('reduce', 1000)
        }
    }

    function reduce(index) {
        str2 = this.str.slice(0, index)
        font.innerHTML = str2
        if (index > 0) {
            setTime('reduce', 50)
        } else {
            index = 0
            clearTimeout(time1)
            if (i < arr.length - 1) {
                i++
            } else i = 0
            change(i)
        }
    }

    // 定时器
    function setTime(type, time) {
        var that = this
        time1 = setTimeout(function () {
            if (type == 'add') {
                index++
                add(index)
            } else {
                index = index > 0 ? index - 1 : 0
                reduce(that.index)
            }
        }, time);
    }

    function change(i) {
        if (i < arr.length) {
            this.str = arr[i]
            add(index)
        }
    }

    change(0)
</script>

</body>
</html>
```

