---
title: mybatis-plus两个limit坑
date: 2021-02-07 22:45:12
tags: java
---

> 要成就大事业就要趁青年时代。 ——歌德

前两天遇到一个坑，使用`mybatis-plus`的时候，`SQL`出现两个`LIMIT`

![image-20210207225121429](/imgs/oss/picGo/image-20210207225121429.png)

经过查阅[官方文档](https://mp.baomidou.com/guide/faq.html)才发现，这是因为配置了两个分页拦截器

![image-20210207225242925](/imgs/oss/picGo/image-20210207225242925.png)

经过检查，果然发现两个

![image-20210207225312776](/imgs/oss/picGo/image-20210207225312776.png)

![image-20210207225402837](/imgs/oss/picGo/image-20210207225402837.png)

然后我去掉一个后就解决了

经过这次`BUG`，我总结出用别人的框架/组件，一定要多阅读官方文档，这样才不会踩了坑也不知道怎么办