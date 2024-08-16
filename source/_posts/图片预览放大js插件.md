---
title: 图片预览放大js插件
date: 2020-07-19 21:35:07
tags: 前端
---

分享一个非常简单的图片预览插件<code>viewer</code>

![image-20200719214433290](/imgs/oss/picGo/20200719214433.png)

首先引入<code>js</code>和<code>css</code>

<code>viewer.js</code>:[下载链接](/imgs/oss/picGo/viewer.js)

<code>jquery1.11.3.js</code>:[下载链接](/imgs/oss/picGo/jquery-1.11.3.min.js)

<code>jquery-viewer.min.js</code>:[下载链接](/imgs/oss/picGo/jquery-viewer.min.js)

<code>viewer.css</code>:[下载链接](/imgs/oss/picGo/viewer.css)

然后引入

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{路径}/viewer.css" rel="external nofollow" rel="external nofollow">
    <script src="{路径}/jquery-1.11.3.min.js"></script>
    <script src="{路径}/viewer.js"></script>
    <script src="{路径}/jquery-viewer.min.js"></script>
</head>
```

使用方式：

```html
<body>
    <!-- 需要一个块级容器 -->
    <div>
        <img id="image" src="http://p16.qhimg.com/bdm/960_593_0/t01ba97d26345750c04.jpg" alt="Picture">
    </div>

    <div>
        <ul id="images">
            <li><img src="http://p7.qhimg.com/bdm/960_593_0/t01b32959885c781013.jpg" alt="Picture 1"></li>
            <li><img src="http://p19.qhimg.com/bdm/480_296_0/t01bf50d8d5d76238c6.jpg" alt="Picture 2"></li>
            <li><img src="http://p18.qhimg.com/bdm/960_593_0/t0177a850faae7b42f4.jpg" alt="Picture 3"></li>
        </ul>
    </div>
</body>
<script type="text/javascript">
    var $image = $('#image');
    $image.viewer({
        //行内显示（默认初始化）
        inline: false,
        viewed: function () {
            //缩放等级（1倍)
            $image.viewer('zoomTo', 1);
        }
    });
    // 初始化后获取Viewer.js实例
    var viewer = $image.data('viewer');
    // 查看图像列表
    $('#images').viewer();
</script>
```

项目文档：[链接](https://github.com/fengyuanchen/jquery-viewer)