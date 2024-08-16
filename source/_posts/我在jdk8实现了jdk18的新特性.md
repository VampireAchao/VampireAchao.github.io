---
title: 我在jdk8实现了jdk18的新特性
date: 2022-03-27 10:51:07
tags: java
---

> 在自己身上，克服这个时代。——尼采

首先放`jdk18`的官方特性介绍地址：https://openjdk.java.net/jeps/420

我就不再过多解释了，直接贴代码吧~

```java
package cn.hutool.core.lang;

import cn.hutool.core.lang.func.Func1;
import cn.hutool.core.lang.func.LambdaUtil;
import cn.hutool.core.lang.func.VoidFunc1;

import java.util.Arrays;
import java.util.Objects;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;

/**
 * 在不考虑性能的前提下，尽可能实现 JEP 420: Pattern Matching for switch,这是jdk18即将发布的新特性的变种写法
 * 类型转换 instanceOf 老写法如下：
 * <pre>{@code
 * 	public static String formatter(Object o) {
 * 		String formatted = "unknown";
 * 		if (o instanceof Integer) {
 * 			Integer i = (Integer) o;
 * 			formatted = String.format("int %d", i);
 *                } else if (o instanceof Long) {
 * 			Long l = (Long) o;
 * 			formatted = String.format("long %d", l);
 *        } else if (o instanceof Double) {
 * 			Double d = (Double) o;
 * 			formatted = String.format("double %f", d);
 *        } else if (o instanceof String) {
 * 			String s = (String) o;
 * 			formatted = String.format("String %s", s);
 *        }
 * 		return formatted;
 * }
 * }</pre>
 * {@link SwitchCase}用法为
 * <pre>{@code
 * static String formatterWithSwitchCase(Object o) {
 * 		return SwitchCase.choose(o)
 * 				.when((Integer i) -> String.format("int %d", i))
 * 				.when((Long l) -> String.format("long %d", l))
 * 				.when((Double d) -> String.format("double %f", d))
 * 				.when((String s) -> String.format("String %s", s))
 * 				.otherwise("unknown")
 * 				.get();
 *        }
 * }</pre>
 * 然后对于一般条件且无返回值的情况：
 * <pre>{@code
 * SwitchCase.choose(str)
 * 				.whenConsumer(s -> System.out.println("Oops"), null)
 * 				.whenConsumer(s -> System.out.println("Great"), "Foo", "Bar")
 * 				.otherwiseConsumer(s -> System.out.println("Ok"));
 * }</pre>
 *
 * @author VampireAchao
 * @since 2022/3/26 15:56
 */
@SuppressWarnings("unchecked")
public class SwitchCase<T> {

	private final T source;
	private boolean isMatched = false;
	private boolean isDefault = false;
	private final Class<T> type;

	private SwitchCase(T source) {
		this.source = source;
		this.type = source == null ? null : (Class<T>) source.getClass();
	}

	private SwitchCase(T source, boolean isMatched) {
		this.source = source;
		this.isMatched = isMatched;
		this.type = source == null ? null : (Class<T>) source.getClass();
	}

	private SwitchCase(T source, boolean isMatched, boolean isDefault) {
		this.source = source;
		this.isMatched = isMatched;
		this.isDefault = isDefault;
		this.type = source == null ? null : (Class<T>) source.getClass();
	}

	public T get() {
		return source;
	}

	public boolean isMatched() {
		return isMatched;
	}

	public boolean isDefault() {
		return isDefault;
	}

	public Class<T> getType() {
		return type;
	}

	public static <T> SwitchCase<T> choose(T obj) {
		return new SwitchCase<>(obj);
	}

	/**
	 * 传入lambda，根据类型自动完成匹配
	 *
	 * @param function lambda，例如 {@code (Integer i) -> String.format("int %d", i)}
	 * @param <S>      lambda指定的参数类型
	 * @param <R>      lambda指定的返回值类型
	 * @param <O>      实际的类型
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public <S, R, O> SwitchCase<O> when(Func1<S, R> function) {
		if (false == isMatched && LambdaUtil.getRealClass(function).isInstance(source)) {
			return new SwitchCase<>((O) function.callWithRuntimeException((S) source), true);
		}
		return (SwitchCase<O>) this;
	}

	/**
	 * 传入lambda，根据类型自动完成匹配
	 *
	 * @param consumer lambda，例如 {@code (Integer i) -> Console.log("int {}", i)}
	 * @param <S>      lambda指定的参数类型
	 * @param <O>      实际的类型
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public <S, O> SwitchCase<O> whenConsumer(VoidFunc1<S> consumer) {
		if (false == isMatched && LambdaUtil.getRealClassConsumer(consumer).isInstance(source)) {
			consumer.callWithRuntimeException((S) source);
			return new SwitchCase<>((O) source, true);
		}
		return (SwitchCase<O>) this;
	}

	/**
	 * 传入lambda，根据条件自动完成匹配
	 *
	 * @param condition 可传入条件表达式，例如{@code v -> ObjectUtil.isNotNull(v) && "hutool".equals(v)}
	 * @param function  需要进行的操作
	 * @param <R>       操作返回值
	 * @param <O>       实际的类型
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public <R, O> SwitchCase<O> when(Predicate<T> condition, Function<T, R> function) {
		if (false == isMatched && condition.test(source)) {
			return new SwitchCase<>((O) function.apply(source), true);
		}
		return (SwitchCase<O>) this;
	}

	/**
	 * 传入lambda，根据条件自动完成匹配
	 *
	 * @param compare  比较的值
	 * @param function 需要进行的操作
	 * @param <R>      操作返回值
	 * @param <O>      实际的类型
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public <R, O> SwitchCase<O> when(T compare, Function<T, R> function) {
		return when(function, compare);
	}

	/**
	 * 传入lambda，根据条件自动完成匹配，由于动态参数只能放在最后，不得不调整下参数顺序
	 *
	 * @param function 需要进行的操作
	 * @param compares 需要匹配的参数
	 * @param <R>      操作返回值
	 * @param <O>      实际的类型
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public <R, O> SwitchCase<O> when(Function<T, R> function, T... compares) {
		if (false == isMatched && Arrays.asList(compares).contains(source)) {
			return new SwitchCase<>((O) function.apply(source), true);
		}
		return (SwitchCase<O>) this;
	}

	/**
	 * 传入lambda，根据条件自动完成匹配，由于动态参数只能放在最后，不得不调整下参数顺序
	 *
	 * @param consumer 需要进行的操作
	 * @param compares 需要匹配的参数
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public SwitchCase<T> whenConsumer(Consumer<T> consumer, T... compares) {
		if (false == isMatched
				&& (compares == null && source == null)
				|| (compares != null && Arrays.asList(compares).contains(source))) {
			consumer.accept(source);
			return new SwitchCase<>(source, true);
		}
		return this;
	}

	/**
	 * 传入lambda，根据条件自动完成匹配
	 *
	 * @param condition 可传入条件表达式，例如{@code v -> ObjectUtil.isNotNull(v) && "hutool".equals(v)}
	 * @param consumer  需要进行的操作
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public SwitchCase<T> whenPredicateConsumer(Predicate<T> condition, Consumer<T> consumer) {
		if (false == isMatched && condition.test(source)) {
			consumer.accept(source);
			return new SwitchCase<>(source, true);
		}
		return this;
	}

	/**
	 * 如果其他条件不满足，则执行
	 *
	 * @param function 想要执行的lambda
	 * @param <O>      返回值类型
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public <O> SwitchCase<O> otherwise(UnaryOperator<O> function) {
		if (false == isMatched) {
			return new SwitchCase<>(function.apply((O) source), false, true);
		}
		return (SwitchCase<O>) this;
	}

	/**
	 * 如果其他条件不满足，则提供该默认值
	 *
	 * @param value 默认值
	 * @param <O>   返回值类型
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public <O> SwitchCase<O> otherwise(O value) {
		if (false == isMatched) {
			return new SwitchCase<>(value, false, true);
		}
		return (SwitchCase<O>) this;
	}

	/**
	 * 如果其他条件不满足，则执行
	 *
	 * @param consumer 想要执行的lambda
	 * @return 匹配后封装的 {@link SwitchCase}
	 */
	public SwitchCase<T> otherwiseConsumer(Consumer<T> consumer) {
		if (false == isMatched) {
			consumer.accept(source);
			return new SwitchCase<>(source, false, true);
		}
		return this;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}

		if (!(o instanceof SwitchCase)) {
			return false;
		}

		return Objects.equals(((SwitchCase<?>) o).get(), source);
	}

	@Override
	public String toString() {
		return String.valueOf(source);
	}
}
```

然后其中用到了`LambdaUtil`，自己额外新增了一个方法，其余的在`hutool`5.8版本

```java
	/**
	 * 通过对象的方法或类的静态方法引用，然后根据{@link SerializedLambda#getInstantiatedMethodType()}获取lambda实现类<br>
	 * 传入lambda有参数且无返回值的情况能够匹配到此方法：
	 *
	 * @param func lambda
	 * @param <P>  方法调用方类型
	 * @return lambda实现类
	 * @throws IllegalArgumentException 如果是不支持的方法引用，抛出该异常，见{@link LambdaUtil#checkLambdaTypeCanGetClass}
	 */
	public static <P> Class<P> getRealClassConsumer(VoidFunc1<P> func) {
		SerializedLambda lambda = _resolve(func);
		checkLambdaTypeCanGetClass(lambda.getImplMethodKind());
		String instantiatedMethodType = lambda.getInstantiatedMethodType();
		return ClassUtil.loadClass(StrUtil.sub(instantiatedMethodType, 2, StrUtil.indexOf(instantiatedMethodType, ';')));
	}
```

接下来是用法

```java
package cn.hutool.core.lang;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import org.junit.Assert;
import org.junit.Test;

/**
 * SwitchCaseTest
 *
 * @author VampireAchao
 * @since 2022/3/26 15:57
 */
public class SwitchCaseTest {

	/**
	 * 老写法
	 */
	public static String formatter(Object o) {
		String formatted = "unknown";
		if (o instanceof Integer) {
			Integer i = (Integer) o;
			formatted = String.format("int %d", i);
		} else if (o instanceof Long) {
			Long l = (Long) o;
			formatted = String.format("long %d", l);
		} else if (o instanceof Double) {
			Double d = (Double) o;
			formatted = String.format("double %f", d);
		} else if (o instanceof String) {
			String s = (String) o;
			formatted = String.format("String %s", s);
		}
		return formatted;
	}

	/**
	 * 新写法,{@see https://openjdk.java.net/jeps/420}
	 */
	public static String formatterWithSwitchCase(Object o) {
		return SwitchCase.choose(o)
				.when((Integer i) -> String.format("int %d", i))
				.when((Long l) -> String.format("long %d", l))
				.when((Double d) -> String.format("double %f", d))
				.when((String s) -> String.format("String %s", s))
				.otherwise("unknown")
				.get();
	}

	public static void formatterWithSwitchCaseConsumer(Object o) {
		SwitchCase.choose(o)
				.whenConsumer((Integer i) -> Console.log("int {}", i))
				.whenConsumer((Long l) -> Console.log("long {}", l))
				.whenConsumer((Double d) -> Console.log("double {}", d))
				.whenConsumer((String s) -> Console.log("String {}", s))
				.otherwise(s -> "unknown")
				.get();
	}


	static void testFooBar(String str) {
		/*switch (s) {
			case null -> System.out.println("Oops");
			case "Foo", "Bar" -> System.out.println("Great");
			default -> System.out.println("Ok");
		}*/
		SwitchCase.choose(str)
				.whenConsumer(s -> System.out.println("Oops"), null)
				.whenConsumer(s -> System.out.println("Great"), "Foo", "Bar")
				.otherwiseConsumer(s -> System.out.println("Ok"));
	}

	@Test
	public void testWhenConsumer() {
		testFooBar(null);
		testFooBar("Foo");
		testFooBar("");
	}

	@Test
	public void whenTest() {
		Assert.assertTrue(SwitchCase.choose(Class.class).when((Class<?> cls) -> cls).isMatched());
		Assert.assertFalse(SwitchCase.choose(0).when((String s) -> s).isMatched());

		Assert.assertTrue(SwitchCase.choose(Class.class).whenConsumer((Class<?> cls) -> Console.log()).isMatched());
		Assert.assertFalse(SwitchCase.choose(0).whenConsumer((String s) -> Console.log()).isMatched());

		Assert.assertTrue(SwitchCase.choose("ruben").when("x", s -> s).otherwise(s -> s).isDefault());
		Assert.assertFalse(SwitchCase.choose("ruben").when("ruben", s -> s).isDefault());

		Assert.assertEquals("Feature",
				SwitchCase.choose("hutool")
						.when(
								// 条件
								v -> ObjectUtil.isNotNull(v) && "hutool".equals(v),
								// 实际操作
								s -> "Feature"
						).get());

	}


}
```

