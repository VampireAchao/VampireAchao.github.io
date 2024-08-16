---
title: 写一个基于lambda的copyProperties
date: 2023-06-19 22:11:34
tags: java
---

> 和任何人都认朋友，结果和任何人都交不成朋友。——佚名

代码仓库：

https://gitee.com/dromara/stream-query

相关提交：

https://gitee.com/dromara/stream-query/commit/31114dbc1374f78aad17daa4da615766d93194a2

使用方式：

```java
  @Test
  void testCopyProperties() {
    LambdaExecutable source =
        LambdaHelper.resolve(
            (Serializable & Function<LambdaExecutable, String>) LambdaExecutable::getName);
    LambdaExecutable target = BeanHelper.copyProperties(source, null);
    Assertions.assertNotNull(target);
    Assertions.assertEquals(source.getName(), target.getName());
  }
```

此处`target`为`null`会自动创建，只能`copy`到同类型，后续会支持不同类型的，尽请期待

目前的源码：

```java
  /**
   * 拷贝属性
   *
   * @param source 源对象
   * @param target 目标对象
   * @param <T> 对象类型
   */
  public static <T> T copyProperties(T source, T target) {
    if (Objects.isNull(source)) {
      return target;
    }
    Class<T> clazz = SerFunc.<Class<?>, Class<T>>cast().apply(source.getClass());
    AtomicReference<T> targetRef = new AtomicReference<>(target);
    if (Objects.isNull(targetRef.get())) {
      SerFunc<Class<T>, Constructor<T>> getConstructor = Class::getConstructor;
      Constructor<T> constructor = getConstructor.andThen(ReflectHelper::accessible).apply(clazz);
      SerFunc<Constructor<T>, T> newInstance = Constructor::newInstance;
      targetRef.set(newInstance.apply(constructor));
    }
    Map<SerFunc<T, Object>, SerBiCons<T, Object>> getterSetterMap =
        LambdaHelper.getGetterSetterMap(clazz);
    getterSetterMap.forEach(
        (getter, setter) -> setter.accept(targetRef.get(), getter.apply(source)));
    return targetRef.get();
  }
```

