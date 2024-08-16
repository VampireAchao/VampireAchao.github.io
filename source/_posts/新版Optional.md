---
title: 新版Optional
date: 2021-07-19 23:01:25
tags: java
---

> 我们每一做一件事都应该既小心谨慎，又充满信心。——爱比克泰德

首先关于`Optional`的博客我已经写过好几篇了

[Optional进行优雅非空判断](https://VampireAchao.github.io/2020/06/17/Optional进行优雅非空判断/)

[Optional再扩展](https://VampireAchao.github.io/2021/01/05/Optional再扩展/)

[Optional没有peek函数？自己写一个](https://VampireAchao.github.io/2021/04/30/Optional没有peek函数？自己写一个/)

在`Java9`中更新了`Optional`的三个函数

第一个：将`Optional`中的值转换为`Stream`，如果值不存在，则返回空的`Stream`

```java
    /**
     * If a value is present, returns a sequential {@link Stream} containing
     * only that value, otherwise returns an empty {@code Stream}.
     *
     * @apiNote
     * This method can be used to transform a {@code Stream} of optional
     * elements to a {@code Stream} of present value elements:
     * <pre>{@code
     *     Stream<Optional<T>> os = ..
     *     Stream<T> s = os.flatMap(Optional::stream)
     * }</pre>
     *
     * @return the optional value as a {@code Stream}
     * @since 9
     */
    public Stream<T> stream() {
        if (!isPresent()) {
            return Stream.empty();
        } else {
            return Stream.of(value);
        }
    }
```

用法很简单

```java
        String stream = Optional.ofNullable("1").stream().collect(Collectors.joining(","));
        System.out.println(stream);
```

第二个：如果值存在就执行`action`，否则执行`emptyAction`

```java
    /**
     * If a value is present, performs the given action with the value,
     * otherwise performs the given empty-based action.
     *
     * @param action the action to be performed, if a value is present
     * @param emptyAction the empty-based action to be performed, if no value is
     *        present
     * @throws NullPointerException if a value is present and the given action
     *         is {@code null}, or no value is present and the given empty-based
     *         action is {@code null}.
     * @since 9
     */
    public void ifPresentOrElse(Consumer<? super T> action, Runnable emptyAction) {
        if (value != null) {
            action.accept(value);
        } else {
            emptyAction.run();
        }
    }
```

用法：

```java
        Optional.ofNullable("2").ifPresentOrElse(v -> System.out.println(v), () -> System.out.println("不存在"));
```

第三个：如果值存在，返回本身，不存在则调用`supplier`获取一个新的`Optional`

```java
    /**
     * If a value is present, returns an {@code Optional} describing the value,
     * otherwise returns an {@code Optional} produced by the supplying function.
     *
     * @param supplier the supplying function that produces an {@code Optional}
     *        to be returned
     * @return returns an {@code Optional} describing the value of this
     *         {@code Optional}, if a value is present, otherwise an
     *         {@code Optional} produced by the supplying function.
     * @throws NullPointerException if the supplying function is {@code null} or
     *         produces a {@code null} result
     * @since 9
     */
    public Optional<T> or(Supplier<? extends Optional<? extends T>> supplier) {
        Objects.requireNonNull(supplier);
        if (isPresent()) {
            return this;
        } else {
            @SuppressWarnings("unchecked")
            Optional<T> r = (Optional<T>) supplier.get();
            return Objects.requireNonNull(r);
        }
    }
```

用法：

```java
Optional.ofNullable(null).or(Optional::empty).or(() -> Stream.of(3).findAny()).ifPresent(System.out::println);
```

然后是`java10`中出现的

如果有值则获取，无则直接抛出`NoSuchElementException`异常

```java
    /**
     * If a value is present, returns the value, otherwise throws
     * {@code NoSuchElementException}.
     *
     * @return the non-{@code null} value described by this {@code Optional}
     * @throws NoSuchElementException if no value is present
     * @since 10
     */
    public T orElseThrow() {
        if (value == null) {
            throw new NoSuchElementException("No value present");
        }
        return value;
    }
```

用法：

```java
        Optional.ofNullable(null).orElseThrow();
```

最后是`java11`中出现的

判断是否有值

```java
    /**
     * If a value is  not present, returns {@code true}, otherwise
     * {@code false}.
     *
     * @return  {@code true} if a value is not present, otherwise {@code false}
     * @since   11
     */
    public boolean isEmpty() {
        return value == null;
    }
```

用法：

```java
        Optional.ofNullable("").isEmpty();
```

