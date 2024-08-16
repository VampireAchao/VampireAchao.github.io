---
title: live server
date: 2022-02-27 11:01:08
tags: 软件及插件
---

> 用杜冷丁救场，药效却消亡。——《恋爱的犀牛》
>

在使用`vscode`进行开发的时候，我想运行一个`html`文件到浏览器中并热更新，就需要使用到`Live Server`插件了

![image-20220227110240127](/imgs/oss/picGo/image-20220227110240127.png)

在`vscode`安装完成该插件后，即可在`html`页面按下`ALT+L`再按一下`ALT+O`即可运行到浏览器

按下第一个键后会提示

![image-20220227110921115](/imgs/oss/picGo/image-20220227110921115.png)

再次按下`ALT+O`，即可运行到浏览器

我们查看元素是能看到我们的`Live Server`建立`socket`连接代码的

![image-20220227111447424](/imgs/oss/picGo/image-20220227111447424.png)

包括我们在`vscode`保存了一下代码，也是能看到`ws`请求的

![image-20220227111659679](/imgs/oss/picGo/image-20220227111659679.png)