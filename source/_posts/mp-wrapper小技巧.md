---
title: mp wrapper小技巧
date: 2023-04-13 22:36:02
tags: java
---

> 别让你的舌头超越你的思想。——第欧根尼

对于`mp`的`wrapper`，直接使用`nested`+`or`是可以正确执行的

例如：

```java
Db.list(Wrappers.lambdaQuery(UserInfo.class).or().eq(UserInfo::getName, "Jon"));
```

生成

```shell
2023-04-13 22:39:54.858 DEBUG 20668 --- [           main] o.d.s.s.p.m.m.UserInfoMapper.selectList  : ==>  Preparing: SELECT id,name,age,email,version,gmt_deleted FROM user_info WHERE gmt_deleted='2001-01-01 00:00:00' AND (name = ?)
2023-04-13 22:39:54.858 DEBUG 20668 --- [           main] o.d.s.s.p.m.m.UserInfoMapper.selectList  : ==> Parameters: Jon(String)
```

这样的技巧可以让我们在循环里拼接`or`时，无须考虑是否为第一个元素

例如`stream-query`中的封装：

```java
  /**
   * or 查询
   *
   * @param wrapper 条件构造器
   * @param dataList 数据
   * @param biConsumer 逻辑处理
   * @param <W> 条件构造器
   * @param <T> 实体类型
   * @param <R> 数据类型
   * @return 条件构造器
   */
  public static <W extends AbstractWrapper<T, ?, W>, T, R> W multiOr(
      W wrapper, Collection<R> dataList, BiConsumer<W, R> biConsumer) {
    if (Lists.isEmpty(dataList)) {
      return Database.notActive(wrapper);
    }
    return wrapper.nested(w -> dataList.forEach(data -> biConsumer.accept(w.or(), data)));
  }
```

使用起来：

```java
    val dataList =
        Lists.of(
            new UserInfo() {
              {
                setName("Jon");
              }
            },
            new UserInfo() {
              {
                setEmail("test2@baomidou.com");
              }
            },
            new UserInfo() {
              {
                setName("Tom");
              }
            });
    val wrapper =
        WrapperHelper.multiOr(
            Wrappers.lambdaQuery(UserInfo.class),
            dataList,
            (w, data) -> {
              w.eq(Objects.nonNull(data.getEmail()), UserInfo::getEmail, data.getEmail())
                  .eq(StringUtils.isNotBlank(data.getName()), UserInfo::getName, data.getName());
            });
    // ==>  Preparing: SELECT id,name,age,email,version,gmt_deleted FROM user_info WHERE
    // gmt_deleted='2001-01-01 00:00:00' AND ((name = ? OR email = ? OR name = ?))
    // ==> Parameters: Jon(String), test2@baomidou.com(String), Tom(String)
    List<UserInfo> userInfos = Database.list(wrapper);
    Assertions.assertEquals("Jon", userInfos.get(0).getName());
    Assertions.assertEquals("test2@baomidou.com", userInfos.get(1).getEmail());
    Assertions.assertEquals("Tom", userInfos.get(2).getName());
```

