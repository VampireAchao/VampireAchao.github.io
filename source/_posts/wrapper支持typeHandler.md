---
title: wrapper支持typeHandler
date: 2023-06-15 20:55:31
tags: java
---

> 错误经不起失败，但真理却不怕失败。——泰戈尔

相关`pr`：

https://gitee.com/dromara/stream-query/pulls/340

大致使用方式

```java
  @Test
  void selectTest() {
    Name name = new Name();
    name.setUsername("VampireAchao");
    name.setNickname("阿超");

    UserInfoWithJsonName user = new UserInfoWithJsonName();
    user.setName(name);
    Database.saveFewSql(Lists.of(user));
    Database.updateFewSql(Lists.of(user));

    LambdaQueryWrapper<UserInfoWithJsonName> wrapper =
        QueryCondition.query(UserInfoWithJsonName.class)
            .select(UserInfoWithJsonName::getName)
            .eq(UserInfoWithJsonName::getName, name);
    val list = Database.list(wrapper);
    assertEquals(1, list.size(), "Query should return exactly one result");

    UserInfoWithJsonName dbUser = list.get(0);
    assertEquals(
        user.getName().getUsername(), dbUser.getName().getUsername(), "Username should match");
    assertEquals(
        user.getName().getNickname(), dbUser.getName().getNickname(), "Nickname should match");
  }
```



