---
title: Optional没有peek函数？自己写一个
date: 2021-04-30 13:45:30
tags: java
---

> 好动与不满足是进步第一必需品。——爱迪生

我发现`Optional`竟然没有类似于`Stream`里的`peek`函数

那我就只好自己写一个了。。。

但`Optional`由`final`修饰没法继承，那我复制一个出来改个名字好了

```java
package com.ruben.utils;

import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

/**
 * 我还没有写描述
 *
 * @author <achao1441470436@gmail.com>
 * @date 2021/4/24 0024 15:48
 */
public class Opt<T> {
    /**
     * Common instance for {@code empty()}.
     */
    private static final Opt<?> EMPTY = new Opt<>();

    /**
     * If non-null, the value; if null, indicates no value is present
     */
    private final T value;

    /**
     * Constructs an empty instance.
     *
     * @implNote Generally only one empty instance, {@link Opt#EMPTY},
     * should exist per VM.
     */
    private Opt() {
        this.value = null;
    }

    /**
     * Returns an empty {@code Opt} instance.  No value is present for this
     * Opt.
     *
     * @param <T> Type of the non-existent value
     * @return an empty {@code Opt}
     * @apiNote Though it may be tempting to do so, avoid testing if an object
     * is empty by comparing with {@code ==} against instances returned by
     * {@code Option.empty()}. There is no guarantee that it is a singleton.
     * Instead, use {@link #isPresent()}.
     */
    public static <T> Opt<T> empty() {
        @SuppressWarnings("unchecked")
        Opt<T> t = (Opt<T>) EMPTY;
        return t;
    }

    /**
     * Constructs an instance with the value present.
     *
     * @param value the non-null value to be present
     * @throws NullPointerException if value is null
     */
    private Opt(T value) {
        this.value = Objects.requireNonNull(value);
    }

    /**
     * Returns an {@code Opt} with the specified present non-null value.
     *
     * @param <T>   the class of the value
     * @param value the value to be present, which must be non-null
     * @return an {@code Opt} with the value present
     * @throws NullPointerException if value is null
     */
    public static <T> Opt<T> of(T value) {
        return new Opt<>(value);
    }

    /**
     * Returns an {@code Opt} describing the specified value, if non-null,
     * otherwise returns an empty {@code Opt}.
     *
     * @param <T>   the class of the value
     * @param value the possibly-null value to describe
     * @return an {@code Opt} with a present value if the specified value
     * is non-null, otherwise an empty {@code Opt}
     */
    public static <T> Opt<T> ofNullable(T value) {
        return value == null ? empty() : of(value);
    }

    /**
     * If a value is present in this {@code Opt}, returns the value,
     * otherwise throws {@code NoSuchElementException}.
     *
     * @return the non-null value held by this {@code Opt}
     * @throws NoSuchElementException if there is no value present
     * @see Opt#isPresent()
     */
    public T get() {
        if (value == null) {
            throw new NoSuchElementException("No value present");
        }
        return value;
    }

    /**
     * Return {@code true} if there is a value present, otherwise {@code false}.
     *
     * @return {@code true} if there is a value present, otherwise {@code false}
     */
    public boolean isPresent() {
        return value != null;
    }

    /**
     * If a value is present, invoke the specified consumer with the value,
     * otherwise do nothing.
     *
     * @param consumer block to be executed if a value is present
     * @throws NullPointerException if value is present and {@code consumer} is
     *                              null
     */
    public void ifPresent(Consumer<? super T> consumer) {
        if (value != null)
            consumer.accept(value);
    }

    /**
     * If a value is present, and the value matches the given predicate,
     * return an {@code Opt} describing the value, otherwise return an
     * empty {@code Opt}.
     *
     * @param predicate a predicate to apply to the value, if present
     * @return an {@code Opt} describing the value of this {@code Opt}
     * if a value is present and the value matches the given predicate,
     * otherwise an empty {@code Opt}
     * @throws NullPointerException if the predicate is null
     */
    public Opt<T> filter(Predicate<? super T> predicate) {
        Objects.requireNonNull(predicate);
        if (!isPresent())
            return this;
        else
            return predicate.test(value) ? this : empty();
    }

    /**
     * If a value is present, apply the provided mapping function to it,
     * and if the result is non-null, return an {@code Opt} describing the
     * result.  Otherwise return an empty {@code Opt}.
     *
     * @param <U>    The type of the result of the mapping function
     * @param mapper a mapping function to apply to the value, if present
     * @return an {@code Opt} describing the result of applying a mapping
     * function to the value of this {@code Opt}, if a value is present,
     * otherwise an empty {@code Opt}
     * @throws NullPointerException if the mapping function is null
     * @apiNote This method supports post-processing on Opt values, without
     * the need to explicitly check for a return status.  For example, the
     * following code traverses a stream of file names, selects one that has
     * not yet been processed, and then opens that file, returning an
     * {@code Opt<FileInputStream>}:
     *
     * <pre>{@code
     *     Opt<FileInputStream> fis =
     *         names.stream().filter(name -> !isProcessedYet(name))
     *                       .findFirst()
     *                       .map(name -> new FileInputStream(name));
     * }</pre>
     * <p>
     * Here, {@code findFirst} returns an {@code Opt<String>}, and then
     * {@code map} returns an {@code Opt<FileInputStream>} for the desired
     * file if one exists.
     */
    public <U> Opt<U> map(Function<? super T, ? extends U> mapper) {
        Objects.requireNonNull(mapper);
        if (!isPresent())
            return empty();
        else {
            return Opt.ofNullable(mapper.apply(value));
        }
    }

    /**
     * If a value is present, apply the provided {@code Opt}-bearing
     * mapping function to it, return that result, otherwise return an empty
     * {@code Opt}.  This method is similar to {@link #map(Function)},
     * but the provided mapper is one whose result is already an {@code Opt},
     * and if invoked, {@code flatMap} does not wrap it with an additional
     * {@code Opt}.
     *
     * @param <U>    The type parameter to the {@code Opt} returned by
     * @param mapper a mapping function to apply to the value, if present
     *               the mapping function
     * @return the result of applying an {@code Opt}-bearing mapping
     * function to the value of this {@code Opt}, if a value is present,
     * otherwise an empty {@code Opt}
     * @throws NullPointerException if the mapping function is null or returns
     *                              a null result
     */
    public <U> Opt<U> flatMap(Function<? super T, Opt<U>> mapper) {
        Objects.requireNonNull(mapper);
        if (!isPresent())
            return empty();
        else {
            return Objects.requireNonNull(mapper.apply(value));
        }
    }

    /**
     * Return the value if present, otherwise return {@code other}.
     *
     * @param other the value to be returned if there is no value present, may
     *              be null
     * @return the value, if present, otherwise {@code other}
     */
    public T orElse(T other) {
        return value != null ? value : other;
    }

    /**
     * Return the value if present, otherwise invoke {@code other} and return
     * the result of that invocation.
     *
     * @param other a {@code Supplier} whose result is returned if no value
     *              is present
     * @return the value if present otherwise the result of {@code other.get()}
     * @throws NullPointerException if value is not present and {@code other} is
     *                              null
     */
    public T orElseGet(Supplier<? extends T> other) {
        return value != null ? value : other.get();
    }

    /**
     * Return the contained value, if present, otherwise throw an exception
     * to be created by the provided supplier.
     *
     * @param <X>               Type of the exception to be thrown
     * @param exceptionSupplier The supplier which will return the exception to
     *                          be thrown
     * @return the present value
     * @throws X                    if there is no value present
     * @throws NullPointerException if no value is present and
     *                              {@code exceptionSupplier} is null
     * @apiNote A method reference to the exception constructor with an empty
     * argument list can be used as the supplier. For example,
     * {@code IllegalStateException::new}
     */
    public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X {
        if (value != null) {
            return value;
        } else {
            throw exceptionSupplier.get();
        }
    }

    /**
     * Indicates whether some other object is "equal to" this Opt. The
     * other object is considered equal if:
     * <ul>
     * <li>it is also an {@code Opt} and;
     * <li>both instances have no value present or;
     * <li>the present values are "equal to" each other via {@code equals()}.
     * </ul>
     *
     * @param obj an object to be tested for equality
     * @return {code true} if the other object is "equal to" this object
     * otherwise {@code false}
     */
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (!(obj instanceof Opt)) {
            return false;
        }

        Opt<?> other = (Opt<?>) obj;
        return Objects.equals(value, other.value);
    }

    /**
     * Returns the hash code value of the present value, if any, or 0 (zero) if
     * no value is present.
     *
     * @return hash code value of the present value or 0 if no value is present
     */
    @Override
    public int hashCode() {
        return Objects.hashCode(value);
    }

    /**
     * Returns a non-empty string representation of this Opt suitable for
     * debugging. The exact presentation format is unspecified and may vary
     * between implementations and versions.
     *
     * @return the string representation of this instance
     * @implSpec If a value is present the result must include its string
     * representation in the result. Empty and present Opts must be
     * unambiguously differentiable.
     */
    @Override
    public String toString() {
        return value != null
                ? String.format("Opt[%s]", value)
                : "Opt.empty";
    }

    /**
     * If a value is present, invoke the specified consumer with the value,
     * Otherwise return an empty {@code Optional}.
     *
     * @param consumer block to be executed if a value is present
     * @throws NullPointerException if value is present and {@code consumer} is null
     * @apiNote 这个是我写的，哈哈哈哈哈哈
     * @author <achao1441470436@gmail.com>
     */
    public Opt<T> peek(Consumer<T> consumer) {
        Objects.requireNonNull(consumer);
        if (Objects.isNull(value)) {
            return Opt.empty();
        }
        consumer.accept(value);
        return Opt.ofNullable(value);
    }

}
```

然后我们就可以这样写啦

```java
        Opt.ofNullable("SSS")
                .peek(System.out::println)
                .map(d -> null)
                .peek(System.out::println);
```

这句代码要是看不懂，可以看下我之前写过的关于

[`Optional`的博客一](https://VampireAchao.github.io/2020/06/17/Optional%E8%BF%9B%E8%A1%8C%E4%BC%98%E9%9B%85%E9%9D%9E%E7%A9%BA%E5%88%A4%E6%96%AD/)

[`Optional`的博客二](https://VampireAchao.github.io/2021/01/05/Optional%E5%86%8D%E6%89%A9%E5%B1%95/)

