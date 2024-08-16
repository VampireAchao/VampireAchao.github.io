---
title: 让link标签失效
date: 2021-11-09 18:19:26
tags: 前端
---

> 此岸永远是残缺的，否则彼岸就要塌陷。——史铁生

一直有小伙伴吐槽我的博客太花哨了，想让我加个隐藏主题功能，于是我就加了一个

![image-20211109182029739](/imgs/oss/picGo/image-20211109182029739.png)

这里用到了`jquery`选择带对应属性的标签

我这里是让引入`style.css`的`link`标签失效了

关键代码如下：

隐藏

```javascript
<!-- 选中head节点，找到href属性为'/css/style.css'的link标签，添加属性disabled为disabled -->
$("head").children("link[href='/css/style.css']").attr('disabled', 'disabled')
```

显示：

```javascript
<!-- 移除该属性 -->
$("head").children("link[href='/css/style.css']").removeAttr('disabled')
```

