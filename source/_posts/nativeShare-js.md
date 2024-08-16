---
title: nativeShare.js
date: 2024-06-30 13:42:51
tags: 前端
---

> 进步是人的生活方式。——雨果

分享一个

https://github.com/JefferyWang/nativeShare.js

这个库是王俊锋写的，用于h5直接唤醒浏览器的分享

- 注意:目前仅支持手机UC浏览器和QQ浏览器

nativeShare
======

nativeShare是一个可以通过javascript直接调用原生分享的工具.  [demo](http://blog.wangjunfeng.com/demo/native_share/)

我们知道现在我们无法直接通过js直接跳转到微信和QQ等软件进行分享,但是现在像UC浏览器和QQ浏览器这样的主流浏览器自带一个分享工具,而他们也有自己定义的js接口.我们通过调用浏览器的接口去调用浏览器的分享,从而实现原生分享功能.是不是很酷呢?

该工具具有以下特点:

* 支持原生微博、微信好友、微信朋友圈、QQ好友、QQ空间分享

* 支持调用浏览器更多分享功能

* 注意:目前仅支持手机UC浏览器和QQ浏览器

github项目地址:  [https://github.com/JefferyWang/nativeShare.js](https://github.com/JefferyWang/nativeShare.js)

Git@OSC项目地址:  [http://git.oschina.net/wangjunfeng/nativeShare.js](http://git.oschina.net/wangjunfeng/nativeShare.js)

使用方法
--------------------

* 引入CSS文件

```html
<link rel="stylesheet" href="nativeShare.css"/>
```

* 在需要放分享的地方插入以下代码

```html
<div id="nativeShare"></div>
```

* 添加配置,并实例化

```javascript
<script>
    var config = {
        url:'http://blog.wangjunfeng.com',// 分享的网页链接
        title:'王俊锋的个人博客',// 标题
        desc:'王俊锋的个人博客',// 描述
        img:'http://www.wangjunfeng.com/img/face.jpg',// 图片
        img_title:'王俊锋的个人博客',// 图片标题
        from:'王俊锋的博客' // 来源
    };
    var share_obj = new nativeShare('nativeShare',config);
</script>
```
