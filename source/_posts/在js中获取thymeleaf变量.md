---
title: 在js中获取thymeleaf变量
date: 2021-05-20 23:21:17
tags: java
---

> 大人者，不失其赤子之心者也。——《孟子·离娄下》

代码很简单

如下即可，这里的`'Achao'`是为了防止编译报错

```html
 <script th:inline="javascript">
     var data = /*[[${data}]]*/ 'Achao';
     console.log(data);
</script>
```





