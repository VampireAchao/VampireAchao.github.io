---
title: 获取lambda
date: 2022-12-18 20:29:57
tags: java
---

> 处世让一步为高，退步即进步的张本；待人宽一分是福利人利己的根基。——洪自诚

昨天说了[获取lambda代理](https://VampireAchao.github.io/2022/12/17/获取lambda代理/)

今天获取实际`lambda`对象

重要的是这个函数`java.lang.invoke.LambdaMetafactory#metafactory`以及`altMetafactory`

我们在昨天的基础上，进行获取

```java
    @Test
    @SneakyThrows
    void testVirtual() {
        final MethodHandle virtual = MethodHandles.lookup().findVirtual(LambdaExecutable.class, "getName", MethodType.methodType(String.class));
        final SerFunc<LambdaExecutable, String> proxy = MethodHandleProxies.asInterfaceInstance(SerFunc.class, virtual);
        InvocationHandler handler = Proxy.getInvocationHandler(proxy);
        MethodHandle methodHandle = ReflectHelper.getFieldValue(handler, "val$target");
        final CallSite callSite = LambdaMetafactory.altMetafactory(
                MethodHandles.lookup(),
                "apply",
                MethodType.methodType(SerFunc.class),
                MethodType.methodType(Object.class, Object.class),
                methodHandle,
                MethodType.methodType(String.class, LambdaExecutable.class),
                LambdaMetafactory.FLAG_SERIALIZABLE
        );
        final MethodHandle target = callSite.getTarget();
        final SerFunc<LambdaExecutable, String> invoke = (SerFunc<LambdaExecutable, String>) target.invoke();
        final LambdaExecutable executable = new LambdaExecutable();
        executable.setName("test");
        Assertions.assertEquals("test", invoke.apply(executable));
        Assertions.assertEquals("getName", LambdaHelper.resolve(invoke).getName());
    }
```

进一步封装后：

```java
public static <T> T revert(Class<T> clazz, Executable executable) {
        final Method funcMethod = Steam.of(clazz.getMethods()).findFirst(method -> Modifier.isAbstract(method.getModifiers()))
                .orElseThrow(() -> new UtilException("not a functional interface"));
        final MethodHandle implMethod;
        final MethodType instantiatedMethodType;
        if (executable instanceof Method) {
            final Method method = (Method) executable;
            implMethod = ((SerSupp<MethodHandle>) () -> MethodHandles.lookup().unreflect(method)).get();
            instantiatedMethodType = MethodType.methodType(method.getReturnType(), method.getDeclaringClass(), method.getParameterTypes());
        } else {
            final Constructor<?> constructor = (Constructor<?>) executable;
            implMethod = ((SerSupp<MethodHandle>) () -> MethodHandles.lookup().unreflectConstructor(constructor)).get();
            instantiatedMethodType = MethodType.methodType(constructor.getDeclaringClass(), constructor.getParameterTypes());
        }
        final CallSite callSite = ((SerSupp<CallSite>) () ->
                Serializable.class.isAssignableFrom(clazz) ?
                        LambdaMetafactory.altMetafactory(
                                MethodHandles.lookup(),
                                funcMethod.getName(),
                                MethodType.methodType(clazz),
                                MethodType.methodType(funcMethod.getReturnType(), funcMethod.getParameterTypes()),
                                implMethod,
                                instantiatedMethodType,
                                LambdaMetafactory.FLAG_SERIALIZABLE
                        ) :
                        LambdaMetafactory.metafactory(
                                MethodHandles.lookup(),
                                funcMethod.getName(),
                                MethodType.methodType(clazz),
                                MethodType.methodType(funcMethod.getReturnType(), funcMethod.getParameterTypes()),
                                implMethod,
                                instantiatedMethodType
                        )
        ).get();
        final MethodHandle target = callSite.getTarget();
        return ((SerSupp<T>) () -> SerFunc.<Object, T>cast().apply(target.invoke())).get();
    }
```

使用方式：

```java
    @Test
    void testRevert() {
        final LambdaExecutable getName = LambdaHelper.<SerFunc<LambdaExecutable, String>>resolve(LambdaExecutable::getName);
        final SerFunc<LambdaExecutable, String> revertedGetName = LambdaHelper.revert(SerFunc.class, getName.getExecutable());
        Assertions.assertEquals(revertedGetName.apply(getName), getName.getName());

        final LambdaExecutable constructor = LambdaHelper.<SerSupp<LambdaExecutable>>resolve(LambdaExecutable::new);
        final SerSupp<LambdaExecutable> revertedConstructor = LambdaHelper.revert(SerSupp.class, constructor.getExecutable());
        Assertions.assertEquals(LambdaExecutable.class, revertedConstructor.get().getClass());
    }
```

源码地址：https://gitee.com/VampireAchao/stream-query
