---
title: mybatis-plus过滤不需要查询的字段
date: 2021-10-12 20:12:27
tags: java
---

> 仁义忠信,乐善不倦,此天爵也 。一一孟子

之前写过过滤出需要查询的字段，也简单介绍了下[`Mybatis-Plus`的`select`函数](https://VampireAchao.github.io/2021/08/23/mybatis-plus%E7%9A%84select%E5%87%BD%E6%95%B0/)

今天写了个小函数，可以直接传入不需要查询出来的字段

```java
    /**
     * 过滤不需要查询的字段
     *
     * @param wrapper   条件构造器
     * @param functions 字段
     * @return com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<T>
     * @author <achao1441470436@gmail.com>
     * @since 2021/10/12 15:51
     */
    @SafeVarargs
    public static <T> LambdaQueryWrapper<T> filterProperties(LambdaQueryWrapper<T> wrapper, SFunction<T, Serializable>... functions) {
        return Optional.ofNullable(functions).filter(ArrayUtils::isNotEmpty).map(array -> Arrays.stream(array).map(LambdaUtils::resolve).map(SerializedLambda::getImplMethodName).map(PropertyNamer::methodToProperty).collect(Collectors.toList())).map(properties -> wrapper.select(i -> !properties.contains(i.getProperty()))).orElse(wrapper);
    }
```

使用方式：

```java
LambdaQueryWrapper<Product> wrapper = new LambdaQueryWrapper<>(new Product());
MybatisPlusUtils.filterProperties(wrapper, Product::getDetail, Product::getParams)
```

或者直接

```java
LambdaQueryWrapper<Product> lambdaQueryWrapper = MybatisPlusUtils.filterProperties(new LambdaQueryWrapper<>(new Product()), Product::getDetail, Product::getParams);
```

注意，`LambdaQueryWrapper`需要使用带实体的有参构造

![image-20211012201649609](/imgs/oss/picGo/image-20211012201649609.png)

当然也可以不用，我们只需要稍作修改：

```java
    /**
     * 过滤不需要查询的字段
     *
     * @param wrapper   条件构造器
     * @param functions 字段
     * @return com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper<T>
     * @author <achao1441470436@gmail.com>
     * @since 2021/10/12 15:51
     */
    @SafeVarargs
    @SuppressWarnings("unchecked")
    public static <T> LambdaQueryWrapper<T> filterProperties(LambdaQueryWrapper<T> wrapper, SFunction<T, Serializable>... functions) {
        Set<SerializedLambda> lambdas = Optional.ofNullable(functions).filter(ArrayUtils::isNotEmpty).map(array -> Arrays.stream(array).map(LambdaUtils::resolve).collect(Collectors.toSet())).orElseGet(Collections::emptySet);
        Set<String> properties = lambdas.stream().map(SerializedLambda::getImplMethodName).map(PropertyNamer::methodToProperty).collect(Collectors.toSet());
        lambdas.stream().findAny().ifPresent(lam -> wrapper.select((Class<T>) lam.getImplClass(), i -> !properties.contains(i.getProperty())));
        return wrapper;
    }
```

这样就可以不用使用带实体的有参构造啦

