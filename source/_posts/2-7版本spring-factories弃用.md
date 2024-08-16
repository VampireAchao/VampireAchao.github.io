---
title: 2.7版本spring.factories弃用
date: 2022-06-30 13:46:42
tags: java
---

> 手我是有的，就是不知如何碰你。——顾城

之前我写过一个[编写一个spring-boot-starter-fastjson](https://VampireAchao.github.io/2022/03/22/编写一个spring-boot-starter-fastjson/)

今天看了一下，新版本的`spring2.7`，已经弃用了`spring.factories`

最新版的写法为：

![image-20220630134854376](/imgs/oss/picGo/image-20220630134854376.png)

也就是说：

![image-20220630134953566](/imgs/oss/picGo/image-20220630134953566.png)

里面配置放包名即可

![image-20220630135015909](/imgs/oss/picGo/image-20220630135015909.png)
