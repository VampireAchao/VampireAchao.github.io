---
title: react中配置图片容错
date: 2022-09-15 10:51:37
tags: 前端
---

> 爱情是友谊的精华，书信是爱情的妙药——豪厄尔

之前写了:[vue中img错误默认图片](https://VampireAchao.github.io/2022/03/24/vue中img错误默认图片/)以及[`img`图片丢失后默认图](https://VampireAchao.github.io/2022/01/08/img图片丢失后默认图/)

今天写个`react`版本的：

```react
<img src={xxxx} onError={(e) => e.target.src = '/imgs/oss/2020-06-01/head.jpg'} alt={value.alt} />
```

代码很简单，也很管用

![image-20220915105331402](/imgs/oss/blog/image-20220915105331402.png)
