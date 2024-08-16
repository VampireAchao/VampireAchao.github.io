---
title: mybatis-plus部分更新
date: 2021-08-28 22:23:17
tags: java
---

> 宁要好梨一个，不要烂梨一筐。积极肯干和忠心耿耿的人即使只有两三个，也比十个朝气沉沉的人强。——列宁

在我们使用`mybatis-plus`进行开发的时候

可以看到默认的`updateById`方法是判断属性如果有值则修改，无值则忽略，不修改对应的字段

那如果我们要在该属性没有值得情况下将对应字段置为空的话

就可以使用`IService`里的这个`update`的重载

```java
    /**
     * 根据 whereEntity 条件，更新记录
     *
     * @param entity        实体对象
     * @param updateWrapper 实体对象封装操作类 {@link com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper}
     */
    default boolean update(T entity, Wrapper<T> updateWrapper) {
        return SqlHelper.retBool(getBaseMapper().update(entity, updateWrapper));
    }
```

用法如下，例如我此处将`mobile`字段置为空

```java
        UserDetail userDetail = userDetailService.getEntityClass().newInstance();
        userDetailService.update(userDetail, Wrappers.lambdaUpdate(UserDetail.builder().build().id(1L)).set(UserDetail::getMobile, null));
```

最后执行效果如下

![image-20210828223741896](/imgs/oss/picGo/image-20210828223741896.png)

这里用到的`updateWrapper`的文档：https://mp.baomidou.com/guide/wrapper.html#updatewrapper

