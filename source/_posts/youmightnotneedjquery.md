---
title: youmightnotneedjquery
date: 2021-12-24 22:02:26
tags: 前端
---

> 你要记得，永远要愉快地多给别人，少从别人那里拿取。——高尔基

最近发现一个网站：`youmightnotneedjquery`

https://youmightnotneedjquery.com/

直译过来就是你可能并不需要`jquery`...可以看出是有点恶趣味哈哈

对应的`github`地址为：https://github.com/HubSpot/YouMightNotNeedjQuery

这个网站它介绍了很多种使用新版`IE`新特性代替`jquery`的方法：

例如使用`jquery`时发送`get`请求获取`json`格式的数据

```javascript
$.getJSON('/my/url', function(data) {

});
```

使用`IE10+`时，不用依赖`jquery`，直接写

```javascript
var request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
    var data = JSON.parse(this.response);
  } else {
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
  // There was a connection error of some sort
};

request.send();
```

即可完成`ajax`请求，不过同时，也让代码更加繁重了，对于低版本`IE`的`ajax`请求，可以使用[我这篇博客](https://VampireAchao.github.io/2020/09/17/%E4%B8%80%E7%AF%87%EF%BC%8C%E8%AE%A9%E4%BD%A0%E4%BC%9A%E5%86%99%E5%8E%9F%E7%94%9Fajax/)中的样子实现

当然这只是其中一个例子，更多的还是看上方网站
