---
title: 通过getter获取setter函数
date: 2023-04-24 22:30:00
tags: java
---

> 勤劳的家庭，饥饿过其门而不入。——富兰克林

分享一个`通过getter`获取`setter`函数

放在：https://gitee.com/dromara/stream-query

```java
  /**
   * 通过getter获取setter
   *
   * @param getter getter对应的lambda
   * @param <T>    getter参数类型
   * @param <R>    property类型
   * @return 返回setter对应的lambda
   */
  public static <T, R> SerBiCons<T, R> getSetter(SerFunc<T, R> getter) {
    return getSetter(getter, SerBiCons.class);
  }

  /**
   * 通过getter获取setter
   *
   * @param getter     getter对应的lambda
   * @param lambdaType setter对应的lambda类型
   * @param <F>        getter对应的lambda类型
   * @param <C>        setter对应的lambda类型
   * @return 返回setter对应的lambda
   */
  public static <F extends Serializable, C> C getSetter(F getter, Class<? super C> lambdaType) {
    LambdaExecutable executable = LambdaHelper.resolve(getter);
    Object setter = getSetter(executable.getClazz(), BeanHelper.getPropertyName(executable.getName()), lambdaType);
    return SerFunc.<Object, C>cast().apply(setter);
  }
```

此处使用方式：

```java
  @Test
  void testGetSetter() {
    SerBiCons<LambdaExecutable, String> nameSetter = LambdaHelper.getSetter(LambdaExecutable.class, "name");
    LambdaExecutable executable = new LambdaExecutable();
    nameSetter.accept(executable, "kubernetes");
    Assertions.assertEquals("kubernetes", executable.getName());
    val lambda = LambdaHelper.getSetter(LambdaExecutable.class, "clazz", BiConsumer.class);
    BiConsumer<LambdaExecutable, Class<?>> clazzSetter = SerFunc.<BiConsumer<?, ?>, BiConsumer<LambdaExecutable, Class<?>>>cast().apply(lambda);
    clazzSetter.accept(executable, String.class);
    Assertions.assertEquals(String.class, executable.getClazz());
    clazzSetter = LambdaHelper.getSetter(LambdaExecutable::getClazz);
    clazzSetter.accept(executable, Object.class);
    Assertions.assertEquals(Object.class, executable.getClazz());
    SerBiCons<LambdaExecutable, String> nameSerSetter = LambdaHelper
            .<SerFunc<LambdaExecutable, String>, SerBiCons<LambdaExecutable, String>>
                    getSetter(LambdaExecutable::getName, SerBiCons.class);
    nameSerSetter.accept(executable, "serializable");
    Assertions.assertEquals("serializable", executable.getName());
  }
```

