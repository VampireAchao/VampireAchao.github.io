---
title: 自定义list To HashMap工具类
date: 2021-01-30 16:03:52
tags: java
---

> 没有比正直更富的遗产。——莎士比亚

我们在使用`JDK`自带的`Collectors.toMap`时，可能会遇到如下问题（[什么？你不知道`toMap`干嘛的？戳我了解](https://VampireAchao.github.io/2020/08/05/Collectors-toMap/)）：

1.`key`重复，出现`java.lang.IllegalStateException: Duplicate key ***`异常

例如：

```java
List<User> users = new ArrayList<>(Arrays.asList(new User(null, "HiNo"), new User(null, "SuPa")));
Map<String, String> map = users.stream().collect(Collectors.toMap(User::getUsername, User::getPassword));
```

2.`value`为空，出现`NPE： java.lang.NullPointerException`

例如:

```java
List<User> users = new ArrayList<>(Arrays.asList(new User("SuPa", null), new User("HiNo", null)));
Map<String, String> map = users.stream().collect(Collectors.toMap(User::getUsername, User::getPassword));
```

这里我们可以不使用`Collectors`，而是直接在`collect`中传入参数

```java
Map<String, String> map = users.stream().collect(HashMap::new, (m, v) -> m.put(v.getUsername(), v.getPassword()), HashMap::putAll);
```

或者是在后面追加参数，例如我[这篇博客](https://VampireAchao.github.io/2021/02/04/toMap%EF%BC%88%E4%BA%8C%EF%BC%89/)

这样确实可以解决，但每次都要写这一长串，有点难受——本人比较懒，所以写一个工具类

这里是直接`put`进去，所以不存在说`key`重复或者为`NPE`问题

```java
import com.baomidou.mybatisplus.core.toolkit.ExceptionUtils;
import com.baomidou.mybatisplus.core.toolkit.support.SerializedLambda;
import com.ruben.pojo.User;

import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.util.*;
import java.util.function.BiConsumer;
import java.util.function.BinaryOperator;
import java.util.function.Function;
import java.util.function.Supplier;
import java.util.stream.Collector;

/**
 * @ClassName: FunctionUtils
 * @Description: 我还没有写描述
 * @Date: 2020/11/9 0009 23:43
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class FunctionUtils {

    /**
     * @MethodName: toHashMap
     * @Description: list -> hashMap
     * @Date: 2021/1/31 0031 16:17
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [list, keyFunction, valueFunction]
     * @returnValue: java.util.Map<K, U>
     */
    public static <T, K, U> Map<K, U> toHashMap(List<T> list, Function<T, K> keyFunction, Function<T, U> valueFunction) {
        if (Objects.isNull(list) || list.isEmpty()) {
            return new HashMap<>(0);
        }
        return list.stream().collect(MyCollectors.toHashMap(keyFunction, valueFunction));
    }

    public static <T, K> Map<K, T> toHashMap(List<T> list, Function<T, K> keyFunction) {
        return toHashMap(list, keyFunction, null);
    }

    public static <T> Map<?, T> toHashMap(List<T> list) {
        return toHashMap(list, null, null);
    }

    /**
     * @ClassName: MyCollectors
     * @Date: 2020/12/4 0004 11:16
     * @Description: 我的自定义Collectors
     * @Author: <achao1441470436@gmail.com>
     */
    public static class MyCollectors {
        /**
         * @MethodName: toHashMap
         * @Description: 转换成hashmap
         * @Date: 2020/12/4 0004 13:39
         * *
         * @author: <achao1441470436@gmail.com>
         * @param: [methodName]
         * @returnValue: java.util.stream.Collector
         */
        public static <T, K, U> Collector<T, HashMap<K, U>, HashMap<K, U>> toHashMap(Function<T, K> keyFunction, Function<T, U> valueFunction) {
            return new MyCollectorImpl<>(HashMap::new, (m, v) -> m.put(Optional.ofNullable(keyFunction).map(keyF -> keyF.apply(v)).orElseGet(() -> {
                try {
                    return (K) v.getClass().getMethod("getId").invoke(v);
                } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                    e.printStackTrace();
                }
                return null;
            }), Optional.ofNullable(valueFunction).map(valueF -> valueF.apply(v)).orElse((U) v)), (u, v) -> null, i -> i, Collections.unmodifiableSet(EnumSet.of(Collector.Characteristics.IDENTITY_FINISH)));
        }

        public static class MyCollectorImpl<T, A, R> implements Collector<T, A, R> {
            private final Supplier<A> supplier;
            private final BiConsumer<A, T> accumulator;
            private final BinaryOperator<A> combiner;
            private final Function<A, R> finisher;
            private final Set<Characteristics> characteristics;

            MyCollectorImpl(Supplier<A> supplier,
                            BiConsumer<A, T> accumulator,
                            BinaryOperator<A> combiner,
                            Function<A, R> finisher,
                            Set<Characteristics> characteristics) {
                this.supplier = supplier;
                this.accumulator = accumulator;
                this.combiner = combiner;
                this.finisher = finisher;
                this.characteristics = characteristics;
            }

            @Override
            public Supplier<A> supplier() {
                return supplier;
            }

            @Override
            public BiConsumer<A, T> accumulator() {
                return accumulator;
            }

            @Override
            public BinaryOperator<A> combiner() {
                return combiner;
            }

            @Override
            public Function<A, R> finisher() {
                return finisher;
            }

            @Override
            public Set<Characteristics> characteristics() {
                return characteristics;
            }
        }
    }
}
```

使用方式（注意返回值）：

指定`key`，`value`使用它本身

```java
Map<String, User> map = toHashMap(users, User::getUsername);
```

指定`key`、`value`

```java
Map<String, String> map = toHashMap(users, User::getUsername, User::getPassword);
```

默认不指定，`key`为`id`、`value`为它本身的方式（需要有`id`属性并包含`getter`）

```java
Map<?, User> map = toHashMap(users);
// 可以强转
Map<Integer, User> map = (Map<Integer, User>) toHashMap(users);
```

