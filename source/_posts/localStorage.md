---
title: localStorage
date: 2021-04-05 13:11:10
tags: 前端
---

> 蚍蜉撼大树，可笑不自量。——韩愈《调张籍》

我们可以使用`LocalStorage`在页面上存点东西，限制是`5MB`

```javascript
window.localStorage.setItem("ruben","Hello")
```

我们再取出来

```javascript
window.localStorage.getItem("ruben")
```

![image-20210405131618955](/imgs/oss/picGo/image-20210405131618955.png)

如果我们要移除

```javascript
window.localStorage.removeItem("ruben")
```

要移除全部

```javascript
window.localStorage.clear()
```

![image-20210405131805550](/imgs/oss/picGo/image-20210405131805550.png)

