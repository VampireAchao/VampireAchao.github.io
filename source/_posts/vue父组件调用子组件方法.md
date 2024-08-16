---
title: vue父组件调用子组件方法
date: 2021-11-02 20:11:20
tags: 前端
---

> 抱怨身处黑暗，不如提灯前行。——刘同

首先是[官方文档](https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E8%AE%BF%E9%97%AE%E5%AD%90%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E6%88%96%E5%AD%90%E5%85%83%E7%B4%A0)

这里使用`ref`属性去访问子元素

```vue
<hello-world ref="helloWorld" msg="Hello World"></hello-world>
```

然后打印一下

```javascript
console.log(this.$refs.helloWorld);
```

![image-20211102202015275](/imgs/oss/picGo/image-20211102202015275.png)

可以看到成功获取到

再到子组件定义一个方法：

![image-20211102202118934](/imgs/oss/picGo/image-20211102202118934.png)

父组件访问：

![image-20211102202132266](/imgs/oss/picGo/image-20211102202132266.png)

效果：

![image-20211102202107779](/imgs/oss/picGo/image-20211102202107779.png)
