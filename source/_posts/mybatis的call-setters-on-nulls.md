---
title: mybatis的call-setters-on-nulls
date: 2023-03-22 22:44:25
tags: java
---

> 一个结婚以后的朋友，无论如何不是从前的朋友了，男人的灵魂现在羼入了一些女人的灵魂。——罗曼·罗兰

我们在使用`org.apache.ibatis.session.SqlSession#selectMap(java.lang.String, java.lang.String)`

时会遇到字段值为`null`的时候，这个时候返回的`map`会丢失掉对应的`entry`节点

![image-20230322224647254](/imgs/oss/blog/vampireachao/image-20230322224647254.png)

![image-20230322224701623](/imgs/oss/blog/vampireachao/image-20230322224701623.png)

只需要配置`mybatis.configuration.call-setters-on-nulls`为`true`即可保留对应的`entry`

![image-20230322224734231](/imgs/oss/blog/vampireachao/image-20230322224734231.png)

![image-20230322224800146](/imgs/oss/blog/vampireachao/image-20230322224800146.png)