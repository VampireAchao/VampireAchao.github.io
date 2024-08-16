---
title: mysql随机查询（二）
date: 2023-04-26 21:54:19
tags: 数据库
---

> 活教会我思考，可思考没有教会我生活。——赫尔芩

之前写过[mysql随机查询](https://VampireAchao.github.io/2021/04/07/mysql随机查询/)

今天学到一个新方式：

```mysql
SELECT * FROM user_info ORDER BY rand() ASC limit 1
```

非常的简单方便

对应`mp`的写法：

```java
List<UserInfo> list = Database.list(Wrappers.query(new UserInfo()).orderByAsc("rand()").last("limit 1"));
```

![image-20230426215601473](/imgs/oss/blog/vampireachao/image-20230426215601473.png)
