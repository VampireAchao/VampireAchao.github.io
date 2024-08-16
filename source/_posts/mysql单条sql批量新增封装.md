---
title: mysql单条sql批量新增封装
date: 2022-07-28 12:45:18
tags: java
---

> 人活一生，值得爱的东西很多，不要因为一个不满意，就灰心。——路遥

前两天写了[mp自定义sql注入](https://VampireAchao.github.io/2022/07/26/mp自定义sql注入/)

今天对其进行了二次封装：

首先是目录：

![image-20220728125927611](/imgs/oss/picGo/image-20220728125927611.png)

源码地址：https://gitee.com/VampireAchao/stream-query

使用方式：

```java
    @Test
    void testSaveOneSql() {
        UserInfo entity = new UserInfo();
        entity.setName("cat");
        entity.setAge(20);
        entity.setEmail("achao1441470436@gmail.com");
        UserInfo userInfo = new UserInfo();
        userInfo.setName("ruben");
        List<UserInfo> list = Arrays.asList(userInfo, entity);
        boolean isSuccess = QueryHelper.saveOneSql(list);
        Assertions.assertTrue(isSuccess);
        Assertions.assertEquals(7, QueryHelper.count(UserInfo.class));
    }
```

