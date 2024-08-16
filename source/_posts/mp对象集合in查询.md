---
title: mp对象集合in查询
date: 2023-02-27 21:43:06
tags: java
---

> 太重视名誉正是一般人最常犯的错误——叔本华

分享自己写的一个函数：

```java
    @Test
    void testWhereRelation() {
        LambdaQueryWrapper<UserInfo> wrapper = Database.inList(Wrappers.lambdaQuery(UserInfo.class),
                Lists.of(new UserInfo() {{
                             setName("Jon");
                         }},
                        new UserInfo() {{
                            setEmail("test2@baomidou.com");
                        }},
                        new UserInfo() {{
                            setName("Tom");
                        }}));
        List<UserInfo> userInfos = Database.list(wrapper);
        Assertions.assertEquals("Jon", userInfos.get(0).getName());
        Assertions.assertEquals("test2@baomidou.com", userInfos.get(1).getEmail());
        Assertions.assertEquals("Tom", userInfos.get(2).getName());
    }
```

得到：

```shell
2023-02-27 21:50:34.222 DEBUG 5956 --- [           main] i.g.v.s.p.m.m.d.U.selectList             : ==>  Preparing: SELECT id,name,age,email,version,gmt_deleted FROM user_info WHERE gmt_deleted='2001-01-01 00:00:00' AND ((name IN (?,?) OR email IN (?)))
2023-02-27 21:50:34.236 DEBUG 5956 --- [           main] i.g.v.s.p.m.m.d.U.selectList             : ==> Parameters: Jon(String), Tom(String), test2@baomidou.com(String)
```

简单说明一下：此处是将入参的`list`获取到类型，根据表字段和`list`进行遍历，获取`lambda`进行取值，然后进行`in`以及`or`查询

![image-20230227220333462](/imgs/oss/blog/vampireachao/image-20230227220333462.png)

当前的源码如下：

```java
    @SuppressWarnings("unchecked")
    public static <T> LambdaQueryWrapper<T> inList(LambdaQueryWrapper<T> wrapper, List<T> dataList) {
        if (Lists.isEmpty(dataList)) {
            return wrapper;
        }
        final Class<T> entityClass = getEntityClass(dataList);
        final List<TableFieldInfo> fieldList = TableInfoHelper.getTableInfo(entityClass).getFieldList();
        wrapper.nested(w -> Steam.of(fieldList).forEachIdx((tableField, idx) -> {
            SFunction<T, ?> getterFunction = (SFunction<T, ?>) LAMBDA_GETTER_CACHE.computeIfAbsent(
                    entityClass + StringPool.AT + tableField.getProperty(),
                    property -> {
                        Method getter = ReflectHelper.getMethod(entityClass,
                                BeanHelper.GETTER_PREFIX +
                                        tableField.getProperty().substring(0, 1).toUpperCase(Locale.ROOT) +
                                        tableField.getProperty().substring(1));
                        return LambdaHelper.revert(SFunction.class, getter);
                    });
            final List<?> list = Steam.of(dataList).map(getterFunction).nonNull().toList();
            if (idx != 0) {
                w.or();
            }
            w.in(Lists.isNotEmpty(list), getterFunction, list);
        }));
        return wrapper;
    }
```

完整代码：https://gitee.com/VampireAchao/stream-query/blob/master/stream-plugin/stream-plugin-mybatis-plus/src/main/java/io/github/vampireachao/stream/plugin/mybatisplus/Database.java