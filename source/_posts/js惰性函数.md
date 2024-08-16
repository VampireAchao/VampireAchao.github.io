---
title: js惰性函数
date: 2023-11-08 08:41:27
tags: 前端
---

> 要深入了解人的方法只有一个，就是不急于下定论。——圣·普波

在`js`中我们可以使用惰性函数，用于重新定义函数自身的行为

例如：

```javascript
function addEvent(type, el, fn) {
  if (window.addEventListener) {
    addEvent = function(type, el, fn) {
      el.addEventListener(type, fn, false);
    }
  } else if (window.attachEvent) {
    addEvent = function(type, el, fn) {
      el.attachEvent('on' + type, fn);
    }
  } else {
    addEvent = function(type, el, fn) {
      el['on' + type] = fn;
    }
  }

  addEvent(type, el, fn);
}

// 第一次调用会进行环境判断，之后的调用就会直接使用适合当前环境的函数实现
addEvent('click', document.getElementById('myElement'), function() {
  console.log('Element clicked');
});
```

这样做的好处是避免了每次都重复判断当前环境，例如浏览器厂商类型、内核版本等
