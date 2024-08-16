---
title: vue中img错误默认图片
date: 2022-03-24 19:11:09
tags: 前端
---

> 如果问我思念多重，不重的，像一座秋山的落叶。——简媜

因为之前写过[`img`图片丢失后默认图](https://VampireAchao.github.io/2022/01/08/img%E5%9B%BE%E7%89%87%E4%B8%A2%E5%A4%B1%E5%90%8E%E9%BB%98%E8%AE%A4%E5%9B%BE/)

发现在`vue`中不好使，改了半天发现原来需要将`@`改为`:`

也就是需要这么写：

```vue
          <img
            src="xxxx"
            :onerror="`this.src='/imgs/oss/2020-06-01/head.jpg'`"
          />
```



