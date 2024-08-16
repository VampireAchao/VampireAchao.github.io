---
title: 新增SqlHelper.execute
date: 2022-02-13 16:21:33
tags: java
---

> 茅草屋顶下住着自由人，大理石和黄金下栖息着奴隶。——塞涅卡

昨晚提交了个`PR`到`Mybatis-Plus`，目前还没有处理

不过这个函数确实让开发便利了不少

链接：https://gitee.com/baomidou/mybatis-plus/pulls/215/files

使用方式很简单：

例如查询`Entity`表内所有数据：

```java
List<Entity> entityList = SqlHelper.execute(Entity.class, m -> m.selectList(Wrappers.lambdaQuery()));
```

在第二个参数中你可以传入`lambda`，直接用`Entity`的`BaseMapper`进行`CRUD`操作

这个方法自动对`SqlSession`进行了回收，还是蛮好用的

我顺便把原来的`SimpleQuery.selectList`也进行了调整

改为了

```java
   /**
     * 通过entityClass查询列表，并关闭sqlSession
     *
     * @param entityClass 表对应实体
     * @param wrapper     条件构造器
     * @param <E>         实体类型
     * @return 查询列表结果
     */
    public static <E> List<E> selectList(Class<E> entityClass, LambdaQueryWrapper<E> wrapper) {
        return SqlHelper.execute(entityClass, m -> m.selectList(wrapper));
    }
```

直接精简了不少