---
title: mybatis中@MapKey
date: 2023-03-10 21:54:53
tags: java
---

> 和睦的家庭空气是世上的一种花朵，没有东西比它更温柔，没有东西比它更适宜于把一家人的天性培养得坚强正直。——德莱塞

继续分享`mybatis`的知识点：

`@MapKey`注解：`org.apache.ibatis.annotations.MapKey`

```java
    @MapKey("id")
    @Select("SELECT * FROM user_info")
    Map<Long, UserInfo> selectIdUserMap();
```

得到：`Map<ID, 用户>`

![image-20230310220352764](/imgs/oss/blog/vampireachao/image-20230310220352764.png)

非常的简单

