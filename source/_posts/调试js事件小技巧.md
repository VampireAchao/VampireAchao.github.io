---
title: 调试js事件小技巧
date: 2024-01-02 15:34:31
tags: 前端
---

> 万人都要将火熄灭，我一人独将此火高高举起。——海子

分享一个`js`调试事件小技巧

```html
<!DOCTYPE html>
<html>
<head>
    <title>Event Monitor Trigger</title>
</head>
<body>
    <button id="myButton">Click Me</button>
</body>
</html>
```

这里一个按钮，啥都没有

我们运行一下，给它在`chrome console`里添加事监听

```javascript
// 先用选中元素光标选一下按钮，这样$0就会指向按钮
monitorEvents($0)
```

![](/imgs/oss/blog-img/2024-01-01-15-42-24-image.png)

这时候我们触发其任何事件都会有输出

![](/imgs/oss/blog-img/2024-01-01-15-43-27-image.png)

针对某一事件的话就传入该事件

```javascript
monitorEvents($0, ["click"])
```

![](/imgs/oss/blog-img/2024-01-01-15-44-57-image.png)
