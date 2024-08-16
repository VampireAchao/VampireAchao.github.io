---
title: 兼容IE浏览器
date: 2020-08-24 19:23:40
tags: 前端
---

今天客户说他那边网站崩了，让客户截了个图，看到是ie浏览器。。。我瞬间的反应是崩溃的

![img](/imgs/oss/picGo/u=2875998715,2584614526&fm=175&s=69603A620A133FE75C1C049A0100C091&w=500&h=281&img.JPEG)

所以才有了这篇博客

这里分享一个小工具，能把`ES6`语法转成`IE`支持的语法

使用方式很简单

解压，用`vscode`打开

![image-20200824193551606](/imgs/oss/picGo/image-20200824193551606.png)

控制台输入`cnpm i`

![image-20200824193613430](/imgs/oss/picGo/image-20200824193613430.png)

然后把你的js文件放到src\js下面

![image-20200824193700474](/imgs/oss/picGo/image-20200824193700474.png)

转换前是这样的

![image-20200824193953179](/imgs/oss/picGo/image-20200824193953179.png)

我们`npm run build`一遍

可以看到我们的`dist`目录下面已经生成了转换好的`js`了

![image-20200824194220769](/imgs/oss/picGo/image-20200824194220769.png)

`2020`年，竟然还有人用`IE`。。。

[下载链接](/imgs/oss/picGo/ie.zip)

