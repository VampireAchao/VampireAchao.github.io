---
title: live2d看板娘之自定义网站篇
date: 2020-12-25 22:06:27
tags: 前端
---

> 失去信用而赚的钱应结算在损失里。——罗马

![image-20201225221038842](/imgs/oss/picGo/image-20201225221038842.png)

通过这篇[文档](https://docs.paul.ren/pio/#/)配置

首先我们下载项目：[项目地址](https://github.com/Dreamer-Paul/Pio.git)

然后复制到我们项目中

![image-20201225221235628](/imgs/oss/picGo/image-20201225221235628.png)

创建页面并放入代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- 引用看板娘交互所需的样式表 -->
    <link href='Pio/static/pio.css' rel='stylesheet' type='text/css'/>
</head>
<body>
<div class="pio-container left">
    <div class="pio-action"></div>
    <canvas id="pio" width="350" height="350"></canvas>
</div>
<!-- 引用 Live2D 核心组件 -->
<script src='Pio/static/l2d.js'></script>
<!-- 引用看板娘交互组件 -->
<script src='Pio/static/pio.js'></script>
<script>
    var pio = new Paul_Pio({
        "mode": "fixed",
        "hidden": true,
        "content": {
            "welcome": ["欢迎来到保罗的小宇宙！", "今天天气不错，一起来玩吧！", "博主每天都有些折腾记录，欢迎前往他的小窝阅读~"],
            "custom": [
                {"selector": ".comment-form", "text": "欢迎参与本文评论，别发小广告噢~"},
                {"selector": ".home-social a:last-child", "text": "在这里可以了解博主的日常噢~"},
                {"selector": ".post-item a", "type": "read"},
                {"selector": ".post-content a, .page-content a", "type": "link"}
            ]
        },
        "night": "single.night()",
        "model": ["Pio/models/pio/model.json"]
    });

</script>
</body>
</html>
```

然后打开页面就能看到效果啦

![image-20201225221556851](/imgs/oss/picGo/image-20201225221556851.png)

更多配置还是看[文档](https://docs.paul.ren/pio/#/)吧~这里只做一个简单的指路

