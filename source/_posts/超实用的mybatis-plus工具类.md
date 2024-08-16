---
title: 超实用的mybatis-plus工具类
date: 2021-05-05 18:27:52
tags: java
---

> 每人心中都应有两盏灯光，一盏是希望的灯光;一盏是勇气的灯光。有 了这两盏灯光，我们就不怕海上的黑暗和风涛的险恶了。——罗兰

分享给大家

需要引入[`mybatis-plus`](https://VampireAchao.github.io/2020/11/21/mybatis-plus%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8/)

```java
package com.kuang.common.util;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collectors;

/**
 * mp工具类
 *
 * @author <achao1441470436@gmail.com>
 * @date 2021/5/4 0004 16:35
 */
public class MybatisPlusUtils {
    
    private MybatisPlusUtils() {
        // Do not new me!       
    }

    /**
     * 传入mapper,paramList,源属性，新属性 得到 List<新属性> 用于关联表等
     *
     * @param mapper 持久层操作类
     * @param param  查询参数
     * @param origin 源属性
     * @param target 新属性
     * @param <T>    PO
     * @param <I>    T中的源属性
     * @param <R>    T中的新属性
     * @return java.util.Map<I, T>
     * @author <achao1441470436@gmail.com>
     * @date 2021/5/4 0004 20:37
     */
    public static <T, I, R> List<R> getList(BaseMapper<T> mapper, Supplier<I> param, SFunction<T, I> origin, SFunction<T, R> target) {
        return Optional.ofNullable(param).map(Supplier::get).map(p -> mapper.selectList(new LambdaQueryWrapper<T>().eq(origin, p).select(target))).map(List::parallelStream).map(s -> s.map(target).collect(Collectors.toList())).orElseGet(Collections::emptyList);
    }

    /**
     * 传入mapper,paramList,对应的属性 得到 Map<实体属性, 实体> 用于一对一
     *
     * @param mapper    持久层操作类
     * @param paramList 查询参数
     * @param sFunction 条件
     * @param <T>       PO
     * @param <I>       T中的属性
     * @return java.util.Map<I, T>
     * @author <achao1441470436@gmail.com>
     * @date 2021/5/4 0004 20:37
     */
    public static <T, I> Map<I, T> getMapBy(BaseMapper<T> mapper, List<I> paramList, SFunction<T, I> sFunction) {
        return Optional.ofNullable(paramList).filter(CollectionUtils::isNotEmpty).map(p -> mapper.selectList(new LambdaQueryWrapper<T>().in(sFunction, p))).map(List::parallelStream).map(s -> s.collect(Collectors.toMap(sFunction, Function.identity(), (a, b) -> b))).orElseGet(Collections::emptyMap);
    }

    /**
     * 传入mapper,paramList,对应的属性 得到 Map<实体属性, List<实体>> 用于一对多
     *
     * @param mapper    持久层操作类
     * @param paramList 查询参数
     * @param sFunction 条件
     * @param <T>       PO
     * @param <I>       T中的属性
     * @return java.util.Map<I, List < T> >
     * @author <achao1441470436@gmail.com>
     * @date 2021/5/4 0004 20:37
     */
    public static <T, I> Map<I, List<T>> groupBy(BaseMapper<T> mapper, List<I> paramList, SFunction<T, I> sFunction) {
        return Optional.ofNullable(paramList).filter(CollectionUtils::isNotEmpty).map(p -> mapper.selectList(new LambdaQueryWrapper<T>().in(sFunction, p))).map(List::parallelStream).map(s -> s.collect(Collectors.groupingBy(sFunction))).orElseGet(Collections::emptyMap);
    }

}
```



```shell
	##2021-05-08 13:10:54 很多小伙伴说看不懂，这里就补充补充啦~
```

#### 第一个函数`getList`

一般用于关联表处，例如我这里需要实现一个已购课程的功能，我们首先要根据用户`id`去查询用户的课程购买记录表

```java
        // 通过userId拿到CourseId
        User current = UserThreadLocal.getNoneNullUser();
        // 从关联表获取课程ids 【使用方式在这里】
        List<String> courseIds = MybatisPlusUtils.getList(this.baseMapper, current::getUserid, UserCourse::getUserid, UserCourse::getCourseid);
```

这里三个参数，`baseMapper`是继承`mybatis-plus`中`com.baomidou.mybatisplus.extension.service.impl.ServiceImpl`获取的

![image-20210508131805092](/imgs/oss/picGo/image-20210508131805092.png)

然后第二个参数`current::getUserid`就是一个`java.util.function.Supplier`

是作为查询条件参数值

你也可以这么写` () -> current.getUserid()`

![image-20210508132053517](/imgs/oss/picGo/image-20210508132053517.png)

第三个参数是用于查询的条件，这里`UserCourse::getUserid`表示根据`userId`查询数据

结合上个参数，这里是使用`userId = current.getUserid()`去查询数据

第四个参数是你要返回的数据，例如这里我是通过用户`id`获取课程`id`,我们就给个`UserCourse::getCourseid`

最后实现的效果就下面这段差不多的

```java
         List<UserCourse> userCourses = this.baseMapper.selectList(Wrappers.lambdaQuery(new UserCourse()).in(UserCourse::getUserid, current.getUserid()));
         List<String> courseIds = new ArrayList<>(userCourses.size());
        for (int i = 0; i < userCourses.size(); i++) {
            courseIds.add(userCourses.get(i).getCourseid());
        }
```



#### 第二个函数`getMapBy`

这里描述写的多用于一对一，不是指表之间关联关系是一对一，而是`key`和`value`一对一

三个参数分别为

继承`com.baomidou.mybatisplus.core.mapper.BaseMapper`的`mapper`接口

数据参数集合

查询条件

例如我这里，查询一个用户信息列表，但我需要带一个用户的信息，放在用户信息表

```java
        // 用户信息
        List<User> list = userService.list();
        // 用户ids
        List<String> userIds = list.parallelStream().map(User::getUserid).collect(Collectors.toList());
        // 根据用户ids获取 Map<userId,UserInfo> 【使用方式在这里】
        Map<String, UserInfo> userIdInfoMap = MybatisPlusUtils.getMapBy(userInfoMapper, userIds, UserInfo::getUserid);
        List<UserVO> collect = list.parallelStream().map(user -> {
            // 两种方式获取到 user 关联的 UserInfo
            UserInfo fans = userIdInfoMap.getOrDefault(user.getUserid(), new UserInfo());
            UserInfo fans1 = Optional.ofNullable(user.getUserid()).map(userIdInfoMap::get).orElseGet(UserInfo::new);
            /* 封装vo返回...这里省略 */
            return vo;
        }).collect(Collectors.toList());
```

#### 第三个函数`groupBy`

这里用于`key`对多个`value`场景

三个参数分别为

继承`com.baomidou.mybatisplus.core.mapper.BaseMapper`的`mapper`接口

数据参数集合

查询条件

例如我这里，查询一个用户信息列表，并携带出用户的粉丝列表，用户和粉丝列表是一对多的关系

```java
        // 用户信息
        List<User> list = userService.list();
        // 用户ids
        List<String> userIds = list.parallelStream().map(User::getUserid).collect(Collectors.toList());
        // 根据用户ids获取 Map<userId,List<UserFans>> 【使用方式在这里】
        Map<String, List<UserFans>> userIdFansMap = MybatisPlusUtils.groupBy(userFansMapper, userIds, UserFans::getUserid);
        List<UserVO> collect = list.parallelStream().map(user -> {
            // 两种方式获取到 user 关联的 UserFans
            List<UserFans> fans = userIdFansMap.getOrDefault(user.getUserid(), Collections.emptyList());
            List<UserFans> fans = Optional.ofNullable(user.getUserid()).map(userIdFansMap::get).orElseGet(Collections::emptyList);
            /* 封装vo返回...这里省略 */
            return vo;
        }).collect(Collectors.toList());
```

