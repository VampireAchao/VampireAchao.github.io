---
title: simple-query
date: 2021-11-16 22:20:50
tags: java
---

> 吾生也有涯，而知也无涯。——《庄子》

给`Mybatis-Plus`提交的`PR`又过了

https://gitee.com/baomidou/mybatis-plus/pulls/194

```java
package com.baomidou.mybatisplus.extension.toolkit;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.LambdaUtils;
import com.baomidou.mybatisplus.core.toolkit.support.SFunction;

import java.util.List;
import java.util.Map;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * simple-query 让简单的查询更简单
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/11/9 18:27
 */
public class SimpleQuery {
    private SimpleQuery() {
        /* Do not new me! */
    }

    /**
     * 通过lambda获取Class
     *
     * @param sFunction 可序列化的lambda
     * @param <E>       Class类型
     * @return 对应的Class
     */
    @SuppressWarnings("unchecked")
    public static <E> Class<E> getType(SFunction<E, ?> sFunction) {
        return (Class<E>) LambdaUtils.extract(sFunction).getInstantiatedClass();
    }

    /**
     * 传入Wrappers和key，从数据库中根据条件查询出对应的列表，封装成Map
     *
     * @param wrapper   条件构造器
     * @param sFunction key
     * @param peeks     封装成map时可能需要的后续操作，不需要可以不传
     * @param <E>       实体类型
     * @param <A>       实体中的属性类型
     * @return Map<实体中的属性, 实体>
     */
    @SafeVarargs
    public static <E, A> Map<A, E> keyMap(LambdaQueryWrapper<E> wrapper, SFunction<E, A> sFunction, Consumer<E>... peeks) {
        return list2Map(SqlHelper.getMapper(getType(sFunction)).selectList(wrapper), sFunction, Function.identity(), peeks);
    }

    /**
     * 传入Wrappers和key，从数据库中根据条件查询出对应的列表，封装成Map
     *
     * @param wrapper   条件构造器
     * @param keyFunc   key
     * @param valueFunc value
     * @param peeks     封装成map时可能需要的后续操作，不需要可以不传
     * @param <E>       实体类型
     * @param <A>       实体中的属性类型
     * @param <P>       实体中的属性类型
     * @return Map<实体中的属性, 实体>
     */
    @SafeVarargs
    public static <E, A, P> Map<A, P> map(LambdaQueryWrapper<E> wrapper, SFunction<E, A> keyFunc, SFunction<E, P> valueFunc, Consumer<E>... peeks) {
        return list2Map(SqlHelper.getMapper(getType(keyFunc)).selectList(wrapper), keyFunc, valueFunc, peeks);
    }

    /**
     * 传入Wrappers和key，从数据库中根据条件查询出对应的列表，封装成Map
     *
     * @param wrapper   条件构造器
     * @param sFunction 分组依据
     * @param peeks     后续操作
     * @param <E>       实体类型
     * @param <A>       实体中的属性类型
     * @return Map<实体中的属性, List < 实体>>
     */
    @SafeVarargs
    public static <E, A> Map<A, List<E>> group(LambdaQueryWrapper<E> wrapper, SFunction<E, A> sFunction, Consumer<E>... peeks) {
        return listGroupBy(SqlHelper.getMapper(getType(sFunction)).selectList(wrapper), sFunction, peeks);
    }

    /**
     * 传入wrappers和需要的某一列，从数据中根据条件查询出对应的列，转换成list
     *
     * @param wrapper   条件构造器
     * @param sFunction 需要的列
     * @param peeks     后续操作
     * @return java.util.List<A>
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/9 17:59
     */
    @SafeVarargs
    public static <E, A> List<A> list(LambdaQueryWrapper<E> wrapper, SFunction<E, A> sFunction, Consumer<E>... peeks) {
        return list2List(SqlHelper.getMapper(getType(sFunction)).selectList(wrapper), sFunction, peeks);
    }


    /**
     * 对list进行map、peek操作
     *
     * @param list      数据
     * @param sFunction 需要的列
     * @param peeks     后续操作
     * @return java.util.List<A>
     * @author <achao1441470436@gmail.com>
     * @since 2021/11/9 18:01
     */
    @SafeVarargs
    public static <A, E> List<A> list2List(List<E> list, SFunction<E, A> sFunction, Consumer<E>... peeks) {
        return Stream.of(peeks).reduce(list.parallelStream(), Stream::peek, Stream::concat).map(sFunction).collect(Collectors.toList());
    }

    /**
     * 对list进行groupBy操作
     *
     * @param list      数据
     * @param sFunction 分组的key，依据
     * @param peeks     封装成map时可能需要的后续操作，不需要可以不传
     * @param <E>       实体类型
     * @param <A>       实体中的属性类型
     * @return Map<实体中的属性, List < 实体>>
     */
    @SafeVarargs
    public static <A, E> Map<A, List<E>> listGroupBy(List<E> list, SFunction<E, A> sFunction, Consumer<E>... peeks) {
        return Stream.of(peeks).reduce(list.parallelStream(), Stream::peek, Stream::concat).collect(Collectors.groupingBy(sFunction));
    }


    /**
     * list转换为map
     *
     * @param <E>     实体类型
     * @param <A>     实体中的属性类型
     * @param <P>     实体中的属性类型
     * @param list    数据
     * @param keyFunc key
     * @param peeks   封装成map时可能需要的后续操作，不需要可以不传
     * @return Map<实体中的属性, 实体>
     */
    @SafeVarargs
    public static <E, A, P> Map<A, P> list2Map(List<E> list, SFunction<E, A> keyFunc, Function<E, P> valueFunc, Consumer<E>... peeks) {
        return Stream.of(peeks).reduce(list.parallelStream(), Stream::peek, Stream::concat).collect(Collectors.toMap(keyFunc, valueFunc, (l, r) -> l));
    }


}
```

这个一般用于单表查询后封装成`Map`或只取出具体某一列

用法如下：

```java
	@Test
    public void testList() {
        // 我要这张表里的ids
        List<Long> entityIds = SimpleQuery.list(Wrappers.lambdaQuery(), Entity::getId);

        Assert.isTrue(entityIds.equals(Arrays.asList(1L, 2L)), "Ops!");
        // 可叠加后续操作
        List<String> names = SimpleQuery.list(Wrappers.lambdaQuery(), Entity::getName, e -> Optional.ofNullable(e.getName()).map(String::toUpperCase).ifPresent(e::setName));

        Assert.isTrue(names.equals(Arrays.asList("RUBEN", "A CHAO")), "Ops!");
    }

    @Test
    public void testMap() {
        // 我要这个表里对应条件的用户，用id作为key给我一个map
        Map<Long, Entity> idEntityMap = SimpleQuery.keyMap(Wrappers.<Entity>lambdaQuery().eq(Entity::getId, 1L), Entity::getId);
        // 校验结果
        Entity entity = new Entity();
        entity.setId(1L);
        entity.setName("ruben");
        Assert.isTrue(idEntityMap.equals(Collections.singletonMap(1L, entity)), "Ops!");

        // 如果我只想要id和name组成的map
        Map<Long, String> idNameMap = SimpleQuery.map(Wrappers.lambdaQuery(), Entity::getId, Entity::getName);
        // 校验结果
        Map<Long, String> map = new HashMap<>(1 << 2);
        map.put(1L, "ruben");
        map.put(2L, "a chao");
        Assert.isTrue(idNameMap.equals(map), "Ops!");

        // 同样支持叠加后续操作
//        SimpleQuery.keyMap(Wrappers.lambdaQuery(), Entity::getId, System.out::println, System.out::println);

    }

    @Test
    public void testGroup() {
        // 我需要相同名字的用户的分为一组，再造一条数据
        BaseMapper<Entity> mapper = SqlHelper.getMapper(Entity.class);
        Entity entity = new Entity();
        entity.setId(3L);
        entity.setName("ruben");
        mapper.insert(entity);

        // 简单查询
        Map<String, List<Entity>> nameUsersMap = SimpleQuery.group(Wrappers.lambdaQuery(), Entity::getName);

        // 校验结果
        Map<String, List<Entity>> map = new HashMap<>(1 << 2);
        Entity chao = new Entity();
        chao.setId(2L);
        chao.setName("a chao");
        map.put("a chao", Collections.singletonList(chao));

        Entity ruben = new Entity();
        ruben.setId(1L);
        ruben.setName("ruben");
        Entity ruben2 = new Entity();
        ruben2.setId(3L);
        ruben2.setName("ruben");
        map.put("ruben", Arrays.asList(ruben, ruben2));
        Assert.isTrue(nameUsersMap.equals(map), "Ops!");

    }
```

