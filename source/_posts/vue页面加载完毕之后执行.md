---
title: vue页面加载完毕之后执行
date: 2021-06-20 22:45:04
tags: 前端
---

> 好奇心造就科学家和诗人。——法朗士

当`vue`页面加载完成后触发

我们在`html`开发中经常是使用`window.onload`实现

```javascript
    window.onload = () => {
        
    }
```

但在`vue`中我们使用`this.$nextTick`

```vue
		this.$nextTick(() => {
		    console.log("页面加载完啦~")
		})
```

![image-20210620225246575](/imgs/oss/picGo/image-20210620225246575.png)

效果如下

![image-20210620225447480](/imgs/oss/picGo/image-20210620225447480.png)
