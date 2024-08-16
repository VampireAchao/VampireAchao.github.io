---
title: SqlSession
date: 2022-01-16 09:30:16
tags: java
---

> 被温柔对待以后，自己也想变得温柔。——《夏目友人帐》。

参照我这个[`PR`](https://gitee.com/baomidou/mybatis-plus/pulls/208)

在`Mybatis`中`SqlSession`类比于我们在使用原生`jdbc`时的`Connection`对象，用完需要释放。。。

我之前写的忘记释放了，导致`druid`监控到大量连接未释放，连接池经常占满

所以改成这种方式了

![image-20220116093621728](/imgs/oss/picGo/image-20220116093621728.png)

我们使用后一定要调用`SqlSession#close`释放连接。。。

血的教训啊，因为忘记释放导致连接池泄露，愈发让我明白自己写代码还有很多要学