---
title: 写一个基于lambda的copyProperties（二）
date: 2023-06-20 21:34:39
tags: java
---

> 谨慎比大胆要有力量的多。——雨果

书接上文[写一个基于lambda的copyProperties](/2023/06/19/写一个基于lambda的copyProperties/)

今天继续整一个支持其他类型的

```java
  @Data
  public static class User {
    private String name;
  }

  @Data
  public static class Person {
    private String name;
  }

  @Test
  void testCopyProperties() {
    User source = new User() {{
      setName("test");
    }};
    Person target = BeanHelper.copyProperties(source, Person.class);
    Assertions.assertEquals(source.getName(), target.getName());
  }
```

源码如下：

```java
/**
   * 拷贝属性
   *
   * @param source 源对象
   * @param target 目标对象
   * @param <T> 对象类型
   */
  public static <T, R> R copyProperties(T source, R target) {
    if (Objects.isNull(source) || Objects.isNull(target)) {
      return target;
    }
    Class<T> sourceType = SerFunc.<Class<?>, Class<T>>cast().apply(source.getClass());
    Map<String, Map.Entry<SerFunc<T, Object>, SerBiCons<T, Object>>> sourcePropertyGetterSetterMap =
        LambdaHelper.getPropertyGetterSetterMap(sourceType);
    Class<R> targetType = SerFunc.<Class<?>, Class<R>>cast().apply(target.getClass());
    Map<String, Map.Entry<SerFunc<R, Object>, SerBiCons<R, Object>>> targetPropertyGetterSetterMap =
        LambdaHelper.getPropertyGetterSetterMap(targetType);
    sourcePropertyGetterSetterMap.forEach(
        (property, sourceGetterSetter) -> {
          Map.Entry<SerFunc<R, Object>, SerBiCons<R, Object>> targetGetterSetter =
              targetPropertyGetterSetterMap.get(property);
          if (Objects.isNull(targetGetterSetter)) {
            return;
          }
          SerFunc<T, Object> sourceGetter = sourceGetterSetter.getKey();
          SerFunc<R, Object> targetGetter = targetGetterSetter.getKey();
          LambdaExecutable sourceGetterLambda = LambdaHelper.resolve(sourceGetter);
          LambdaExecutable targetGetterLambda = LambdaHelper.resolve(targetGetter);
          if (!Opp.of(sourceGetterLambda.getReturnType())
              .map(Type::getTypeName)
              .equals(Opp.of(targetGetterLambda.getReturnType()).map(Type::getTypeName))) {
            return;
          }
          targetGetterSetter.getValue().accept(target, sourceGetter.apply(source));
        });
    return target;
  }

  public static <T, R> R copyProperties(T source, Class<R> targetType) {
    R target = ReflectHelper.newInstance(targetType);
    if (Objects.isNull(source)) {
      return target;
    }
    return copyProperties(source, target);
  }
```

非常的好用