---
title: display:block小技巧
date: 2022-10-31 13:55:04
tags: 前端
---

> 成功之道，在于你为获得成功所做出的积极努力，而不在于预先就衡量这种成功的价值——哈里特

分享一个小技巧

`display:block`

可以将`style`标签可见

例如：

```html
<body>
    <style contenteditable style="display: block;white-space: pre">
        * {
            transition: all 0.2s
        }

        html {
            background: #ff00ff;
            font-size: 16px
        }

    </style>
</body>
```

![image-20221031140550718](/imgs/oss/picGo/image-20221031140550718.png)

因为我们这里给了`contenteditable`

所以可以直接在页面上编辑

![image-20221031140703924](/imgs/oss/picGo/image-20221031140703924.png)

试试吧

<div>
    <style contenteditable style="display: block;white-space: pre">
    * {
        transition: all 0.2s
      }
    html {
        background: #ff00ff;
        font-size: 16px
      }
    </style>
</div>

