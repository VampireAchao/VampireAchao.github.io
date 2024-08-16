---
title: js页面历史返回
date: 2024-07-03 20:43:02
tags: 前端
---

> 历史是一堆灰烬，但灰烬深处有余温。——黑格尔

我们可以使用`history.back()`来进行页面返回

`history`的文档：

[History API - Web API | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

除了返回还可以前进

```javascript
history.forward();
```

以及

```javascript
// 向后跳转一个页面（等价于调用 back()）
history.go(-1);
```

然后还有

```javascript
// 向前跳转一个页面，就像调用 forward()
history.go(1);
```

当然传入`0`就是刷新

```javascript
// 以下语句都具有刷新页面的效果
history.go(0);
history.go();
```

还有查看页面栈长度

```javascript
const numberOfEntries = history.length;
```

补充：

```javascript
window.addEventListener("popstate", (event) => {
  alert(`位置：${document.location}，状态：${JSON.stringify(event.state)}`);
});

history.pushState({ page: 1 }, "标题 1", "?page=1");
history.pushState({ page: 2 }, "标题 2", "?page=2");
history.replaceState({ page: 3 }, "标题 3", "?page=3");
history.back(); // 显示警告“位置：http://example.com/example.html?page=1，状态：{"page":1}”
history.back(); // 显示警告“位置：http://example.com/example.html，状态：null”
history.go(2); // 显示警告“位置：http://example.com/example.html?page=3，状态：{"page":3}”
```
